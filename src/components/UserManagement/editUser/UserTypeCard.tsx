import React from 'react';
import { Checkbox } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, TruckOutlined } from '@ant-design/icons';
import type { User, UserType } from '@/types/user-managment.types';
import {
  StyledCard,
  UserTypesContainer,
  UserTypeItem,
  IconWrapper,
  TypeContent,
  TypeLabel,
  TypeDescription,
  ActiveTag,
  SummaryBox,
} from './UserTypeCard.style';

interface UserTypeCardProps {
  user: User | null;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ user }) => {
  if (!user) return null;

  // All possible user types with metadata
  const allUserTypes = [
    {
      key: 'Buyer' as UserType,
      label: 'Buyer',
      icon: <ShoppingCartOutlined style={{ color: '#52c41a', fontSize: '18px' }} />,
      description: 'Can purchase products and place orders',
      color: '#52c41a',
    },
    {
      key: 'Seller' as UserType,
      label: 'Seller',
      icon: <ShopOutlined style={{ color: '#1890ff', fontSize: '18px' }} />,
      description: 'Can list products and manage sales',
      color: '#1890ff',
    },
    {
      key: 'Logistic (carrier)' as UserType,
      label: 'Logistic Company',
      icon: <TruckOutlined style={{ color: '#fa8c16', fontSize: '18px' }} />,
      description: 'Handles shipping and logistics',
      color: '#fa8c16',
    },
  ];

  return (
    <StyledCard
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Type of User</span>
        </div>
      }
      size="small"
    >
      <UserTypesContainer>
        {allUserTypes.map(type => {
          const isActive = user.userTypes.includes(type.key);

          return (
            <UserTypeItem key={type.key} $isActive={isActive} $color={type.color}>
              <Checkbox checked={isActive} disabled={!isActive} style={{ marginRight: '8px' }} />
              <IconWrapper>
                {React.cloneElement(type.icon, {
                  style: { ...type.icon.props.style, fontSize: '14px' },
                })}
              </IconWrapper>
              <TypeContent>
                <TypeLabel $isActive={isActive}>{type.label}</TypeLabel>
                <TypeDescription>{type.description}</TypeDescription>
              </TypeContent>
              {isActive && <ActiveTag color="success">Active</ActiveTag>}
            </UserTypeItem>
          );
        })}
      </UserTypesContainer>

      <SummaryBox>
        <strong>Active:</strong> {user.userTypes.join(', ')}
      </SummaryBox>
    </StyledCard>
  );
};

export default UserTypeCard;
