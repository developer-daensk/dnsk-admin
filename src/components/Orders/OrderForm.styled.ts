import styled from 'styled-components';
import { Card, Form, Input, Select, InputNumber, Typography } from 'antd';

const { Text, Title } = Typography;

// Main Container
export const StyledContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50]};
  min-height: 100vh;
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]};
`;

// Header Section
export const StyledHeader = styled.div`
  background: ${({ theme }) => (theme.isDarkMode ? theme.colors.neutral[800] : '#ffffff')};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid
    ${({ theme }) => (theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200])};
`;

export const StyledHeaderTitle = styled(Title)`
  margin: 0 !important;
  font-size: 1.25rem !important;
  color: ${({ theme }) => theme.colorText} !important;
`;

// Card Components
export const StyledCard = styled(Card)`
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[800] : '#ffffff'} !important;
  margin-bottom: ${({ theme }) => theme.spacing.lg} !important;

  .ant-card-head {
    background: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[800] : '#ffffff'} !important;

    .ant-card-head-title {
      color: ${({ theme }) => theme.colorText} !important;
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold} !important;
    }
  }

  .ant-card-body {
    background: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[800] : '#ffffff'} !important;
  }
`;

// Order Items Section
export const OrderItemsEmpty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]};
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100]};
`;

export const ItemRow = styled.div`
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[50]};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Actions Section
export const BottomActions = styled.div`
  text-align: right;
`;

// Total Display
export const TotalDisplay = styled.div`
  text-align: center;

  .total-label {
    color: ${({ theme }) => theme.colorText} !important;
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .total-amount {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// Form Components
export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colorText} !important;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium} !important;
  }

  .ant-form-item-explain-error {
    color: ${({ theme }) => theme.colors.error.main} !important;
  }

  .ant-form-item-explain-success {
    color: ${({ theme }) => theme.colors.success.main} !important;
  }

  .ant-form-item-explain-warning {
    color: ${({ theme }) => theme.colors.warning.main} !important;
  }

  .ant-form-item-extra {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
  }
`;

// Input Components
export const StyledInput = styled(Input)`
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : '#ffffff'} !important;
  border-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]} !important;
  color: ${({ theme }) => theme.colorText} !important;

  &::placeholder {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light} !important;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20 !important;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[700] : '#ffffff'} !important;
    border-color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]} !important;
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;
  }

  &:hover .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary.light} !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20 !important;
  }

  .ant-select-selection-item {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : '#ffffff'} !important;
  border-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]} !important;
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;

  &::placeholder {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light} !important;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20 !important;
  }

  .ant-input-number-input {
    background: transparent !important;
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;

    &::placeholder {
      color: ${({ theme }) =>
        theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
    }
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[700] : '#ffffff'} !important;
  border-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]} !important;
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;

  &::placeholder {
    color: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500]} !important;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light} !important;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20 !important;
  }
`;

// Text Components
export const StyledText = styled(Text)`
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.neutral[100] : theme.colors.neutral[900]} !important;
`;
