import { Line } from '@ant-design/charts';
import { Select, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { textResources } from '../../resources/chart.resource';

const ordersData = [
  { date: '2023-10-01', value: 50 },
  { date: '2023-10-02', value: 45 },
  { date: '2023-10-03', value: 60 },
  { date: '2023-10-04', value: 55 },
  { date: '2023-10-05', value: 70 },
  { date: '2023-10-06', value: 65 },
];

export function ActiveOrdersLineChart() {
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
          onClick={() => console.log(textResources.buttons.refreshActiveOrders)}
        />
      </div>
      <Line data={ordersData} xField="date" yField="value" height={300} responsive />
    </div>
  );
}
