import { Form, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Label, FormItem, StyledInput } from './EmailForm.styles';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface EmailFormProps {
  loading: boolean;
  onFinish: (values: { email: string }) => Promise<void>;
}

const EmailForm: React.FC<EmailFormProps> = ({ loading, onFinish }) => {
  const resourceHelpers = useResourceHelpers();
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);

  const handleFieldsChange = () => {
    const emailError = form.getFieldError('email');
    const emailValue = form.getFieldValue('email');
    setIsValid(emailValue && emailError.length === 0);
  };

  const handleSubmit = async (values: { email: string }) => {
    await onFinish(values);
  };

  return (
    <Form
      form={form}
      name="email"
      onFinish={handleSubmit}
      layout="vertical"
      requiredMark={false}
      onFieldsChange={handleFieldsChange}
    >
      <Form.Item
        label={<Label>{resourceHelpers.getText('forms.email')}</Label>}
        name="email"
        rules={[
          { required: true, message: resourceHelpers.getText('errors.required') },
          { type: 'email', message: resourceHelpers.getText('errors.invalidEmail') },
        ]}
      >
        <StyledInput
          prefix={<MailOutlined />}
          placeholder={resourceHelpers.getText('forms.email')}
          size="large"
          autoComplete="email"
        />
      </Form.Item>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
          disabled={!isValid || loading}
        >
          {resourceHelpers.getText('forms.submit')}
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
