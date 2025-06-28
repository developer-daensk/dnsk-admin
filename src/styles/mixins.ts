import { css } from 'styled-components';
import { DefaultTheme } from 'styled-components';

// Common mixins that use both theme and CSS variables
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const cardStyle = css`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.colorBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const textStyle = css`
  color: ${({ theme }) => theme.colorText};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const buttonStyle = css`
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-neutral-light);
    cursor: not-allowed;
  }
`;

export const inputStyle = css`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.colorBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colorText};
  font-size: ${({ theme }) => theme.typography.fontSize.md};

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-neutral-light);
    cursor: not-allowed;
  }
`;

// Responsive mixins
export const responsive = {
  mobile: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      ${css(...args)}
    }
  `,
};

// Dark mode specific mixins
export const darkMode = css`
  ${({ theme }: { theme: DefaultTheme }) =>
    theme.isDarkMode &&
    css`
      background-color: ${theme.backgroundColor};
      color: ${theme.colorText};
    `}
`;

// Animation mixins
export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.3s ease-in;
`;

export const slideIn = css`
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  animation: slideIn 0.3s ease-out;
`;
