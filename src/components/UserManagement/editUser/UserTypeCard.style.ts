import styled from 'styled-components';
import { Card, Tag } from 'antd';

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

export const UserTypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserTypeItem = styled.div<{ $isActive: boolean; $color: string }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${({ $isActive, $color, theme }) => ($isActive ? $color : theme.colorBorder)};
  border-radius: 6px;
  background-color: ${({ $isActive, $color, theme }) =>
    $isActive
      ? `${$color}10`
      : theme.isDarkMode
        ? theme.colors.neutral[800]
        : theme.colors.neutral[50]};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    border-color: ${({ $color }) => $color};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const TypeContent = styled.div`
  flex: 1;
`;

export const TypeLabel = styled.div<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  font-size: 13px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colorText : theme.colorTextSecondary)};
  margin-bottom: 2px;
`;

export const TypeDescription = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;

export const ActiveTag = styled(Tag)`
  margin: 0;
  font-size: 10px;
`;

export const SummaryBox = styled.div`
  margin-top: 12px;
  padding: 8px;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? `${theme.colors.primary.dark}20` : `${theme.colors.primary.light}50`};
  border: 1px solid ${({ theme }) => theme.colorBorder};
  border-radius: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;
