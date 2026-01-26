import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVehicles } from "@/lib/hooks/useVehicles";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import VehiclesPageSkeleton from "./VehiclesPageSkeleton";
import VehiclesTable from "./VehiclesTable";

export default function VehiclesPage() {
  const { vehicles, isLoadingVehicles } = useVehicles();

  if (!vehicles || isLoadingVehicles) {
    return (
      <VehiclesPageSkeleton />
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
            <Link to="/fleet/new" className="flex items-center gap-2">
              <Plus className="size-4" />
              Add new Car
            </Link>
          </Button>
        </div>
      </Card>

      <VehiclesTable vehicles={vehicles} />
    </div>
  )
}
