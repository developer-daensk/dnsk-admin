import styled from 'styled-components';
import { Card, Button, Dropdown } from 'antd';

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  .ant-card-body {
    padding: 16px;

    @media (min-width: 768px) {
      padding: 24px;
    }
  }

  .themed-table {
    .ant-table {
      background-color: var(--table-bg-color, ${({ theme }) => theme.backgroundColor});
      color: var(--table-text-color, ${({ theme }) => theme.colorText});

      // Responsive table styling
      .ant-table-container {
        overflow-x: auto;
        overflow-y: hidden;
      }

      .ant-table-content {
        overflow-x: auto;
        width: 100%;
      }
    }

    .ant-table-thead > tr > th {
      background-color: var(
        --table-header-bg,
        ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#fafafa')}
      );
      color: var(--table-header-text, ${({ theme }) => theme.colorTextHeading});
      border-bottom-color: var(--table-border-color, ${({ theme }) => theme.colorBorder});
      white-space: nowrap;

      @media (max-width: 768px) {
        font-size: 12px;
        padding: 8px;
      }
    }

    .ant-table-tbody > tr > td {
      border-bottom-color: var(--table-border-color, ${({ theme }) => theme.colorBorder});

      @media (max-width: 768px) {
        font-size: 12px;
        padding: 8px;
      }
    }

    .ant-table-tbody > tr:hover > td {
      background-color: var(
        --table-row-hover,
        ${({ theme }) => (theme.isDarkMode ? '#262626' : '#f5f5f5')}
      );
    }

    // Responsive pagination
    .ant-pagination {
      color: var(--table-text-color, ${({ theme }) => theme.colorText});
      margin-top: 16px;

      @media (max-width: 768px) {
        .ant-pagination-options {
          display: none;
        }

        .ant-pagination-simple-pager {
          margin-right: 8px;
        }
      }
    }

    .ant-pagination-item {
      background-color: var(--table-bg-color, ${({ theme }) => theme.backgroundColor});
      border-color: var(--table-border-color, ${({ theme }) => theme.colorBorder});

      @media (max-width: 768px) {
        min-width: 28px;
        height: 28px;
        line-height: 26px;
        margin-right: 4px;
      }
    }

    .ant-pagination-item a {
      color: var(--table-text-color, ${({ theme }) => theme.colorText});
    }

    .ant-pagination-item-active {
      border-color: var(--primary-color, ${({ theme }) => theme.colorPrimary});
    }

    .ant-pagination-item-active a {
      color: var(--primary-color, ${({ theme }) => theme.colorPrimary});
    }

    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
      background-color: var(--table-bg-color, ${({ theme }) => theme.backgroundColor});
      border-color: var(--table-border-color, ${({ theme }) => theme.colorBorder});
      color: var(--table-text-color, ${({ theme }) => theme.colorText});
    }

    .ant-select-selector {
      background-color: var(--table-bg-color, ${({ theme }) => theme.backgroundColor}) !important;
      border-color: var(--table-border-color, ${({ theme }) => theme.colorBorder}) !important;
      color: var(--table-text-color, ${({ theme }) => theme.colorText}) !important;
    }

    .ant-select-arrow {
      color: var(--table-text-color, ${({ theme }) => theme.colorText});
    }

    // Mobile-specific table styling
    @media (max-width: 768px) {
      .ant-table-small {
        font-size: 12px;

        .ant-table-thead > tr > th {
          padding: 6px 4px;
        }

        .ant-table-tbody > tr > td {
          padding: 6px 4px;
        }
      }
    }
  }
`;

export const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  // Custom scrollbar styling
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#f1f1f1')};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorBorder || '#d9d9d9'};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colorPrimary || '#1890ff'};
    }
  }

  // Ensure table doesn't break out of container
  .ant-table {
    min-width: 100%;
  }

  // Mobile optimizations
  @media (max-width: 768px) {
    // Reduce horizontal padding on mobile
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      &:first-child {
        padding-left: 8px;
      }

      &:last-child {
        padding-right: 8px;
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    h4 {
      font-size: 1.1rem !important;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;

    h4 {
      font-size: 1rem !important;
    }
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;

    .ant-btn {
      flex: 1;
      max-width: 200px;
    }
  }
`;

export const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 2px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-dropdown-menu-item {
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.colorText};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary}10;
      color: ${({ theme }) => theme.colorPrimary};
    }

    .anticon {
      margin-right: 6px;
      font-size: 14px;
      color: ${({ theme }) => theme.colorTextSecondary};
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

  @media (max-width: 768px) {
    height: 24px;
    padding: 0 2px;

    .anticon {
      font-size: 12px;
    }
  }
`;
