"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customers, vehicles, catalogItems } from "@/lib/data";
import type { InvoiceLineItem } from '@/lib/types';
import { PlusCircle, Save, Trash2, Calendar as CalendarIcon, Send } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';

export default function NewQuotePage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [lineItems, setLineItems] = useState<Partial<InvoiceLineItem>[]>([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);

  const availableVehicles = useMemo(() => {
    if (!selectedCustomerId) return [];
    return vehicles.filter(v => v.clientId === selectedCustomerId);
  }, [selectedCustomerId]);

  useEffect(() => {
    setSelectedVehicleId(null);
  }, [selectedCustomerId]);
  
  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveLineItem = (index: number) => {
    const newItems = [...lineItems];
    newItems.splice(index, 1);
    setLineItems(newItems);
  };

  const handleLineItemChange = (index: number, field: keyof InvoiceLineItem, value: any) => {
    const newItems = [...lineItems];
    const item = newItems[index] as InvoiceLineItem;
    (item[field] as any) = value;

    if (field === 'quantity' || field === 'unitPrice') {
        item.total = (item.quantity || 0) * (item.unitPrice || 0);
        const catalogItem = catalogItems.find(ci => ci.name === item.description);
        if (catalogItem && catalogItem.taxRate > 0) {
            item.tax = item.total * (catalogItem.taxRate / 100);
        } else {
            item.tax = 0;
        }
    }
    
    newItems[index] = item;
    setLineItems(newItems);
  };
  
   const handleItemSelect = (index: number, itemName: string) => {
    const catalogItem = catalogItems.find(item => item.name === itemName);
    if (catalogItem) {
      const newItems = [...lineItems];
      const item = newItems[index] as InvoiceLineItem;
      item.description = catalogItem.name;
      item.unitPrice = catalogItem.salePrice;
      item.quantity = item.quantity || 1;
      item.total = item.quantity * item.unitPrice;
      item.tax = catalogItem.taxRate > 0 ? item.total * (catalogItem.taxRate / 100) : 0;
      newItems[index] = item;
      setLineItems(newItems);
    }
  };

  const { subtotal, taxTotal, total } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    lineItems.forEach(item => {
        const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
        sub += itemTotal;
        const catalogItem = catalogItems.find(ci => ci.name === item.description);
        if (catalogItem && catalogItem.taxRate > 0) {
            tax += itemTotal * (catalogItem.taxRate / 100);
        }
    });
    return { subtotal: sub, taxTotal: tax, total: sub + tax };
  }, [lineItems]);

  return (
    <>
      <PageHeader title="Create New Quote" description="Generate a new quote for a customer.">
        <Button variant="outline"><Save className="mr-2 h-4 w-4"/>Save Draft</Button>
        <Button><Send className="mr-2 h-4 w-4"/>Send Quote</Button>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                  <CardTitle>Quote Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                          <Label htmlFor="customer">Customer</Label>
                          <Select onValueChange={setSelectedCustomerId}>
                              <SelectTrigger id="customer">
                                  <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                              <SelectContent>
                                  {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                              </SelectContent>
                          </Select>
                      </div>
                      <div>
                          <Label htmlFor="vehicle">Vehicle</Label>
                          <Select onValueChange={setSelectedVehicleId} disabled={!selectedCustomerId}>
                              <SelectTrigger id="vehicle">
                                  <SelectValue placeholder="Select a vehicle" />
                              </SelectTrigger>
                              <SelectContent>
                                  {availableVehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.nickname} - {v.make} {v.model}</SelectItem>)}
                              </SelectContent>
                          </Select>
                      </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%]">Item</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Select onValueChange={(value) => handleItemSelect(index, value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an item" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {catalogItems.map(ci => <SelectItem key={ci.id} value={ci.name}>{ci.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', parseInt(e.target.value) || 0)} className="w-16" min="1"/>
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" value={item.unitPrice} onChange={e => handleLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-24"/>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveLineItem(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={handleAddLineItem}><PlusCircle className="mr-2 h-4 w-4" />Add Line Item</Button>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quote-id">Quote ID</Label>
                    <Input id="quote-id" defaultValue="QT-2024-004" />
                  </div>
                   <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                   </div>
                   <div className="grid gap-2">
                    <Label>Due Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                   </div>
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span className="font-mono">${taxTotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="font-mono">${total.toFixed(2)}</span>
                      </div>
                    </div>
                </CardContent>
                <CardFooter>
                  <Textarea placeholder="Add internal notes for this quote..." />
                </CardFooter>
            </Card>
        </div>
      </div>
    </>
  );
}
