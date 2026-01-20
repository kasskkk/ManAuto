import { useDashboard } from '@/lib/hooks/useDashboard'

export default function DashboardPage() {
  const { dashboardSummary } = useDashboard();
  return (
    <div>
      <div>
      {dashboardSummary?.activeRentals}
      </div>
      <div>test</div>
    </div>
  )
}
