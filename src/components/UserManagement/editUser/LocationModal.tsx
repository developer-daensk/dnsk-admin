import React, { useEffect } from 'react';
import { message, Modal } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import type { CreateUserLocation } from '@/types/user-managment.types';
import {
  StyledForm,
  StyledSelect,
  StyledInput,
  StyledTextArea,
  FormRow,
  FormCol,
} from './LocationModal.style';

interface LocationModalProps {
  visible: boolean;
  mode: 'add' | 'assign' | 'edit';
  location?: CreateUserLocation;
  onOk: (values: Partial<CreateUserLocation>) => void;
  onCancel: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  mode,
  location,
  onOk,
  onCancel,
}) => {
  const resourceHelpers = useResourceHelpers();
  const [form] = StyledForm.useForm();

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && location) {
        form.setFieldsValue(location);
      } else {
        form.resetFields();
      }
    }
  }, [visible, mode, location, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      onOk(values);
      message.success(
        mode === 'add'
          ? resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MESSAGES.ADD_SUCCESS') ||
              'Location added successfully!'
          : mode === 'assign'
            ? resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MESSAGES.ASSIGN_SUCCESS') ||
              'Location assigned successfully!'
            : resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MESSAGES.UPDATE_SUCCESS') ||
              'Location updated successfully!'
      );
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'add':
        return (
          resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.TITLE.ADD') ||
          'Add New Location'
        );
      case 'assign':
        return (
          resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.TITLE.ASSIGN') ||
          'Assign Existing Location'
        );
      case 'edit':
        return (
          resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.TITLE.EDIT') ||
          'Edit Location'
        );
      default:
        return (
          resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.TITLE.DEFAULT') || 'Location'
        );
    }
  };

  const getOkText = () => {
    switch (mode) {
      case 'add':
        return resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.ADD') || 'Add';
      case 'assign':
        return resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.ASSIGN') || 'Assign';
      case 'edit':
        return resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.UPDATE') || 'Update';
      default:
        return resourceHelpers.getUserManagementText('COMMON.OK') || 'OK';
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={600}
      okText={getOkText()}
      cancelText={resourceHelpers.getUserManagementText('COMMON.CANCEL') || 'Cancel'}
      destroyOnClose
    >
      <StyledForm form={form} layout="vertical" style={{ marginTop: 16 }}>
        {mode === 'assign' ? (
          // For assign mode, show a dropdown of existing locations
          <>
            <StyledForm.Item
              name="locationId"
              label={
                resourceHelpers.getUserManagementText(
                  'LOCATIONS_TABLE.MODAL.FIELDS.SELECT_LOCATION'
                ) || 'Select Location'
              }
              rules={[
                {
                  required: true,
                  message:
                    resourceHelpers.getUserManagementText(
                      'LOCATIONS_TABLE.ERRORS.SELECT_LOCATION'
                    ) || 'Please select a location',
                },
              ]}
            >
              <StyledSelect
                placeholder={
                  resourceHelpers.getUserManagementText(
                    'LOCATIONS_TABLE.PLACEHOLDERS.SELECT_LOCATION'
                  ) || 'Choose from existing locations'
                }
              >
                <StyledSelect.Option value="LOC003">Warehouse California</StyledSelect.Option>
                <StyledSelect.Option value="LOC004">Office Miami</StyledSelect.Option>
                <StyledSelect.Option value="LOC005">Distribution Center Texas</StyledSelect.Option>
              </StyledSelect>
            </StyledForm.Item>
            <StyledForm.Item
              name="type"
              label={
                resourceHelpers.getUserManagementText(
                  'LOCATIONS_TABLE.MODAL.FIELDS.ASSIGNMENT_TYPE'
                ) || 'Assignment Type'
              }
              rules={[
                {
                  required: true,
                  message:
                    resourceHelpers.getUserManagementText(
                      'LOCATIONS_TABLE.ERRORS.ASSIGNMENT_TYPE'
                    ) || 'Please select assignment type',
                },
              ]}
            >
              <StyledSelect
                placeholder={
                  resourceHelpers.getUserManagementText(
                    'LOCATIONS_TABLE.PLACEHOLDERS.ASSIGNMENT_TYPE'
                  ) || 'Select assignment type'
                }
              >
                <StyledSelect.Option value="primary">
                  {resourceHelpers.getUserManagementText(
                    'LOCATIONS_TABLE.ASSIGNMENT_TYPES.PRIMARY'
                  ) || 'Primary Location'}
                </StyledSelect.Option>
                <StyledSelect.Option value="secondary">
                  {resourceHelpers.getUserManagementText(
                    'LOCATIONS_TABLE.ASSIGNMENT_TYPES.SECONDARY'
                  ) || 'Secondary Location'}
                </StyledSelect.Option>
                <StyledSelect.Option value="temporary">
                  {resourceHelpers.getUserManagementText(
                    'LOCATIONS_TABLE.ASSIGNMENT_TYPES.TEMPORARY'
                  ) || 'Temporary Access'}
                </StyledSelect.Option>
              </StyledSelect>
            </StyledForm.Item>
          </>
        ) : (
          // For add/edit mode, show full form
          <>
            <StyledForm.Item
              name="name"
              label={
                resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.NAME') ||
                'Location Name'
              }
              rules={[
                {
                  required: true,
                  message:
                    resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ERRORS.NAME') ||
                    'Please enter location name',
                },
              ]}
            >
              <StyledInput
                placeholder={
                  resourceHelpers.getUserManagementText('LOCATIONS_TABLE.PLACEHOLDERS.NAME') ||
                  'e.g., Main Office, Warehouse A'
                }
              />
            </StyledForm.Item>

            <StyledForm.Item
              name="address"
              label={
                resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.ADDRESS') ||
                'Address'
              }
              rules={[
                {
                  required: true,
                  message:
                    resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ERRORS.ADDRESS') ||
                    'Please enter address',
                },
              ]}
            >
              <StyledTextArea
                rows={3}
                placeholder={
                  resourceHelpers.getUserManagementText('LOCATIONS_TABLE.PLACEHOLDERS.ADDRESS') ||
                  'Full address including street, city, state, zip code'
                }
              />
            </StyledForm.Item>

            <FormRow>
              <FormCol>
                <StyledForm.Item
                  name="type"
                  label={
                    resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.TYPE') ||
                    'Location Type'
                  }
                  rules={[
                    {
                      required: true,
                      message:
                        resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ERRORS.TYPE') ||
                        'Please select location type',
                    },
                  ]}
                >
                  <StyledSelect
                    placeholder={
                      resourceHelpers.getUserManagementText('LOCATIONS_TABLE.PLACEHOLDERS.TYPE') ||
                      'Select type'
                    }
                  >
                    <StyledSelect.Option value="Office">
                      {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TYPES.OFFICE') ||
                        'Office'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="Warehouse">
                      {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TYPES.WAREHOUSE') ||
                        'Warehouse'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="Distribution Center">
                      {resourceHelpers.getUserManagementText(
                        'LOCATIONS_TABLE.TYPES.DISTRIBUTION_CENTER'
                      ) || 'Distribution Center'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="Retail Store">
                      {resourceHelpers.getUserManagementText(
                        'LOCATIONS_TABLE.TYPES.RETAIL_STORE'
                      ) || 'Retail Store'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="Manufacturing">
                      {resourceHelpers.getUserManagementText(
                        'LOCATIONS_TABLE.TYPES.MANUFACTURING'
                      ) || 'Manufacturing'}
                    </StyledSelect.Option>
                  </StyledSelect>
                </StyledForm.Item>
              </FormCol>
              <FormCol>
                <StyledForm.Item
                  name="status"
                  label={
                    resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.STATUS') ||
                    'Status'
                  }
                  rules={[
                    {
                      required: true,
                      message:
                        resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ERRORS.STATUS') ||
                        'Please select status',
                    },
                  ]}
                  initialValue="active"
                >
                  <StyledSelect>
                    <StyledSelect.Option value="active">
                      {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.STATUS.ACTIVE') ||
                        'Active'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="inactive">
                      {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.STATUS.INACTIVE') ||
                        'Inactive'}
                    </StyledSelect.Option>
                    <StyledSelect.Option value="maintenance">
                      {resourceHelpers.getUserManagementText(
                        'LOCATIONS_TABLE.STATUS.MAINTENANCE'
                      ) || 'Maintenance'}
                    </StyledSelect.Option>
                  </StyledSelect>
                </StyledForm.Item>
              </FormCol>
            </FormRow>
          </>
        )}
      </StyledForm>
    </Modal>
  );
};

export default LocationModal;
