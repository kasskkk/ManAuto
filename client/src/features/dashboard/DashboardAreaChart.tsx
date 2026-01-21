"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";

interface Props {
    data: {
        date: string;
        rentalCount: number
    }[] | undefined;
}

const chartConfig = {
    total: {
        label: "totalRentals",
        color: "hsl(221 83% 53%)",
    },
} satisfies ChartConfig

export default function DashboardAreaChart({ data }: Props) {
    return (
        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle>Monthly Performence</CardTitle>
                <CardDescription>Rental trends over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={data}
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
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            interval="preserveStartEnd"
                        />

                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <Area
                            dataKey="rentalCount"
                            type="monotone"
                            fill="url(#fillTotal)"
                            stroke="var(--color-total)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
