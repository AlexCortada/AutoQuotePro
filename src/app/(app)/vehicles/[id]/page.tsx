import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles, customers, invoices } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, PlusCircle, StickyNote, Wrench } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = vehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    notFound();
  }

  const customer = customers.find((c) => c.id === vehicle.clientId);
  const vehicleInvoices = invoices.filter((i) => i.vehicleId === vehicle.id);

  return (
    <>
      <PageHeader
        title={vehicle.nickname}
        description={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      >
        <Button asChild>
            <Link href="/quotes/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Quote
            </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div><Badge variant="secondary">{vehicle.licensePlate}</Badge></div>
                    <p className="text-sm"><strong>VIN:</strong> {vehicle.vin}</p>
                    <p className="text-sm"><strong>Mileage:</strong> {vehicle.currentMileage.toLocaleString()} mi</p>
                </CardContent>
            </Card>
            {customer && (
                <Card>
                    <CardHeader>
                        <CardTitle>Owner</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Link href={`/customers/${customer.id}`} className="flex items-center gap-4 group">
                            <Avatar className="h-12 w-12 border">
                                <AvatarImage src={customer.avatarUrl} alt={customer.name} data-ai-hint="person face" />
                                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold group-hover:underline">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="md:col-span-2">
            <Tabs defaultValue="history">
                <TabsList className="mb-4">
                    <TabsTrigger value="history"><FileText className="h-4 w-4 mr-2"/>Service History</TabsTrigger>
                    <TabsTrigger value="notes"><StickyNote className="h-4 w-4 mr-2"/>Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Service History</CardTitle>
                            <CardDescription>A complete timeline of all services for this vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {vehicleInvoices.map((invoice) => (
                                <div key={invoice.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center bg-secondary rounded-full h-10 w-10">
                                        <Wrench className="h-5 w-5 text-secondary-foreground" />
                                    </div>
                                    <div className="flex-1 w-px bg-border my-2"></div>
                                    </div>
                                    <div>
                                    <p className="font-medium">{invoice.id} - Service</p>
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
                            <CardTitle>Vehicle Notes</CardTitle>
                            <CardDescription>Notes are only visible to your team.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <Textarea placeholder="Add a note about this vehicle..." />
                        <Button>Save Note</Button>
                        <div className="border-t pt-4 mt-4 space-y-4">
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8 border">
                                <AvatarImage src="https://picsum.photos/seed/10/200/200" alt="Admin"/>
                                <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="text-sm">Replaced front brake pads at 85,000 miles.</p>
                                <p className="text-xs text-muted-foreground">Admin User - 1 month ago</p>
                                </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </>
  );
}
