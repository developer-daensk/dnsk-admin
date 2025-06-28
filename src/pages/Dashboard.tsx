import { Card, Row, Col } from 'antd';
import { VisitorsPieChart } from '../components/Charts/VisitorsPieChart';
import { NewSellersBarChart } from '../components/Charts/NewSellersBarChart';
import { NewBuyersBarChart } from '../components/Charts/NewBuyersBarChart';
import { ActiveOrdersLineChart } from '../components/Charts/ActiveOrdersLineChart';
import { useResourceHelpers } from '@/utils/i18nBridge';

export function Dashboard() {
  const resourceHelpers = useResourceHelpers();

  return (
    <div style={{ padding: '24px', maxWidth: '100%', overflowX: 'hidden' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title={resourceHelpers.getChartText('cardTitles.visitors')}>
            <VisitorsPieChart />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title={resourceHelpers.getChartText('cardTitles.newSellers')}>
            <NewSellersBarChart />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title={resourceHelpers.getChartText('cardTitles.newBuyers')}>
            <NewBuyersBarChart />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title={resourceHelpers.getChartText('cardTitles.activeOrders')}>
            <ActiveOrdersLineChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
