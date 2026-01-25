import { useDashboard } from '@/lib/hooks/useDashboard'
import DashboardAreaChart from './DashboardAreaChart';
import DashboardPieChart from './DashboardPieChart';
import DashboardTable from './DashboardTable';
import DashboardStats from './DashboardStats';
import DashboardPageSkeleton from './DashboardPageSkeleton';

export default function DashboardPage() {
  const { dashboardSummary, isLoadingDashboard } = useDashboard() || {};

  if (isLoadingDashboard || !dashboardSummary) {
    return (
      <DashboardPageSkeleton />
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStats dashboardSummary={dashboardSummary} />
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <DashboardAreaChart data={dashboardSummary.rentalTrends} />
        <DashboardPieChart />
      </div>

      <DashboardTable dashboardRecentRentals={dashboardSummary.rentals} />
    </div>
  )
}