import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { App as AntApp, ConfigProvider, theme } from 'antd';
import { router } from './router/routes';
import { store } from './store';
import { ThemeProvider, useTheme } from './config/theme/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { neutral } from './styles/colors';
import { queryClient } from './lib/react-query';

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBgElevated: isDarkMode ? neutral[800] : neutral[50],
          colorText: isDarkMode ? neutral[50] : neutral[900],
        },
      }}
    >
      <AntApp message={{ maxCount: 3 }}>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
