import styled from 'styled-components';
import { Form, Select, Input } from 'antd';

export const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colorText};
    font-weight: 500;
  }

  .ant-form-item-explain-error {
    color: ${({ theme }) => theme.colors.error.main};
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[50]} !important;
    border-color: ${({ theme }) => theme.colorBorder} !important;
    color: ${({ theme }) => theme.colorText} !important;
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colorTextSecondary} !important;
  }

  &:hover .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary.main}20`} !important;
  }
`;

export const StyledInput = styled(Input)`
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[50]};
  border-color: ${({ theme }) => theme.colorBorder};
  color: ${({ theme }) => theme.colorText};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary.main}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colorTextSecondary};
  }

  &:disabled {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[50]};
  border-color: ${({ theme }) => theme.colorBorder};
  color: ${({ theme }) => theme.colorText};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary.main}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const FormCol = styled.div`
  flex: 1;
`;
