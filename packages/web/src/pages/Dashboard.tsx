import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Bot,
  MessageSquare,
  Users,
  Database,
  TrendingUp,
  Clock,
  Globe,
  Send,
  Plus,
  Activity,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Active Bots",
      value: "8",
      change: "+2",
      icon: Bot,
      color: "text-blue-600",
    },
    {
      title: "Total Conversations",
      value: "2,847",
      change: "+12%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Team Members",
      value: "5",
      change: "+1",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Knowledge Sources",
      value: "156",
      change: "+8",
      icon: Database,
      color: "text-orange-600",
    },
  ];

  const recentBots = [
    {
      name: "Customer Support Bot",
      status: "active",
      conversations: 1243,
      channel: "Website Widget",
      updated: "2 hours ago",
    },
    {
      name: "Event Assistant",
      status: "active",
      conversations: 567,
      channel: "Telegram",
      updated: "5 hours ago",
    },
    {
      name: "Product FAQ Bot",
      status: "draft",
      conversations: 0,
      channel: "Website Widget",
      updated: "1 day ago",
    },
    {
      name: "Sales Inquiry Bot",
      status: "active",
      conversations: 892,
      channel: "Website Widget",
      updated: "3 hours ago",
    },
  ];

  const quickActions = [
    {
      title: "Create New Bot",
      description: "Build a new chatbot for your business",
      icon: Bot,
    },
    {
      title: "Upload Documents",
      description: "Add knowledge sources to existing bots",
      icon: Database,
    },
    {
      title: "View Analytics",
      description: "Check performance and usage metrics",
      icon: TrendingUp,
    },
    {
      title: "Invite Team Member",
      description: "Add someone to your project",
      icon: Users,
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-8">
        <h1 className="mb-2">Project Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your RAG chatbot platform performance and activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="mt-1">{stat.value}</h3>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bots */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Bots
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Bot
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBots.map((bot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{bot.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge
                            variant={
                              bot.status === "active" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {bot.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {bot.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {bot.conversations} chats
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {bot.updated}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Usage Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Usage This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Conversations</span>
                  <span>2,847 / 5,000</span>
                </div>
                <Progress value={57} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Knowledge Sources</span>
                  <span>156 / 500</span>
                </div>
                <Progress value={31} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span>45.2K / 100K</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
