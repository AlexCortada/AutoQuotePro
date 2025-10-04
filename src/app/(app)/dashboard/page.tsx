import Link from "next/link";
import {
  ArrowUpRight,
  Car,
  Users,
  Wrench,
  FileText,
  PlusCircle,
  Calendar,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { invoices, customers, vehicles } from "@/lib/data";

export default function Dashboard() {
  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.name || 'N/A';
  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.year} ${v.make} ${v.model}` : 'N/A';
  }

  return (
    <>
      <PageHeader title="Welcome Back, Admin!">
        <Button asChild>
          <Link href="/quotes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quote
          </Link>
        </Button>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Today's Appointments
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue (This Month)
            </CardTitle>
            <span className="text-green-500">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicles in Shop</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 new today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>
                A list of the most recent invoices.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/quotes/new">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Vehicle</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 5).map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="font-medium">{getCustomerName(invoice.customerId)}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getVehicleName(invoice.vehicleId)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant={invoice.status === 'Paid' ? 'secondary' : invoice.status === 'Sent' ? 'outline' : 'default'}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
