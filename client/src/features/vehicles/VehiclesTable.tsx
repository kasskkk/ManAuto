import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Vehicle } from '@/lib/types'
import { Eye, Pencil } from 'lucide-react'

interface Props {
    vehicles: Vehicle[]
}

export default function VehiclesTable({vehicles}: Props) {
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">CAR MODEL</TableHead>
                            <TableHead>LICENSE PLATE</TableHead>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles?.map(vehicle => (
                            <TableRow key={vehicle.id} className="group">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-9 rounded-lg border">
                                            <AvatarImage src="https://github.com/shadcn.png" className="rounded-lg" />
                                            <AvatarFallback className="rounded-lg">TS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{vehicle.brand}</span>
                                            <span className="text-xs text-muted-foreground">{vehicle.model}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{vehicle.licensePlate}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {vehicle.vehicleType}
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        Completed
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Pencil />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Eye />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination>
                    <PaginationContent>
                        <div>
                            Showing x to x of x results
                        </div>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    )
}
