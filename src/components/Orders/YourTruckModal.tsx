import React from 'react';
import { Modal, Typography, Row, Col, Button, Space, Input, message } from 'antd';
import { TruckOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import { TruckLocationService } from '@/services/truckLocation.service';
import { useResourceHelpers } from '@/utils/i18nBridge';

const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.colorText};
  }

  .ant-modal-header {
    background-color: ${props => props.theme.backgroundColor};
    border-bottom: 1px solid ${props => props.theme.colorBorder};

    .ant-modal-title {
      color: ${props => props.theme.colorTextHeading};
    }
  }
`;

const DescriptionText = styled(Text)`
  color: ${props => props.theme.colorTextSecondary};
  display: block;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;

  .ant-input {
    background-color: ${props => (props.theme.isDarkMode ? '#141414' : '#ffffff')};
    border-color: ${props => props.theme.colorBorder};
    color: ${props => props.theme.colorText};

    &:hover {
      border-color: ${props => props.theme.colorPrimary};
    }

    &:focus {
      border-color: ${props => props.theme.colorPrimary};
      box-shadow: 0 0 0 2px ${props => props.theme.colorPrimary}20;
    }
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.colorText};
    font-weight: 500;
  }
`;

interface YourTruckModalProps {
  open: boolean;
  onClose: () => void;
}

const YourTruckModal: React.FC<YourTruckModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const [postalCode, setPostalCode] = React.useState('');
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const truckLocationService = new TruckLocationService();

  // Get reactive translation helpers that update when language changes
  const resourceHelpers = useResourceHelpers();

  // Load existing truck location data when modal opens
  React.useEffect(() => {
    if (open) {
      loadExistingLocation();
    }
  }, [open]);

  const loadExistingLocation = async () => {
    try {
      const existingLocation = await truckLocationService.getTruckLocation();
      if (existingLocation) {
        setPostalCode(existingLocation.postalCode);
        setCity(existingLocation.city);
      }
    } catch (error) {
      console.error(resourceHelpers.getTruckText('MODAL.ERROR_MESSAGES.LOAD_FAILED'), error);
    }
  };

  // Enhanced validation functions
  const isPostalCodeValid = (code: string) => {
    const trimmedCode = code.trim();

    // Required field check
    if (trimmedCode.length === 0) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.POSTAL_CODE.REQUIRED'),
      };
    }

    // Minimum length check
    if (trimmedCode.length < 3) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.POSTAL_CODE.MIN_LENGTH'),
      };
    }

    // Maximum length check
    if (trimmedCode.length > 10) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.POSTAL_CODE.MAX_LENGTH'),
      };
    }

    // Format validation for different postal code types
    const patterns = {
      // US ZIP codes: 12345 or 12345-6789
      us: /^[0-9]{5}(-[0-9]{4})?$/,
      // Canadian postal codes: K1A 0A6 or K1A0A6
      ca: /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/,
      // UK postal codes: SW1A 1AA or M1 1AA
      uk: /^[A-Za-z]{1,2}[0-9][A-Za-z0-9]?\s?[0-9][A-Za-z]{2}$/,
      // Generic alphanumeric with spaces and hyphens
      generic: /^[A-Za-z0-9\s-]{3,10}$/,
    };

    // Check against patterns
    const isValidFormat = Object.values(patterns).some(pattern => pattern.test(trimmedCode));

    if (!isValidFormat) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText(
          'MODAL.VALIDATION_MESSAGES.POSTAL_CODE.INVALID_FORMAT'
        ),
      };
    }

    return { isValid: true, message: '' };
  };

  const isCityValid = (cityName: string) => {
    const trimmedCity = cityName.trim();

    // Required field check
    if (trimmedCity.length === 0) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.REQUIRED'),
      };
    }

    // Minimum length check
    if (trimmedCity.length < 2) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.MIN_LENGTH'),
      };
    }

    // Maximum length check
    if (trimmedCity.length > 50) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.MAX_LENGTH'),
      };
    }

    // Format validation - letters, spaces, hyphens, apostrophes, and periods
    const cityPattern = /^[A-Za-z\s'.-]+$/;
    if (!cityPattern.test(trimmedCity)) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.INVALID_FORMAT'),
      };
    }

    // Check for consecutive special characters
    if (/[\s'.-]{2,}/.test(trimmedCity)) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.CONSECUTIVE_CHARS'),
      };
    }

    // Check if it starts or ends with special characters
    if (/^[\s'.-]|[\s'.-]$/.test(trimmedCity)) {
      return {
        isValid: false,
        message: resourceHelpers.getTruckText('MODAL.VALIDATION_MESSAGES.CITY.INVALID_START_END'),
      };
    }

    return { isValid: true, message: '' };
  };

  const getFormValidation = () => {
    const postalCodeValidation = isPostalCodeValid(postalCode);
    const cityValidation = isCityValid(city);

    return {
      postalCode: postalCodeValidation,
      city: cityValidation,
      isFormValid: postalCodeValidation.isValid && cityValidation.isValid,
    };
  };

  const validation = getFormValidation();

  const handleSave = async () => {
    if (!validation.isFormValid) {
      message.error(validation.city.message || validation.postalCode.message);
      return;
    }

    setLoading(true);

    try {
      await truckLocationService.saveTruckLocation({
        postalCode: postalCode.trim(),
        city: city.trim(),
      });

      message.success(resourceHelpers.getTruckText('MODAL.SUCCESS_MESSAGES.SAVED'));

      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Error saving truck location:', error);
      message.error(resourceHelpers.getTruckText('MODAL.ERROR_MESSAGES.SAVE_FAILED'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing without saving
    setPostalCode('');
    setCity('');
    onClose();
  };

  return (
    <StyledModal
      title={
        <Space>
          <TruckOutlined style={{ color: theme.colorPrimary }} />
          <span>{resourceHelpers.getTruckText('MODAL.TITLE')}</span>
        </Space>
      }
      open={open}
      onCancel={handleClose}
      width={800}
      footer={[
        <Button key="close" onClick={handleClose}>
          {resourceHelpers.getTruckText('MODAL.BUTTONS.CLOSE')}
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          disabled={!validation.isFormValid}
          onClick={handleSave}
        >
          {resourceHelpers.getTruckText('MODAL.BUTTONS.SAVE')}
        </Button>,
      ]}
    >
      <DescriptionText>{resourceHelpers.getTruckText('MODAL.DESCRIPTION')}</DescriptionText>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <InputGroup>
            <label>{resourceHelpers.getTruckText('MODAL.LABELS.POSTAL_CODE')}</label>
            <Input
              placeholder={resourceHelpers.getTruckText('MODAL.PLACEHOLDERS.POSTAL_CODE')}
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              status={postalCode && !validation.postalCode.isValid ? 'error' : ''}
            />
            {postalCode && !validation.postalCode.isValid && (
              <span
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px', display: 'block' }}
              >
                {validation.postalCode.message}
              </span>
            )}
          </InputGroup>
        </Col>
        <Col span={12}>
          <InputGroup>
            <label>{resourceHelpers.getTruckText('MODAL.LABELS.CITY')}</label>
            <Input
              placeholder={resourceHelpers.getTruckText('MODAL.PLACEHOLDERS.CITY')}
              value={city}
              onChange={e => setCity(e.target.value)}
              status={city && !validation.city.isValid ? 'error' : ''}
            />
            {city && !validation.city.isValid && (
              <span
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px', display: 'block' }}
              >
                {validation.city.message}
              </span>
            )}
          </InputGroup>
        </Col>
      </Row>
    </StyledModal>
  );
};

export default YourTruckModal;
