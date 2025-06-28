import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Space, App } from 'antd';
import { authService } from '../services/auth.service';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import EmailForm from '../components/Login/EmailForm';
import OtpForm from '../components/Login/OtpForm';
import AuthLayout from '../layouts/AuthLayout';
import { handleApiError } from '../lib/errorHandler';
import { StyledTitle } from './Login.styles';
import { textResources } from '../resources';
import { authTheme } from '../theme/auth.theme';
import { AUTH } from '../lib/constants';

const Login: React.FC = () => {
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { message } = App.useApp();

  const from = location.state?.from?.pathname || '/';

  const startResendTimer = () => {
    setResendDisabled(true);
    setResendTimer(AUTH.RESEND_TIMER);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (values: { email: string }) => {
    try {
      setSendOtpLoading(true);
      const response = await authService.CodeRegister({ email: values.email });
      if (response) {
        setEmail(values.email);
        setStep('otp');
        startResendTimer();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setSendOtpLoading(true);
      const response = await authService.CodeRegister({ email: email });
      if (response) {
        startResendTimer();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOTP = async (values: { otp: string }) => {
    try {
      setVerifyOtpLoading(true);
      dispatch(loginStart());
      const response = await authService.Login({ email, code: values.otp });

      if (!response.data.token || !response.data.refreshToken) {
        message.error(textResources.errors.invalidOtp);
        throw new Error(textResources.errors.invalidOtp);
      } else {
        const authData = {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          email: email,
        };

        localStorage.setItem('userEmail', email);

        dispatch(loginSuccess({ data: authData }));
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleApiError(error);
      dispatch(
        loginFailure(error instanceof Error ? error.message : textResources.errors.loginFailed)
      );
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
  };

  return (
    <AuthLayout>
      <Space direction="vertical" size="large" style={authTheme.space}>
        <StyledTitle level={2} style={authTheme.title}>
          {textResources.messages.welcome}
        </StyledTitle>

        {step === 'email' ? (
          <EmailForm loading={sendOtpLoading} onFinish={handleSendOTP} />
        ) : (
          <OtpForm
            email={email}
            sendOtpLoading={sendOtpLoading}
            loading={verifyOtpLoading}
            resendDisabled={resendDisabled}
            resendTimer={resendTimer}
            onFinish={handleVerifyOTP}
            onResendOtp={handleResendOTP}
            onBackToEmail={handleBackToEmail}
          />
        )}
      </Space>
    </AuthLayout>
  );
};

export default Login;
