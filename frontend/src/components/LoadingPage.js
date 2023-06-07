import { useTranslation } from 'react-i18next';

function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div className='loading-page'>
      <div className='loading-page__container'>
        <main className='loading-page__main'>
          <h1 className='loading-page__title'>{t('loading')}</h1>
          <span className="spinner"></span>
        </main>
      </div>
    </div>
  )
}

export default LoadingPage;
