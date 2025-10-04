import Link from "next/link";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { invoices, customers, vehicles } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Invoice } from "@/lib/types";

export default function QuotesPage({ searchParams }: { searchParams: { status?: string } }) {
  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.name || 'N/A';
  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.year} ${v.make} ${v.model}` : 'N/A';
  };

  const filteredInvoices = searchParams.status
    ? invoices.filter(invoice => invoice.status === searchParams.status)
    : invoices;

  return (
    <>
      <PageHeader
        title="Quotes & Invoices"
        description="Manage all your quotes and invoices."
      >
        <Button asChild>
          <Link href="/quotes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Quote
          </Link>
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Vehicle</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice: Invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{getCustomerName(invoice.customerId)}</TableCell>
                  <TableCell className="hidden sm:table-cell">{getVehicleName(invoice.vehicleId)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={invoice.status === 'Paid' ? "secondary" : invoice.status === 'Sent' ? "outline" : "default"}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-mono">${invoice.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
