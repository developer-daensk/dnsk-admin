import { ReactNode } from 'react';
import { StyledLayout, StyledContent, AuthContainer } from './AuthLayout.styles';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledContent>
        <AuthContainer>{children}</AuthContainer>
      </StyledContent>
    </StyledLayout>
  );
};

export default AuthLayout;
