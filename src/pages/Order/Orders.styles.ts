import styled from 'styled-components';
import { Button } from 'antd';

export const PageContainer = styled.div`
  padding: 24px;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .anticon {
    font-size: 24px;
    color: ${({ theme }) => theme.colorPrimary};
  }
`;

export const TruckButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  .anticon {
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  &:hover .anticon {
    transform: translateX(3px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;
