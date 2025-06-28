import React from 'react';
import { useResourceHelpers } from '@/utils/i18nBridge';
import type { User } from '@/types/user-managment.types';
import { StyledCard, UserIdContainer, UserIdDisplay, UserIdLabel } from './UserIdCard.style';

interface UserIdCardProps {
  user: User | null;
  formattedUserId: string;
}

const UserIdCard: React.FC<UserIdCardProps> = ({ user, formattedUserId }) => {
  const resourceHelpers = useResourceHelpers();

  if (!user) return null;

  return (
    <StyledCard
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.USER_ID') ||
              'User ID Number'}
          </span>
        </div>
      }
      size="small"
    >
      <UserIdContainer>
        <UserIdDisplay>{formattedUserId}</UserIdDisplay>
        <UserIdLabel>12-Digit Unique Identifier</UserIdLabel>
      </UserIdContainer>
    </StyledCard>
  );
};

export default UserIdCard;
