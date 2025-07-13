import {
  Calendar,
  DollarSign,
  Download,
  Filter,
  Package,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetData } from "@/hooks/useApi";
import { currencyFormatter } from "@/lib/currency";
import type { APISuccess } from "@/types/api.type";

// Dashboard sample data
export const difficultyDistribution = [
  { difficulty: "Easy", count: 124 },
  { difficulty: "Medium", count: 210 },
  { difficulty: "Hard", count: 66 },
];

export const topMeals = [
  {
    _id: "meal-1",
    name: "Spaghetti Carbonara",
    popularityScore: 98,
    kitProduct: { price: 85, stock: 42 },
  },
  {
    _id: "meal-2",
    name: "Chicken Shawarma",
    popularityScore: 92,
    kitProduct: { price: 75, stock: 27 },
  },
  {
    _id: "meal-3",
    name: "Beef Ramen",
    popularityScore: 89,
    kitProduct: { price: 95, stock: 18 },
  },
  {
    _id: "meal-4",
    name: "Kunafa",
    popularityScore: 88,
    kitProduct: { price: 60, stock: 50 },
  },
  {
    _id: "meal-5",
    name: "Mango Sticky Rice",
    popularityScore: 84,
    kitProduct: { price: 65, stock: 34 },
  },
];

export const mealCategoryData = [
  { category: "Italian", sales: 45000, items: 1250, growth: 12.5 },
  { category: "Middle Eastern", sales: 38000, items: 980, growth: 8.3 },
  { category: "Asian", sales: 22000, items: 650, growth: 15.2 },
  { category: "Desserts", sales: 18000, items: 420, growth: 6.7 },
];

export const monthlyRevenue = [
  { date: "2025-01-01", total: 8200 },
  { date: "2025-02-01", total: 9100 },
  { date: "2025-03-01", total: 9900 },
  { date: "2025-04-01", total: 10400 },
  { date: "2025-05-01", total: 11300 },
  { date: "2025-06-01", total: 12150 },
];

const chartConfig = {
  hard: {
    label: "Hard",
    color: "var(--primary)",
  },
  medium: {
    label: "Medium",
    color: "var(--chart-2)",
  },
  easy: {
    label: "Easy",
    color: "var(--chart-3)",
  },
};

const COLORS = ["var(--primary)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "#8884d8"];

export default function MainDashboard() {
  return (
    <div className="min-h-screen">
      <HeaderSection />
      <div className="mx-auto space-y-6 px-3 py-6 sm:space-y-8 sm:px-4 sm:py-8">
        <KPISection />
        <ChartsSection />
        <BottomSection />
        <CategoryTableSection />
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clothing Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your fashion retail performance across categories and trends
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 6 months
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Time Period</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Last month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                <DropdownMenuItem>Last 6 months</DropdownMenuItem>
                <DropdownMenuItem>Last year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// KPI Cards
type ResponseKpi = {
  totalUsers: number;
  totalProducts: number;
  totalMeals: number;
  totalRevenue: number;
};
function KPISection() {
  const { data, isLoading } = useGetData<APISuccess<ResponseKpi>>("/dashboard/stats");
  if (isLoading) {
    return <div className="text-muted-foreground text-center">Loading KPIs...</div>;
  }
  if (!data) {
    return <div className="text-center text-red-500">Failed to load KPIs</div>;
  }
  const { totalUsers, totalProducts, totalMeals, totalRevenue } = data.data;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currencyFormatter(totalRevenue)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
          <ShoppingBag className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMeals}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-muted-foreground mt-1 flex items-center text-xs">
            <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
            <span className="text-green-600">+15.3%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Charts
type ChartData = {
  easy: number;
  medium: number;
  hard: number;
};

type RevenueData = { date: string; total: number }[];
function ChartsSection() {
  const { data, isLoading } = useGetData<APISuccess<ChartData>>("/dashboard/meal-difficulty");
  const { data: revenue, isLoading: isLoadingRevenue } = useGetData<APISuccess<RevenueData>>("/dashboard/revenue");
  if (isLoading || isLoadingRevenue) {
    return <div className="text-muted-foreground text-center">Loading charts...</div>;
  }
  if (!data) {
    return <div className="text-center text-red-500">Failed to load chart data</div>;
  }

  const { easy, medium, hard } = data.data;
  const chartData = [
    { difficulty: "Easy", count: easy, name: chartConfig.easy.label, color: chartConfig.easy.color },
    { difficulty: "Medium", count: medium, name: chartConfig.medium.label, color: chartConfig.medium.color },
    { difficulty: "Hard", count: hard, name: chartConfig.hard.label, color: chartConfig.hard.color },
  ];
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Revenue over The last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart data={revenue?.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="var(--color-primary)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Popular Subcategories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Difficulty Distribution</CardTitle>
            <CardDescription className="text-sm">Distribution of meals by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius="70%" dataKey="count" label={false}>
                  {chartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [`${value} items `, name]}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Bottom row charts
function BottomSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Meal Difficulty Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Meal Difficulty Distribution</CardTitle>
          <CardDescription className="text-sm">Most common difficulty levels across all meals</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full">
            <BarChart data={difficultyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-primary)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Performing Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Top Performing Meals</CardTitle>
          <CardDescription className="text-sm">Based on revenue and order popularity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topMeals.map((meal, index) => (
              <div key={meal._id} className="flex items-center justify-between rounded-lg border p-2 sm:p-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium sm:h-8 sm:w-8 sm:text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium sm:text-base">{meal.name}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {currencyFormatter(meal.kitProduct.price)} per kit
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium sm:text-base">{meal.popularityScore} popularity</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{meal.kitProduct.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Category table
function CategoryTableSection() {
  return (
    <Card>
      {/* Meal Category Performance Table */}
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Meal Category Performance Summary</CardTitle>
        <CardDescription className="text-sm">
          Detailed breakdown of revenue and growth per meal category
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="overflow-x-auto">
          <div className="">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium sm:p-3">Category</th>
                  <th className="p-2 text-right font-medium sm:p-3">Revenue</th>
                  <th className="hidden p-2 text-right font-medium sm:table-cell sm:p-3">Meals</th>
                  <th className="p-2 text-right font-medium sm:p-3">Avg Kit Price</th>
                  <th className="p-2 text-right font-medium sm:p-3">Growth</th>
                </tr>
              </thead>
              <tbody>
                {mealCategoryData.map((category) => (
                  <tr key={category.category} className="hover:bg-muted/50 border-b">
                    <td className="p-2 font-medium sm:p-3">{category.category}</td>
                    <td className="p-2 text-right sm:p-3">{currencyFormatter(category.sales)}</td>
                    <td className="hidden p-2 text-right sm:table-cell sm:p-3">{category.items.toLocaleString()}</td>
                    <td className="p-2 text-right sm:p-3">{currencyFormatter(category.sales / category.items)}</td>
                    <td className="p-2 text-right sm:p-3">
                      <span
                        className={`flex items-center justify-end text-xs sm:text-sm ${category.growth > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {category.growth > 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {category.growth > 0 ? "+" : ""}
                        {category.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
