import React from 'react';
import { Layout, Typography } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export const Footer: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="admin-footer">
      <div className=" flex justify-center items-center text-center">
        <Text type="secondary">
          © {currentYear} {resourceHelpers.getText('footer.copyright')}
        </Text>
      </div>
    </AntFooter>
  );
};
