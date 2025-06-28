import React from 'react';
import { FileTextOutlined, ShopOutlined as ListingIcon, UserAddOutlined } from '@ant-design/icons';
import {
  StyledCard,
  StatusContainer,
  StatusItem,
  IconWrapper,
  StatusContent,
  StatusLabel,
  StatusDescription,
  StatusTag,
} from './NotificationStatusCard.style';

interface UserStatusInfo {
  hasSellerApplication: boolean;
  sellerApplicationStatus: 'pending' | 'approved' | 'rejected' | null;
  listsGoods: boolean;
  goodsCount: number;
  hasDocuments: boolean;
  documentsCount: number;
  pendingDocumentReview: boolean;
}

interface NotificationStatusCardProps {
  userStatus: UserStatusInfo | null;
}

const NotificationStatusCard: React.FC<NotificationStatusCardProps> = ({ userStatus }) => {
  if (!userStatus) return null;

  return (
    <StyledCard
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            Notification / Status / Information
          </span>
        </div>
      }
      size="small"
    >
      <StatusContainer>
        {/* Seller Application Status */}
        <StatusItem>
          <IconWrapper>
            <UserAddOutlined style={{ color: '#1890ff', fontSize: '14px' }} />
          </IconWrapper>
          <StatusContent>
            <StatusLabel>Seller Application</StatusLabel>
            <StatusDescription>
              {userStatus.hasSellerApplication ? 'Applied' : 'Not Applied'}
            </StatusDescription>
          </StatusContent>
          <StatusTag color={userStatus.hasSellerApplication ? 'success' : 'default'}>
            {userStatus.sellerApplicationStatus || 'None'}
          </StatusTag>
        </StatusItem>

        {/* Goods Listing Status */}
        <StatusItem>
          <IconWrapper>
            <ListingIcon style={{ color: '#52c41a', fontSize: '14px' }} />
          </IconWrapper>
          <StatusContent>
            <StatusLabel>Goods Listing</StatusLabel>
            <StatusDescription>
              {userStatus.listsGoods ? `${userStatus.goodsCount} items` : 'No listings'}
            </StatusDescription>
          </StatusContent>
          <StatusTag color={userStatus.listsGoods ? 'success' : 'default'}>
            {userStatus.listsGoods ? 'Active' : 'Inactive'}
          </StatusTag>
        </StatusItem>

        {/* Document Review Status */}
        <StatusItem>
          <IconWrapper>
            <FileTextOutlined style={{ color: '#fa8c16', fontSize: '14px' }} />
          </IconWrapper>
          <StatusContent>
            <StatusLabel>Documents</StatusLabel>
            <StatusDescription>
              {userStatus.hasDocuments ? `${userStatus.documentsCount} docs` : 'No docs'}
            </StatusDescription>
          </StatusContent>
          <StatusTag color={userStatus.hasDocuments ? 'success' : 'default'}>
            {userStatus.pendingDocumentReview ? 'Pending' : 'Ready'}
          </StatusTag>
        </StatusItem>
      </StatusContainer>
    </StyledCard>
  );
};

export default NotificationStatusCard;
