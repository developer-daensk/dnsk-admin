import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import deDE from 'antd/locale/de_DE';

export type SupportedLanguage = 'en' | 'de';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const antdLocales = {
  en: enUS,
  de: deDE,
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('de'); // Default to German
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0); // Force update counter

  useEffect(() => {
    // Only run initialization once
    if (!isInitialized) {
      // Check localStorage first, then i18n language, then default to German
      const storedLanguage = localStorage.getItem('language') as SupportedLanguage;
      const detectedLanguage = i18n.language.slice(0, 2) as SupportedLanguage;

      let initialLanguage: SupportedLanguage = 'de'; // Default

      if (storedLanguage && ['en', 'de'].includes(storedLanguage)) {
        initialLanguage = storedLanguage;
      } else if (['en', 'de'].includes(detectedLanguage)) {
        initialLanguage = detectedLanguage;
      }

      setCurrentLanguage(initialLanguage);
      if (i18n.language !== initialLanguage) {
        i18n.changeLanguage(initialLanguage);
      }
      setIsInitialized(true);
    }
  }, [i18n, isInitialized]);

  const changeLanguage = async (language: SupportedLanguage) => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem('language', language);

      // Force components to re-render
      setUpdateCounter(prev => prev + 1);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <ConfigProvider
        locale={antdLocales[currentLanguage]}
        key={`${currentLanguage}-${updateCounter}`}
      >
        {children}
      </ConfigProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
