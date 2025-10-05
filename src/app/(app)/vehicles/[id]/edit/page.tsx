
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { vehicles, customers } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nickname: z.string().min(2, { message: "Nickname must be at least 2 characters." }),
  make: z.string().min(2, { message: "Make is required." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.coerce.number().min(1900, { message: "Year must be after 1900." }).max(new Date().getFullYear() + 1, { message: "Year can't be in the future." }),
  vin: z.string().optional(),
  licensePlate: z.string().optional(),
  currentMileage: z.coerce.number().min(0).optional(),
});

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const { id: vehicleId } = params;
  const { toast } = useToast();

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: vehicle?.nickname || "",
      make: vehicle?.make || "",
      model: vehicle?.model || "",
      year: vehicle?.year,
      vin: vehicle?.vin || "",
      licensePlate: vehicle?.licensePlate || "",
      currentMileage: vehicle?.currentMileage,
    },
  });
  
  if (!vehicle) {
    return notFound();
  }
  
  const customer = customers.find((c) => c.id === vehicle.clientId);


  function onSubmit(values: z.infer<typeof formSchema>) {
    // A real app would save this to a database
    console.log(values);
    toast({
      title: "Vehicle Updated",
      description: `${values.nickname} has been updated.`,
    });
    router.push(`/vehicles/${vehicleId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PageHeader
          title="Edit Vehicle"
          description={`Editing ${vehicle.nickname} for ${customer?.name}.`}
        >
          <Button variant="outline" asChild>
            <Link href={`/vehicles/${vehicleId}`}>Cancel</Link>
          </Button>
          <Button type="submit">Save Vehicle</Button>
        </PageHeader>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Update the details for the vehicle below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Daily Driver, Work Truck" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., ABC-123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2022" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Honda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Civic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN</FormLabel>
                    <FormControl>
                      <Input placeholder="Vehicle Identification Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentMileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Mileage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
