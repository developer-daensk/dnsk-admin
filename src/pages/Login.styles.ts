import styled from 'styled-components';
import { Typography } from 'antd';
import { neutral, primary } from '../styles/colors';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  color: ${({ theme }) => (theme.isDarkMode ? neutral[50] : neutral[900])} !important;
  font-weight: ${({ theme }) => theme.token?.fontWeightStrong || 600} !important;
  margin: 0 !important;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${primary[500]} !important;
  }
`;
