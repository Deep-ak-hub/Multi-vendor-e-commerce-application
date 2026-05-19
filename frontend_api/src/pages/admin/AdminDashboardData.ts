/**
 * Fake numbers for the dashboard UI. Replace with API data later.
 */
import type { ComponentType } from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export type KpiCardData = {
  label: string;
  value: string;
  sub: string;
  change: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: string;
};

export const kpiCards: KpiCardData[] = [
  {
    label: "Today's sales",
    value: "$4,286.40",
    sub: "POS + online",
    change: "+8.2%",
    icon: CurrencyDollarIcon,
    accent: "from-primary/25 to-primary/5",
  },
  {
    label: "Transactions",
    value: "312",
    sub: "Completed today",
    change: "+3.1%",
    icon: ReceiptPercentIcon,
    accent: "from-secondary/35 to-secondary/5",
  },
  {
    label: "Avg. ticket",
    value: "$13.74",
    sub: "Per transaction",
    change: "+1.4%",
    icon: ChartBarIcon,
    accent: "from-accent/30 to-accent/5",
  },
  {
    label: "Items sold",
    value: "1,840",
    sub: "Units moved",
    change: "+5.6%",
    icon: ShoppingCartIcon,
    accent: "from-chart-3/40 to-chart-3/10",
  },
];

export type OrderRow = {
  id: string;
  customer: string;
  amount: string;
  channel: string;
  status: string;
  time: string;
};

export const recentOrders: OrderRow[] = [
  {
    id: "POS-10482",
    customer: "Jordan Lee",
    amount: "$86.20",
    channel: "POS",
    status: "Completed",
    time: "2 min ago",
  },
  {
    id: "WEB-8831",
    customer: "Samira Khan",
    amount: "$124.00",
    channel: "Online",
    status: "Processing",
    time: "8 min ago",
  },
  {
    id: "POS-10479",
    customer: "Chris Ortiz",
    amount: "$42.50",
    channel: "POS",
    status: "Completed",
    time: "14 min ago",
  },
  {
    id: "WEB-8829",
    customer: "Avery Chen",
    amount: "$310.99",
    channel: "Online",
    status: "Shipped",
    time: "22 min ago",
  },
  {
    id: "POS-10475",
    customer: "Morgan Blake",
    amount: "$19.99",
    channel: "POS",
    status: "Refunded",
    time: "35 min ago",
  },
];

export const lowStockItems = [
  { sku: "SKU-204", name: "Canvas tote", qty: 4 },
  { sku: "SKU-118", name: "Stainless bottle", qty: 9 },
  { sku: "SKU-441", name: "USB-C cable 2m", qty: 12 },
];

export const topProducts = [
  { name: "Organic green tea", units: 86, rev: "$602" },
  { name: "Wireless earbuds", units: 54, rev: "$3,240" },
  { name: "Desk lamp LED", units: 41, rev: "$820" },
];

export const peakHourHeights = [40, 65, 52, 78, 95, 88, 70, 45, 30, 22, 18, 25];
