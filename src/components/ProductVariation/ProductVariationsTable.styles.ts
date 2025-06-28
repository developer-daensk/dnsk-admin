import styled from 'styled-components';
import { Card, Button, Dropdown } from 'antd';

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-color: ${({ theme }) => theme.colorBorder};
  transition: all 0.3s ease;

  .ant-card-body {
    padding: 24px;
  }

  .ant-table {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.colorText};
  }

  .ant-table-thead > tr > th {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#fafafa')};
    color: ${({ theme }) => theme.colorTextHeading};
    border-bottom-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-table-tbody > tr > td {
    border-bottom-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#262626' : '#f5f5f5')};
  }

  .ant-pagination {
    color: ${({ theme }) => theme.colorText};
  }

  .ant-pagination-item {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-pagination-item a {
    color: ${({ theme }) => theme.colorText};
  }

  .ant-pagination-item-active {
    border-color: ${({ theme }) => theme.colorPrimary};
  }

  .ant-pagination-item-active a {
    color: ${({ theme }) => theme.colorPrimary};
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
    color: ${({ theme }) => theme.colorText};
  }

  .ant-select-selector {
    background-color: ${({ theme }) => theme.backgroundColor} !important;
    border-color: ${({ theme }) => theme.colorBorder} !important;
    color: ${({ theme }) => theme.colorText} !important;
  }

  .ant-select-arrow {
    color: ${({ theme }) => theme.colorText};
  }
`;

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 2px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .ant-dropdown-menu-item {
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary}10;
    }

    .anticon {
      margin-right: 6px;
      font-size: 14px;
    }
  }
`;

export const ActionButton = styled(Button)`
  padding: 2px 4px;
  height: 28px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colorPrimary}10;
    color: ${({ theme }) => theme.colorPrimary};
  }

  .anticon {
    font-size: 14px;
  }
`;
