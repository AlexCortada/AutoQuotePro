import Link from "next/link";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { vehicles, customers } from "@/lib/data";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function VehiclesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'N/A';
  }

  // A real implementation would fetch this from a DB
  const inProgressVehicleIds = ['102', '103'];

  const filteredVehicles = searchParams?.status === 'in-progress'
    ? vehicles.filter(v => inProgressVehicleIds.includes(v.id))
    : vehicles;

  return (
    <>
      <PageHeader
        title="All Vehicles"
        description="Browse and manage all customer vehicles in one place."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] hidden sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nickname / Plate</TableHead>
                <TableHead className="hidden sm:table-cell">Vehicle</TableHead>
                <TableHead className="hidden md:table-cell">Owner</TableHead>
                <TableHead className="text-right">Mileage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Link href={`/vehicles/${vehicle.id}`}>
                      <Image
                        alt="Vehicle image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={`https://picsum.photos/seed/${vehicle.id}/64/64`}
                        width="64"
                        data-ai-hint="car photo"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/vehicles/${vehicle.id}`} className="block group">
                      <div className="font-medium group-hover:underline">{vehicle.nickname}</div>
                      <Badge variant="outline" className="mt-1 font-mono">{vehicle.licensePlate}</Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{vehicle.year} {vehicle.make} {vehicle.model}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link href={`/customers/${vehicle.clientId}`} className="hover:underline">
                      {getCustomerName(vehicle.clientId)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-mono">{vehicle.currentMileage.toLocaleString()} mi</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
