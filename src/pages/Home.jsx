import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/helpnow-logo.png'

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Header title="LaHelpNow" />
      <div className="flex flex-col items-center justify-center p-4">
        {/* Main container */}
        <img src={logo} alt="Help Now Logo" className="xl:h-96 xl:w-96" />
        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4">
          {/* Need Help Button */}
          <Link
            to="/need-help"
            className="flex-1 p-4 text-lg md:text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            {t('header.needHelp')}
          </Link>
          {/* Want to Help Button */}
          <Link
            to="/want-to-help"
            className="flex-1 p-4 text-lg md:text-xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            {t('header.wantToHelp')}
          </Link>
        </div>
      </div>
    </>
  );
}
