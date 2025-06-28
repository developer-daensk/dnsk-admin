import { UserManagementTabs } from '@/components';
import { LogisticsTable } from '@/components/UserManagement';

export default function Logistics() {
  return (
    <div>
      <UserManagementTabs />
      <LogisticsTable />
    </div>
  );
}
