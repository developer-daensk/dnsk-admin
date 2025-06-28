import styled from 'styled-components';
import { Button, Tag } from 'antd';

export const ActionButton = styled(Button)`
  &.ant-btn-text {
    color: ${({ theme }) => theme.colorTextSecondary};
    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
      background: ${({ theme }) => theme.colors.neutral[100]};
    }
  }

  &.ant-btn-dangerous {
    &:hover {
      color: ${({ theme }) => theme.colors.error.main};
      background: ${({ theme }) => theme.colors.error.light};
    }
  }
`;

export const StatusTag = styled(Tag)`
  &.ant-tag {
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 12px;
    line-height: 1.5;
    border: none;
  }

  &.ant-tag-green {
    background: ${({ theme }) => theme.colors.success.light};
    color: ${({ theme }) => theme.colors.success.main};
  }

  &.ant-tag-red {
    background: ${({ theme }) => theme.colors.error.light};
    color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.error.main};
  font-size: 14px;
  line-height: 1.5;
`;
