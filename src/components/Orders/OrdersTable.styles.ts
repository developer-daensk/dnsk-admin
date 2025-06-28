import styled from 'styled-components';
import { Tag, Button, Dropdown } from 'antd';

export const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 4px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-dropdown-menu-item {
    padding: 4px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.colorText};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary}10;
      color: ${({ theme }) => theme.colorPrimary};
    }

    .anticon {
      margin-right: 8px;
      font-size: 14px;
      color: ${({ theme }) => theme.colorTextSecondary};
    }
  }
`;

export const ActionButton = styled(Button)`
  padding: 2px 6px;
  height: 28px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colorPrimary}10;
    color: ${({ theme }) => theme.colorPrimary};
  }

  .anticon {
    font-size: 16px;
  }

  &.view-action {
    color: #1890ff;

    &:hover {
      background-color: #e6f7ff;
      color: #096dd9;
    }
  }

  &.edit-action {
    color: #52c41a;

    &:hover {
      background-color: #f6ffed;
      color: #389e0d;
    }
  }
`;

export const StyledTag = styled(Tag)<{ $status?: string }>`
  ${({ $status }) => {
    switch ($status) {
      case 'pending':
        return 'color: #faad14; background: #fffbe6; border-color: #ffe58f;';
      case 'processing':
        return 'color: #1890ff; background: #e6f7ff; border-color: #91d5ff;';
      case 'shipped':
        return 'color: #13c2c2; background: #e6fffb; border-color: #87e8de;';
      case 'delivered':
        return 'color: #52c41a; background: #f6ffed; border-color: #b7eb8f;';
      case 'cancelled':
        return 'color: #ff4d4f; background: #fff1f0; border-color: #ffccc7;';
      case 'refunded':
        return 'color: #722ed1; background: #f9f0ff; border-color: #d3adf7;';
      case 'paid':
        return 'color: #52c41a; background: #f6ffed; border-color: #b7eb8f;';
      case 'failed':
        return 'color: #ff4d4f; background: #fff1f0; border-color: #ffccc7;';
      default:
        return '';
    }
  }}
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .customer-name {
    font-weight: 500;
    color: ${({ theme }) => theme.colorText};
  }

  .customer-email {
    font-size: 12px;
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colorTextSecondary};

  .item-count {
    font-weight: 500;
    color: ${({ theme }) => theme.colorText};
  }
`;

export const TabsWrapper = styled.div`
  .ant-tabs-tab {
    font-weight: 500;

    &.ant-tabs-tab-active {
      font-weight: 600;
    }
  }
`;

export const AddressText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colorTextSecondary};
  line-height: 1.4;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
