import Link from "next/link";
import { customers, vehicles, invoices } from "@/lib/data";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, FileText, Mail, Phone, PlusCircle, User, StickyNote, ArrowUpRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = customers.find((c) => c.id === params.id);
  
  if (!customer) {
    notFound();
  }

  const customerVehicles = vehicles.filter((v) => v.clientId === customer.id);
  const customerInvoices = invoices.filter((i) => i.customerId === customer.id);

  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.year} ${v.make} ${v.model}` : 'N/A';
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage src={customer.avatarUrl} alt={customer.name} data-ai-hint="person face"/>
            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> {customer.email}</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {customer.phone}</span>
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/quotes/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Quote
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="vehicles">
        <TabsList className="mb-4">
          <TabsTrigger value="vehicles"><Car className="h-4 w-4 mr-2"/>Vehicles ({customerVehicles.length})</TabsTrigger>
          <TabsTrigger value="history"><FileText className="h-4 w-4 mr-2"/>Service History</TabsTrigger>
          <TabsTrigger value="notes"><StickyNote className="h-4 w-4 mr-2"/>Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Vehicles</CardTitle>
              <CardDescription>All vehicles registered under {customer.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {customerVehicles.map((vehicle) => (
                  <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`} className="block hover:bg-muted/50 rounded-lg">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {vehicle.nickname}
                          <Badge variant="secondary">{vehicle.licensePlate}</Badge>
                        </CardTitle>
                        <CardDescription>{vehicle.year} {vehicle.make} {vehicle.model}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">VIN: {vehicle.vin}</p>
                        <p className="text-sm text-muted-foreground">Mileage: {vehicle.currentMileage.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                 <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-2 border-dashed">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                  <span className="text-muted-foreground">Add New Vehicle</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>A complete timeline of all services and transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {customerInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center bg-secondary rounded-full h-10 w-10">
                        <FileText className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div className="flex-1 w-px bg-border my-2"></div>
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id} - {getVehicleName(invoice.vehicleId)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()} &middot; Total: ${invoice.total.toFixed(2)}</p>
                      <Badge className="mt-1" variant={invoice.status === 'Paid' ? 'secondary' : invoice.status === 'Sent' ? 'outline' : 'default'}>{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
                <CardDescription>Notes are only visible to your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Add a note about this customer..." />
              <Button>Save Note</Button>
              <div className="border-t pt-4 mt-4 space-y-4">
                 <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="https://picsum.photos/seed/10/200/200" alt="Admin"/>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">Customer is very particular about using OEM parts only.</p>
                      <p className="text-xs text-muted-foreground">Admin User - 2 days ago</p>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
