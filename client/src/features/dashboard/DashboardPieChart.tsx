"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"

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

export default function DashboardPieChart() {
    return (
        <Card className="md:col-span-2">
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
                                                662 mocked data
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
    )
}
