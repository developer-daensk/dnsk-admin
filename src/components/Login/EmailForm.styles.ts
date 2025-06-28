import styled from 'styled-components';
import { Typography, Form, Input } from 'antd';

export const StyledText = styled(Typography.Text)`
  display: block;
  margin-bottom: ${({ theme }) => theme.marginLG}px;
  color: ${({ theme }) => theme.colorTextSecondary};
  font-size: ${({ theme }) => theme.fontSize}px;
`;

export const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colorTextHeading};
  font-size: ${({ theme }) => theme.fontSize}px;
`;

export const FormItem = styled(Form.Item)`
  margin-top: ${({ theme }) => theme.marginLG}px;
`;

export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-color: ${({ theme }) => theme.colorBorder};
  color: ${({ theme }) => theme.colorText};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colorPrimary};
  }

  .anticon {
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;
