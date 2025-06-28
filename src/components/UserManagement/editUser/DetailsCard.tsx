import React, { useState } from 'react';
import { Button, message } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import UserDetailsCard from '../addUser/UserDetailsCard';
import CompanyDataCard from '../addUser/CompanyDataCard';
import type { User, EditUserFormData } from '@/types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface DetailsCardProps {
  user: User;
  onSave?: (data: EditUserFormData) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ user, onSave, onCancel, loading = false }) => {
  const resourceHelpers = useResourceHelpers();
  const [formData, setFormData] = useState<EditUserFormData>({
    name: user.name,
    profileName: user.profileName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    department: user.department,
    location: user.location,
    userTypes: user.userTypes,
  });

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(formData);
        message.success(
          resourceHelpers.getUserManagementText('EDIT_USER_FORM.MESSAGES.SAVE_SUCCESS') ||
            'Changes saved successfully'
        );
      }
    } catch (error) {
      message.error(
        resourceHelpers.getUserManagementText('EDIT_USER_FORM.MESSAGES.SAVE_ERROR') ||
          'Failed to save changes'
      );
      console.error('Error saving user details:', error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleFormChange = (newData: Partial<EditUserFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '24px' }}>
        <UserDetailsCard initialData={formData} onChange={handleFormChange} disabled={loading} />
        <CompanyDataCard initialData={formData} onChange={handleFormChange} disabled={loading} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '24px',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '24px',
        }}
      >
        <Button size="large" icon={<CloseOutlined />} onClick={handleCancel} disabled={loading}>
          {resourceHelpers.getUserManagementText('EDIT_USER_FORM.BUTTONS.CANCEL') || 'Cancel'}
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={loading}
        >
          {resourceHelpers.getUserManagementText('EDIT_USER_FORM.BUTTONS.SAVE') || 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default DetailsCard;
