import { Form, Input, Button, Space, Typography, theme } from 'antd';
import { LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface OtpFormProps {
  loading: boolean;
  sendOtpLoading: boolean;
  resendDisabled: boolean;
  resendTimer: number;
  email: string;
  onFinish: (values: { otp: string }) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onBackToEmail: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({
  loading,
  sendOtpLoading,
  resendDisabled,
  resendTimer,
  email,
  onFinish,
  onResendOtp,
  onBackToEmail,
}) => {
  const resourceHelpers = useResourceHelpers();
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const { token } = theme.useToken();

  const handleFieldsChange = () => {
    const otpError = form.getFieldError('otp');
    const otpValue = form.getFieldValue('otp');
    setIsValid(otpValue && otpError.length === 0);
  };

  const handleVerifyOTP = async (values: { otp: string }) => {
    try {
      await onFinish(values);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div style={{ padding: token.paddingLG }}>
      <Typography.Text
        style={{ display: 'block', marginBottom: token.marginLG, color: token.colorTextSecondary }}
      >
        {resourceHelpers.getText('messages.otpSent').replace('{email}', email)}
      </Typography.Text>
      <Form
        form={form}
        name="otp"
        onFinish={handleVerifyOTP}
        layout="vertical"
        requiredMark={false}
        onFieldsChange={handleFieldsChange}
      >
        <Form.Item
          name="otp"
          rules={[
            { required: true, message: resourceHelpers.getText('errors.required') },
            { len: 4, message: resourceHelpers.getText('errors.otpLength') },
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />}
            placeholder={resourceHelpers.getText('forms.otp')}
            size="large"
            maxLength={4}
            autoComplete="one-time-code"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            disabled={!isValid || loading}
          >
            {resourceHelpers.getText('forms.verifyOtp')}
          </Button>
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%' }} align="center">
          <Button
            type="link"
            onClick={onResendOtp}
            disabled={resendDisabled}
            loading={sendOtpLoading}
            style={{
              color: resendDisabled ? token.colorTextDisabled : token.colorPrimary,
            }}
          >
            {resendDisabled
              ? resourceHelpers
                  .getText('messages.resendOtpTimer')
                  .replace('{seconds}', resendTimer.toString())
              : resourceHelpers.getText('forms.resendOtp')}
          </Button>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={onBackToEmail}
            style={{
              color: token.colorTextSecondary,
            }}
          >
            {resourceHelpers.getText('forms.backToEmail')}
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default OtpForm;
