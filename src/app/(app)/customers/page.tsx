
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import { customers, vehicles } from "@/lib/data";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomersPage() {
  const getVehicleCount = (customerId: string) => {
    return vehicles.filter(v => v.clientId === customerId).length;
  }

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage your customer profiles and their vehicles."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Vehicles</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Link href={`/customers/${customer.id}`} className="flex items-center gap-4 group">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={customer.avatarUrl} alt={customer.name} data-ai-hint="person face" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium group-hover:underline">{customer.name}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{customer.email}</div>
                    <div className="text-sm text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">{getVehicleCount(customer.id)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/customers/${customer.id}`}>View</Link>
                    </Button>
                     <Button variant="outline" size="sm" asChild>
                      <Link href={`/customers/${customer.id}`}>
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
