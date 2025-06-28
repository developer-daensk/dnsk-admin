import React from 'react';
import { Input, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { SortOption, TableSearchAndFilterProps } from '../../types/common.types';

const { Search } = Input;
const { Option } = Select;

// Re-export for backward compatibility
export type { SortOption };

const TableSearchAndFilter: React.FC<TableSearchAndFilterProps> = ({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearch,
  sortPlaceholder = 'Quick Sort',
  sortValue,
  sortOptions,
  onSortChange,
  itemCount,
  itemTypeSingular,
  itemTypePlural,
  isSorted = false,
  searchWidth = 300,
  sortWidth = 200,
}) => {
  const getItemCountText = () => {
    const itemType = itemCount === 1 ? itemTypeSingular : itemTypePlural;
    const suffix = itemCount === 1 ? '' : 's';
    return `${itemCount} ${itemType}${suffix} found`;
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Space size="middle" wrap>
        <Search
          placeholder={searchPlaceholder}
          allowClear
          value={searchValue}
          onSearch={onSearch}
          onChange={e => onSearch(e.target.value)}
          style={{ width: searchWidth }}
          prefix={<SearchOutlined />}
        />

        <Select
          placeholder={sortPlaceholder}
          allowClear
          value={sortValue}
          onChange={onSortChange}
          style={{ width: sortWidth }}
        >
          {sortOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.icon && option.icon} {option.label}
            </Option>
          ))}
        </Select>

        <div style={{ color: '#666', fontSize: '14px' }}>
          {getItemCountText()}
          {isSorted && <span style={{ marginLeft: 8, color: '#1890ff' }}>(sorted)</span>}
        </div>
      </Space>
    </div>
  );
};

export default TableSearchAndFilter;
