import styled from 'styled-components';
import { Modal, Tag, Typography, Card } from 'antd';

const { Text } = Typography;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      theme.isDarkMode
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'};
  }

  .ant-modal-header {
    border-bottom: 1px solid
      ${({ theme }) =>
        theme.isDarkMode
          ? '#434343'
          : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
    padding: 20px 24px 16px 24px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
    border-radius: 12px 12px 0 0;
  }

  .ant-modal-title {
    color: ${({ theme }) =>
      theme.isDarkMode ? '#ffffff' : theme.colorText || theme.colors?.neutral?.[900] || '#111827'};
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .ant-modal-body {
    padding: 24px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#141414' : '#fafafa')};
    max-height: calc(100vh - 200px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => (theme.isDarkMode ? '#262626' : '#f1f1f1')};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => (theme.isDarkMode ? '#434343' : '#c1c1c1')};
      border-radius: 3px;

      &:hover {
        background: ${({ theme }) => (theme.isDarkMode ? '#555555' : '#a8a8a8')};
      }
    }
  }

  .ant-modal-close {
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;

    &:hover {
      background-color: transparent;
    }

    .ant-modal-close-x {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      color: ${({ theme }) =>
        theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
      transition: all 0.3s ease;
      background-color: transparent;
      border: 1px solid transparent;

      &:hover {
        background-color: ${({ theme }) =>
          theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} !important;
        color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')} !important;
        border-color: ${({ theme }) =>
          theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
        background-color: ${({ theme }) =>
          theme.isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'} !important;
      }

      .anticon {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 20px;

    .ant-modal-body {
      padding: 16px;
      max-height: calc(100vh - 160px);
    }

    .ant-modal-header {
      padding: 16px 16px 12px 16px;
    }
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 16px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }
`;

export const ActionButtonsSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;

  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#666666')};
    transition: all 0.3s ease;
    padding: 0;

    &:hover {
      background-color: ${({ theme }) => (theme.isDarkMode ? '#434343' : '#f0f0f0')};
      border-color: ${({ theme }) =>
        theme.isDarkMode ? '#555555' : theme.colors?.neutral?.[300] || '#D1D5DB'};
      color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')};
      transform: translateY(-1px);
      box-shadow: ${({ theme }) =>
        theme.isDarkMode
          ? '0 2px 4px -1px rgba(0, 0, 0, 0.3)'
          : '0 2px 4px -1px rgba(0, 0, 0, 0.1)'};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colorPrimary || '#2563EB'};
      box-shadow: 0 0 0 2px
        ${({ theme }) => (theme.isDarkMode ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.1)')};
    }

    .anticon {
      font-size: 16px;
    }
  }
`;

export const StatusTimelineSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  box-shadow: ${({ theme }) =>
    theme.isDarkMode ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};

  .ant-card-body {
    padding: 20px;
  }

  .ant-steps {
    margin-top: 16px;
  }

  .ant-steps-item-title {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')};
  }

  .ant-steps-item-description {
    font-size: 12px;
    color: ${({ theme }) =>
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  .anticon {
    color: ${({ theme }) => theme.colorPrimary || theme.colors?.primary?.main || '#2563EB'};
    font-size: 16px;
  }
`;

export const CustomerSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
  box-shadow: ${({ theme }) =>
    theme.isDarkMode ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};

  .ant-card-body {
    padding: 20px;
  }

  .ant-descriptions-bordered .ant-descriptions-item-label {
    background-color: ${({ theme }) =>
      theme.isDarkMode
        ? '#262626'
        : theme.backgroundColor || theme.colors?.neutral?.[50] || '#F9FAFB'};
    font-weight: 500;
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')};
  }

  .ant-descriptions-bordered .ant-descriptions-item-content {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')};
  }

  .ant-descriptions-bordered .ant-descriptions-item {
    border-color: ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  }
`;

export const PaymentSection = styled(Card)`
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
  box-shadow: ${({ theme }) =>
    theme.isDarkMode ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};

  .ant-card-body {
    padding: 20px;
  }
`;

export const ItemsSection = styled(Card)`
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f1f1f' : '#ffffff')};
  box-shadow: ${({ theme }) =>
    theme.isDarkMode ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};

  .ant-card-body {
    padding: 20px;
  }

  .ant-list {
    margin-top: 16px;
  }
`;

export const OrderItemCard = styled.div`
  background: ${({ theme }) => (theme.isDarkMode ? '#262626' : '#ffffff')};
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  .ant-row {
    align-items: center;
  }

  .item-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) =>
      theme.isDarkMode
        ? `linear-gradient(135deg, ${theme.colors?.primary?.main || '#2563EB'} 0%, ${theme.colors?.primary?.dark || '#1D4ED8'} 100%)`
        : `linear-gradient(135deg, ${theme.colors?.primary?.main || '#2563EB'} 0%, ${theme.colors?.primary?.light || '#60A5FA'} 100%)`};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    box-shadow: ${({ theme }) =>
      theme.isDarkMode
        ? '0 4px 8px -2px rgba(37, 99, 235, 0.3)'
        : '0 4px 8px -2px rgba(37, 99, 235, 0.2)'};
  }

  .item-details {
    flex: 1;
    padding-left: 16px;

    .product-name {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#111827')};
      margin-bottom: 6px;
      line-height: 1.4;
    }

    .product-variation {
      font-size: 13px;
      color: ${({ theme }) =>
        theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
      margin-bottom: 8px;
      font-style: italic;
    }

    .quantity-info {
      font-size: 14px;
      color: ${({ theme }) =>
        theme.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};

      .quantity-label {
        font-weight: 500;
      }

      .quantity-value {
        font-weight: 700;
        color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#111827')};
      }

      .unit-price {
        color: ${({ theme }) =>
          theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
      }
    }
  }

  .item-price {
    text-align: right;

    .total-price {
      font-size: 18px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors?.success?.main || '#059669'};
      line-height: 1.2;
    }
  }

  .ant-typography {
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')} !important;
  }

  .ant-typography-caption {
    color: ${({ theme }) =>
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'} !important;
  }
`;

export const StatusTag = styled(Tag)`
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;

  .anticon {
    font-size: 12px;
  }
`;

export const PriceText = styled(Text)<{ size?: string }>`
  color: ${({ theme }) => theme.colors?.success?.main || '#059669'} !important;
  font-weight: 600;
  font-size: ${({ size }) => (size === 'large' ? '20px' : '14px')};
`;

export const SummarySection = styled(Card)`
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  background: ${({ theme }) =>
    theme.isDarkMode
      ? 'linear-gradient(135deg, #262626 0%, #1f1f1f 100%)'
      : `linear-gradient(135deg, ${theme.colors?.neutral?.[50] || '#F9FAFB'} 0%, #ffffff 100%)`};
  box-shadow: ${({ theme }) =>
    theme.isDarkMode ? '0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};

  .ant-card-body {
    padding: 24px;
  }

  .ant-divider {
    margin: 16px 0;
    border-color: ${({ theme }) =>
      theme.isDarkMode
        ? '#434343'
        : theme.colorBorder || theme.colors?.neutral?.[200] || '#E5E7EB'};
  }

  .ant-typography {
    color: ${({ theme }) => (theme.isDarkMode ? '#ffffff' : '#000000')} !important;
  }
`;
