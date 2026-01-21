import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import type { DashboardRecentRent } from "@/lib/types";
import { MoreHorizontalIcon } from "lucide-react";

interface Props {
    dashboardRecentRentals: DashboardRecentRent[];
}

export default function DashboardTable({ dashboardRecentRentals }: Props) {

    const statusStyles: Record<string, string> = {
        'Reserved': 'bg-chart-2 -text-chart-2 border-chart-2',
        'Completed': 'bg-chart-2/10 text-chart-2 border-chart-2',
        'Cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
        'Active': 'bg-amber-100 text-amber-800 border-amber-200',
        'Returned': 'bg-purple-100 text-purple-800 border-purple-200',
    };

    return (
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
                            <TableHead className="w-[250px]">CAR MODEL</TableHead>
                            <TableHead>CUSTOMER</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>AMOUNT</TableHead>
                            <TableHead>STATS</TableHead>
                            <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dashboardRecentRentals.map((rental) => (
                            <TableRow className="group">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-9 rounded-lg border">
                                            <AvatarImage src="https://github.com/shadcn.png" className="rounded-lg" />
                                            <AvatarFallback className="rounded-lg">TS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{rental.model}</span>
                                            <span className="text-xs text-muted-foreground">{rental.brand}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{rental.customer.phoneNumber}</span>
                                        <span className="text-xs text-muted-foreground italic">{rental.customer.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <span>{rental.createdAt}</span>
                                        {/* <span className="text-[10px] uppercase text-muted-foreground font-semibold">3 Days</span> */}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    Total Price
                                </TableCell>
                                <TableCell>
                                    {/* <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        {rental.rentalStatus}
                                        statusStyles[rental.rentalStatus]
                                        ${ }
                                    </span> */}
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${statusStyles[rental.rentalStatus] || 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {rental.rentalStatus}
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
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
