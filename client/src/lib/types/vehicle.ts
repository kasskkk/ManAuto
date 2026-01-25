import type { Photo } from "./photo"

export interface Vehicle {
  id: string
  brand: string
  model: string
  licensePlate: string
  productionYear: number
  createdAt: string
  vehicleType: string
  mainPhotoUrl: string
  photos: Photo[];
}