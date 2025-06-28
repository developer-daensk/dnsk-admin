import { ReactNode } from 'react';
import { Typography } from 'antd';

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography.Title level={2} style={{ color: 'var(--color-text-heading)' }}>
      {children}
    </Typography.Title>
  );
};

export const PageTitleSmall = ({ children }: { children: ReactNode }) => {
  return (
    <Typography.Title level={3} style={{ color: 'var(--color-text-heading)' }}>
      {children}
    </Typography.Title>
  );
};

export const PageTitleMedium = ({ children }: { children: ReactNode }) => {
  return (
    <Typography.Title level={4} style={{ color: 'var(--color-text-heading)' }}>
      {children}
    </Typography.Title>
  );
};
