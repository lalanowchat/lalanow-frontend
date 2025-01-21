import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
  return (
    <>
      <Header 
       title="LaHelpNow" />
      <div className="flex flex-col items-start justify-center min-h-screen p-4">
        <div className="flex flex-row w-100 ml-auto gap-4 mr-auto">
          <Link
            to="/need-help"
            className="flex-1 p-4 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            {t('header.needHelp')}
          </Link>
          <Link
            to="/want-to-help"
            className="flex-1 p-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            {t('header.wantToHelp')}
          </Link>
        </div>
      </div>
    </>
  );
}
