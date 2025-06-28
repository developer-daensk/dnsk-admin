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

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50]};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colorBorder};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100]};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const StatusContent = styled.div`
  flex: 1;
`;

export const StatusLabel = styled.div`
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colorText};
`;

export const StatusDescription = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;

export const StatusTag = styled(Tag)`
  margin: 0;
  font-size: 10px;
  transition: all 0.3s ease;

  &.ant-tag-success {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? `${theme.colors.success.dark}20` : `${theme.colors.success.light}20`};
    border-color: ${({ theme }) => theme.colors.success.main};
    color: ${({ theme }) => theme.colors.success.main};
  }

  &.ant-tag-default {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100]};
    border-color: ${({ theme }) => theme.colorBorder};
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;
