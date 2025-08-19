import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  MessageSquare,
  Clock,
  ThumbsUp,
  Bot,
  Globe,
  Users,
} from "lucide-react";

type TimePoint = { day: string; conversations: number; resolved: number };

export function Analytics() {
  const [range, setRange] = useState("30d");

  // Mock data
  const series: TimePoint[] = useMemo(
    () => [
      { day: "Apr 01", conversations: 120, resolved: 86 },
      { day: "Apr 05", conversations: 180, resolved: 130 },
      { day: "Apr 10", conversations: 240, resolved: 170 },
      { day: "Apr 15", conversations: 210, resolved: 160 },
      { day: "Apr 20", conversations: 320, resolved: 250 },
      { day: "Apr 25", conversations: 380, resolved: 290 },
      { day: "Apr 30", conversations: 420, resolved: 310 },
    ],
    []
  );

  const channels = [
    { name: "Website", conversations: 720 },
    { name: "Telegram", conversations: 410 },
    { name: "Slack", conversations: 230 },
    { name: "WhatsApp", conversations: 160 },
  ];

  const resolution = [
    { name: "Resolved", value: 72, color: "#22c55e" },
    { name: "Escalated", value: 18, color: "#f59e0b" },
    { name: "Unresolved", value: 10, color: "#ef4444" },
  ];

  const topBots = [
    {
      name: "Customer Support Bot",
      conversations: 1243,
      csat: 4.6,
      channel: "Website",
      status: "active",
    },
    {
      name: "Event Assistant",
      conversations: 567,
      csat: 4.3,
      channel: "Telegram",
      status: "active",
    },
    {
      name: "Sales Inquiry Bot",
      conversations: 892,
      csat: 4.5,
      channel: "Website",
      status: "active",
    },
    {
      name: "Product FAQ Bot",
      conversations: 304,
      csat: 4.1,
      channel: "Slack",
      status: "draft",
    },
  ];

  const stats = [
    {
      title: "Conversations",
      value: "3,412",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Resolution Rate",
      value: "72%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      title: "Avg Response",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "CSAT",
      value: "4.5/5",
      change: "+0.2",
      icon: ThumbsUp,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      <PageHeader
        title="Analytics & Insights"
        description="Monitor performance and gain insights from your chatbot interactions"
      />

      {/* Range Tabs */}
      <Tabs value={range} onValueChange={setRange} className="mb-6">
        <TabsList>
          <TabsTrigger value="7d">Last 7 days</TabsTrigger>
          <TabsTrigger value="30d">Last 30 days</TabsTrigger>
          <TabsTrigger value="90d">Last 90 days</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <CardContent className="px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.title}</p>
                    <h3 className="mt-1">{s.value}</h3>
                    <Badge variant="secondary" className="text-xs mt-2">
                      {s.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations Over Time */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversations Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  conversations: { label: "Conversations", color: "#2563eb" },
                  resolved: { label: "Resolved", color: "#10b981" },
                }}
              >
                <LineChart data={series} margin={{ left: 8, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis width={32} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="var(--color-conversations)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="var(--color-resolved)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Channel Distribution */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Channel Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  conversations: { label: "Conversations", color: "#2563eb" },
                }}
                className="aspect-[4/3]"
              >
                <BarChart data={channels}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis width={32} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="conversations"
                    fill="var(--color-conversations)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Top Bots */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-4 h-4" /> Top Bots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bot</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Conversations</TableHead>
                    <TableHead>CSAT</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topBots.map((b, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell>{b.channel}</TableCell>
                      <TableCell>{b.conversations.toLocaleString()}</TableCell>
                      <TableCell>{b.csat.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            b.status === "active" ? "default" : "secondary"
                          }
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Resolution Breakdown */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Resolution Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="aspect-[4/3]">
                <PieChart>
                  <Pie
                    data={resolution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {resolution.map((r, i) => (
                      <Cell key={i} fill={r.color} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
