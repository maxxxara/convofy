import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import {
  Building2,
  Save,
  CreditCard,
  Trash2,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export function ProjectSettings() {
  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Project Settings</h1>
        <p className="text-muted-foreground">
          Configure your project settings, integrations, and preferences
        </p>
      </div>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" defaultValue="TechCorp Support" />
            </div>
          </div>

          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Usage & Limits Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Usage & Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Members Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Team Members</h4>
                  <p className="text-sm text-muted-foreground">
                    Current plan allows up to 10 members
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">5/10</p>
                  <Badge variant="secondary" className="text-xs">
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-sm text-muted-foreground">
                5 more members available
              </p>
            </div>

            {/* Documents Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Knowledge base documents limit
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">127/500</p>
                  <Badge variant="secondary" className="text-xs">
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={25.4} className="h-2" />
              <p className="text-sm text-muted-foreground">
                373 more documents available
              </p>
            </div>

            {/* FAQ Questions Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">FAQ Questions</h4>
                  <p className="text-sm text-muted-foreground">
                    Frequently asked questions limit
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">89/200</p>
                  <Badge variant="secondary" className="text-xs">
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={44.5} className="h-2" />
              <p className="text-sm text-muted-foreground">
                111 more FAQ questions available
              </p>
            </div>

            {/* Monthly Interactions Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Monthly Interactions</h4>
                  <p className="text-sm text-muted-foreground">
                    Live chat interactions this month
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">8,450/10,000</p>
                  <Badge variant="outline" className="text-xs">
                    Warning
                  </Badge>
                </div>
              </div>
              <Progress value={84.5} className="h-2" />
              <p className="text-sm text-muted-foreground">
                1,550 interactions remaining this month
              </p>
            </div>

            {/* Storage Usage */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Storage Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Total file storage used
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">2.3/5.0 GB</p>
                  <Badge variant="secondary" className="text-xs">
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={46} className="h-2" />
              <p className="text-sm text-muted-foreground">
                2.7 GB storage remaining
              </p>
            </div>

            {/* API Calls Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">API Calls</h4>
                  <p className="text-sm text-muted-foreground">
                    Monthly API requests limit
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">24,750/50,000</p>
                  <Badge variant="secondary" className="text-xs">
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={49.5} className="h-2" />
              <p className="text-sm text-muted-foreground">
                25,250 API calls remaining this month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h4 className="font-medium text-destructive mb-2">
              Delete Project
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete this project and all associated data. This
              action cannot be undone.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">This will delete:</p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• All chatbots and their configurations</li>
                <li>• All knowledge sources and uploaded documents</li>
                <li>• All chat history and conversations</li>
                <li>• All team member access</li>
                <li>• All analytics and reports</li>
              </ul>
            </div>
            <Button variant="destructive" className="mt-4">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
