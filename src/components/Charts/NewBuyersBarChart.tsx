import { Bar } from '@ant-design/charts';
import { Select, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { textResources } from '../../resources/chart.resource';

const buyersData = [
  { date: '2023-10-01', value: 10 },
  { date: '2023-10-02', value: 15 },
  { date: '2023-10-03', value: 12 },
  { date: '2023-10-04', value: 8 },
  { date: '2023-10-05', value: 20 },
  { date: '2023-10-06', value: 18 },
];

export function NewBuyersBarChart() {
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
          onClick={() => console.log(textResources.buttons.refreshNewBuyers)}
        />
      </div>
      <Bar data={buyersData} xField="date" yField="value" height={300} />
    </div>
  );
}
