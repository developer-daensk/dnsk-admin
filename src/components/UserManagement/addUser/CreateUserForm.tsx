import { Form, Button, Modal, message, Spin } from 'antd';
import { useState } from 'react';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { useNavigate } from 'react-router-dom';
import UserDetailsCard from './UserDetailsCard';
import CompanyDataCard from './CompanyDataCard';
import { PageTitle } from '@/components/PageTitle';
import { CreateUserFormData } from '@/types/user-managment.types';

const CreateUserForm = () => {
  const resourceHelpers = useResourceHelpers();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CreateUserFormData) => {
    try {
      setIsSubmitting(true);
      // Here you would typically make an API call to create the user
      console.log('Form values:', values);

      // Show success message
      message.success(resourceHelpers.getUserManagementText('USERS_TABLE.MESSAGES.CREATE_SUCCESS'));

      // Reset form
      form.resetFields();

      // Redirect to user list after a short delay
      setTimeout(() => {
        navigate('/user-management/users');
      }, 1500);
    } catch (err) {
      console.error('Error creating user:', err);
      message.error(resourceHelpers.getUserManagementText('USERS_TABLE.MESSAGES.CREATE_ERROR'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Check if form has been modified
    const isFormModified = form.isFieldsTouched();

    if (isFormModified) {
      Modal.confirm({
        title: resourceHelpers.getUserManagementText('COMMON.CONFIRM_DISCARD_TITLE'),
        content: resourceHelpers.getUserManagementText('COMMON.CONFIRM_DISCARD_MESSAGE'),
        okText: resourceHelpers.getUserManagementText('COMMON.DISCARD'),
        okType: 'danger',
        cancelText: resourceHelpers.getUserManagementText('COMMON.CANCEL'),
        onOk: () => {
          navigate('/user-management/users');
        },
      });
    } else {
      navigate('/user-management/users');
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={isSubmitting}>
      <Form form={form} layout="vertical" onFinish={handleSubmit} scrollToFirstError>
        <PageTitle>{resourceHelpers.getUserManagementText('USERS_TABLE.CREATE_USER')}</PageTitle>
        <UserDetailsCard />
        <CompanyDataCard />

        {/* Action Buttons */}
        <div style={{ textAlign: 'right', marginTop: '24px' }}>
          <Button onClick={handleCancel} style={{ marginRight: '8px' }}>
            {resourceHelpers.getUserManagementText('COMMON.CANCEL')}
          </Button>
          <Button onClick={handleReset} style={{ marginRight: '8px' }}>
            {resourceHelpers.getUserManagementText('COMMON.RESET')}
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {resourceHelpers.getUserManagementText('USERS_TABLE.CREATE_USER')}
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default CreateUserForm;
