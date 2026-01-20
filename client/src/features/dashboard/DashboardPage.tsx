"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDashboard } from '@/lib/hooks/useDashboard'
import { MoreHorizontalIcon } from 'lucide-react';
import { XAxis, AreaChart, Area, CartesianGrid, PieChart, Pie, Label } from 'recharts';

const chartData = [
  { month: "Sty", total: 1200 },
  { month: "Lut", total: 1800 },
  { month: "Mar", total: 1500 },
  { month: "Kwi", total: 2200 },
  { month: "Maj", total: 2000 },
  { month: "Cze", total: 2600 },
]

const chartConfig = {
  total: {
    label: "totalRentals",
    color: "hsl(221 83% 53%)",
  },
} satisfies ChartConfig

const chartData2 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig2 = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(14, 54%, 17%)" },
  safari: { label: "Safari", color: "hsl(221 83% 53%)" },
  firefox: { label: "Firefox", color: "hsl(340, 83%, 53%)" },
} satisfies ChartConfig

export default function DashboardPage() {
  const { dashboardSummary } = useDashboard() || {};

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Cars Rented</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {dashboardSummary?.totalVehiclesRented ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Rentals</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {dashboardSummary?.activeRentals ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {dashboardSummary?.monthlyRevenue ?? 0} PLN
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Performence</CardTitle>
            <CardDescription>Rental trend over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12, top: 10 }}
              >
                <defs>
                  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartConfig.total.color}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartConfig.total.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.2} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                />

                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                <Area
                  dataKey="total"
                  type="monotone"
                  fill="url(#fillTotal)"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
          </CardHeader>
          <ChartContainer config={chartConfig2}>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData2}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            662
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Cars
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} className="-translate-y-2 flex-wrap gap-2" />
            </PieChart>
          </ChartContainer>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent bookings</CardTitle>
          <CardAction>
            <Button variant="outline" size="sm">View All</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Car Model</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="group">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 rounded-lg border">
                    <AvatarImage src="https://github.com/shadcn.png" className="rounded-lg" />
                    <AvatarFallback className="rounded-lg">TS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Tesla Model 3</span>
                    <span className="text-xs text-muted-foreground">Electric • Sedan</span>
                  </div>
                </div>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">432678432</span>
                    <span className="text-xs text-muted-foreground italic">jan.k@example.com</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>20 Jan 2026</span>
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">3 Days</span>
                  </div>
                </TableCell>
                <TableCell>
                  Total Price
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completed
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}