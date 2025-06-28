import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.colorText};
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-bottom-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-modal-title {
    color: ${({ theme }) => theme.colorTextHeading};
  }

  .ant-modal-close {
    color: ${({ theme }) => theme.colorText};
  }

  .ant-modal-footer {
    border-top-color: ${({ theme }) => theme.colorBorder};
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colorText};
  }

  .ant-input {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
    color: ${({ theme }) => theme.colorText};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colorPrimary};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colorTextSecondary};
    }
  }

  .ant-input-textarea {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.colorBorder};
    color: ${({ theme }) => theme.colorText};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colorPrimary};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colorTextSecondary};
    }
  }

  .ant-btn {
    &-default {
      background-color: ${({ theme }) => theme.backgroundColor};
      border-color: ${({ theme }) => theme.colorBorder};
      color: ${({ theme }) => theme.colorText};

      &:hover {
        border-color: ${({ theme }) => theme.colorPrimary};
        color: ${({ theme }) => theme.colorPrimary};
      }
    }

    &-primary {
      background-color: ${({ theme }) => theme.colorPrimary};
      border-color: ${({ theme }) => theme.colorPrimary};
      color: #fff;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
