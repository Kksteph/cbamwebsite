import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  Users,
  UserPlus,
  Repeat,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data for different months
const monthlyData = {
  "2026-02": {
    totalRevenue: 45680,
    totalCustomers: 234,
    newCustomers: 89,
    returningCustomers: 145,
    averageSale: 195.21,
    previousRevenue: 38950, // January's revenue
    paymentMethods: [
      { method: "Credit Card", amount: 25400 },
      { method: "Cash", amount: 12300 },
      { method: "Debit Card", amount: 5680 },
      { method: "Mobile Pay", amount: 2300 },
    ],
  },
  "2026-01": {
    totalRevenue: 38950,
    totalCustomers: 198,
    newCustomers: 76,
    returningCustomers: 122,
    averageSale: 196.72,
    previousRevenue: 52340, // December's revenue
    paymentMethods: [
      { method: "Credit Card", amount: 21200 },
      { method: "Cash", amount: 10800 },
      { method: "Debit Card", amount: 4950 },
      { method: "Mobile Pay", amount: 2000 },
    ],
  },
  "2025-12": {
    totalRevenue: 52340,
    totalCustomers: 267,
    newCustomers: 102,
    returningCustomers: 165,
    averageSale: 196.03,
    previousRevenue: 48200, // November's revenue
    paymentMethods: [
      { method: "Credit Card", amount: 28900 },
      { method: "Cash", amount: 14500 },
      { method: "Debit Card", amount: 6240 },
      { method: "Mobile Pay", amount: 2700 },
    ],
  },
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState("2026-02");
  const data = monthlyData[selectedMonth as keyof typeof monthlyData];

  const retentionData = [
    { name: "New Customers", value: data.newCustomers, percentage: Math.round((data.newCustomers / data.totalCustomers) * 100) },
    { name: "Returning Customers", value: data.returningCustomers, percentage: Math.round((data.returningCustomers / data.totalCustomers) * 100) },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Monthly Reports</h1>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-02">February 2026</SelectItem>
              <SelectItem value="2026-01">January 2026</SelectItem>
              <SelectItem value="2025-12">December 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${data.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {data.totalRevenue > data.previousRevenue ? (
                  <span className="text-green-600">
                    <ArrowUpRight className="h-4 w-4 inline" />
                    {((data.totalRevenue - data.previousRevenue) / data.previousRevenue * 100).toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-red-600">
                    <ArrowDownRight className="h-4 w-4 inline" />
                    {((data.previousRevenue - data.totalRevenue) / data.previousRevenue * 100).toFixed(2)}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Customers Served
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data.totalCustomers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                New Customers
              </CardTitle>
              <UserPlus className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data.newCustomers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Returning Customers
              </CardTitle>
              <Repeat className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.returningCustomers}
              </div>
              <p className="text-xs text-gray-500 mt-1">Key Metric!</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Sale
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${data.averageSale.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Method Breakdown */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Payment Method Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.paymentMethods}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Retention Rate */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Customer Retention Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={retentionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {retentionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#8b5cf6" : "#10b981"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">New</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {retentionData[0].percentage}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Returning</div>
                  <div className="text-2xl font-bold text-green-600">
                    {retentionData[1].percentage}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}