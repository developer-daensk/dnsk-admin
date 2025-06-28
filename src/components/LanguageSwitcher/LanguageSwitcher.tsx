import React from 'react';
import { Select, Space, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLanguage, SupportedLanguage } from '../../contexts/LanguageContext';

const { Text } = Typography;
const { Option } = Select;

interface LanguageSwitcherProps {
  showLabel?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  showLabel = true,
  size = 'middle',
  style,
}) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'En', flag: '🇺🇸' },
    { code: 'de' as SupportedLanguage, name: 'De', flag: '🇩🇪' },
  ];

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
  };

  return (
    <Space style={style}>
      {showLabel && (
        <Text>
          <GlobalOutlined style={{ marginRight: 4 }} />
          {t('language.title')}:
        </Text>
      )}
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        loading={isLoading}
        size={size}
        style={{ minWidth: 100 }}
        popupMatchSelectWidth={false}
      >
        {languages.map(({ code, name, flag }) => (
          <Option key={code} value={code}>
            <Space>
              <span>{flag}</span>
              <span>{name}</span>
            </Space>
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default LanguageSwitcher;
