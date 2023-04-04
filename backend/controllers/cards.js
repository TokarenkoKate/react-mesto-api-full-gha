const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenAccess = require('../errors/forbidden-access-err');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        if (req.user._id === card.owner.id) {
          return card.deleteOne()
            .then(() => res.send({ message: 'Карточка удалена.' }));
        } else {
          next(new ForbiddenAccess('Вы не можете удалить чужую карточку'));
        }
      } else {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
    })
    .catch(next);
};
