import React from 'react';
import { Table, Button, theme as antTheme, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  StyledCard,
  HeaderContainer,
  ActionButtonsContainer,
  ResponsiveTableWrapper,
} from './BaseTable.styles';
import { useTheme } from 'styled-components';

const { Title } = Typography;

interface BaseTableProps<T> {
  title?: string;
  columns: ColumnsType<T>;
  data: T[];
  loading: boolean;
  rowKey: string;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    showQuickJumper?: boolean;
    pageSizeOptions?: string[];
  };
  onTableChange: (pagination: TablePaginationConfig, filters?: unknown, sorter?: unknown) => void;
  emptyText?: string;
  actions?: React.ReactNode;
  addButton?: {
    text: string;
    onClick: () => void;
  };
  // New responsive props
  minWidth?: number;
  size?: 'small' | 'middle' | 'large';
  enableMobileView?: boolean;
}

/**
 * BaseTable component for displaying data in a themed table
 * @typeparam T The type of data to display in the table
 */
const BaseTable = <T,>({
  title,
  columns,
  data,
  loading,
  rowKey,
  pagination,
  onTableChange,
  emptyText,
  addButton,
  minWidth = 800,
  size = 'middle',
  enableMobileView = true,
}: BaseTableProps<T>) => {
  const theme = useTheme();
  // Using antTheme for fallback values if needed
  const { token } = antTheme.useToken();

  // Apply theme to table components
  const tableProps = {
    className: 'themed-table',
    style: {
      '--table-bg-color': theme.backgroundColor || token.colorBgContainer,
      '--table-border-color': theme.colorBorder || token.colorBorder,
      '--table-text-color': theme.colorText || token.colorText,
      '--table-header-bg': theme.isDarkMode ? '#1f1f1f' : '#fafafa',
      '--table-header-text': theme.colorTextHeading || token.colorTextHeading,
      '--table-row-hover': theme.isDarkMode ? '#262626' : '#f5f5f5',
      '--primary-color': theme.colorPrimary || token.colorPrimary,
    } as React.CSSProperties,
  };

  // Configure responsive scroll behavior
  const scrollConfig = {
    x: minWidth,
    y: enableMobileView ? 'calc(100vh - 400px)' : undefined,
  };

  return (
    <StyledCard>
      <HeaderContainer>
        <Title
          level={4}
          style={{
            fontSize: '1.25rem',
            color: theme.colorText,
            margin: 0,
          }}
        >
          {title}
        </Title>
        {addButton && (
          <ActionButtonsContainer>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addButton.onClick}
              size="middle"
              style={{
                backgroundColor: theme.colorPrimary || token.colorPrimary,
                borderColor: theme.colorPrimary || token.colorPrimary,
              }}
            >
              {addButton.text}
            </Button>
          </ActionButtonsContainer>
        )}
      </HeaderContainer>

      <ResponsiveTableWrapper>
        <Table<T>
          {...tableProps}
          columns={columns}
          dataSource={data}
          rowKey={rowKey}
          loading={loading}
          size={size}
          scroll={scrollConfig}
          pagination={{
            ...pagination,
            showSizeChanger: pagination.showSizeChanger ?? true,
            showQuickJumper: pagination.showQuickJumper ?? true,
            pageSizeOptions: pagination.pageSizeOptions as string[],
            responsive: true,
            itemRender: (page, type, originalElement) => {
              // Apply theme to pagination elements
              if (type === 'page') {
                return <a style={{ color: theme.colorText || token.colorText }}>{page}</a>;
              }
              return originalElement;
            },
            style: {
              color: theme.colorText || token.colorText,
            },
          }}
          onChange={onTableChange}
          locale={{
            emptyText: emptyText || 'No data',
          }}
        />
      </ResponsiveTableWrapper>
    </StyledCard>
  );
};

export default BaseTable;
