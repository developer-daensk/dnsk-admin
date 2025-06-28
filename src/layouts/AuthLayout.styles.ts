import styled from 'styled-components';
import { Layout } from 'antd';
import { neutral, primary } from '../styles/colors';

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.isDarkMode
      ? `linear-gradient(135deg, ${neutral[800]} 0%, ${neutral[900]} 100%)`
      : `linear-gradient(135deg, ${primary[50]} 0%, ${neutral[50]} 100%)`};
`;

export const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.token?.paddingLG || 24}px;
`;

export const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: ${({ theme }) => theme.token?.borderRadiusLG || 8}px;
  box-shadow: 0 8px 24px
    ${({ theme }) => (theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)')};
  background: ${({ theme }) => (theme.isDarkMode ? neutral[800] : neutral[50])};
  padding: ${({ theme }) => theme.token?.paddingLG || 24}px;
  border: 1px solid ${({ theme }) => (theme.isDarkMode ? neutral[700] : neutral[200])};
  transition: all 0.3s ease;
`;
