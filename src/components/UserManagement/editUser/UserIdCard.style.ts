import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.colorBorder};
  }

  .ant-card-head-title {
    color: ${({ theme }) => theme.colorTextHeading};
  }
`;

export const UserIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const UserIdDisplay = styled.div`
  font-size: 28px;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 3px;
  text-align: center;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50]};
  border: 2px solid ${({ theme }) => theme.colorBorder};
  color: ${({ theme }) => theme.colorText};
`;

export const UserIdLabel = styled.div`
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colorTextSecondary};
`;
