import { Pie } from '@ant-design/charts';
import { Select, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { textResources } from '../../resources/chart.resource';

const visitorsData = [
  { type: 'New Visitors', value: 60 },
  { type: 'Returning Visitors', value: 40 },
];

export function VisitorsPieChart() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Select defaultValue={textResources.selectOptions.last7Days} style={{ width: 120 }}>
          <Select.Option value={textResources.selectOptions.last7Days}>
            {textResources.selectOptions.last7Days}
          </Select.Option>
          <Select.Option value={textResources.selectOptions.thisMonth}>
            {textResources.selectOptions.thisMonth}
          </Select.Option>
          <Select.Option value={textResources.selectOptions.customRange}>
            {textResources.selectOptions.customRange}
          </Select.Option>
        </Select>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => console.log(textResources.buttons.refreshVisitors)}
        />
      </div>
      <Pie data={visitorsData} angleField="value" colorField="type" height={300} />
    </div>
  );
}
