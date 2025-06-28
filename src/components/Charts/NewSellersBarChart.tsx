import { Bar } from '@ant-design/charts';
import { Select, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { textResources } from '../../resources/chart.resource';

const sellersData = [
  { date: '2023-10-01', value: 5 },
  { date: '2023-10-02', value: 3 },
  { date: '2023-10-03', value: 8 },
  { date: '2023-10-04', value: 2 },
  { date: '2023-10-05', value: 6 },
  { date: '2023-10-06', value: 7 },
];

export function NewSellersBarChart() {
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
          onClick={() => console.log(textResources.buttons.refreshNewSellers)}
        />
      </div>
      <Bar data={sellersData} xField="date" yField="value" height={300} />
    </div>
  );
}
