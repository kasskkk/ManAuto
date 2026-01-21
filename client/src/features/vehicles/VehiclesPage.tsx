import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useVehicles } from "@/lib/hooks/useVehicles";
import { Eye, Pencil, Plus } from "lucide-react";
import { Link } from "react-router";

export default function VehiclesPage() {
  const { vehicles, isLoadingVehicles } = useVehicles();

  if (!vehicles || isLoadingVehicles) {
    return (
      <>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/5" />
          </CardHeader>
        </Card>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allStatuses">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="service">In Service</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allCategories">All Categories</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button asChild>
            <Link to="/vehicleForm" className="flex items-center gap-2">
              <Plus className="size-4" />
              Add new Car
            </Link>
          </Button>
        </div>
      </Card>

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
            {vehicles?.map(vehicle => (
              <TableBody key={vehicle.id}>
                <TableRow className="group">
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
                    <Button>
                      <Pencil />
                    </Button>
                    <Button>
                      <Eye />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
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
    </div>
  )
}
