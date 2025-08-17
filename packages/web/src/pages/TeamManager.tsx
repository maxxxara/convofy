import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Users,
  Search,
  Mail,
  Crown,
  User,
  MoreVertical,
  UserPlus,
  UserMinus,
  Settings,
  Clock,
  X,
  Shield,
  Activity,
  UserCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import InviteMember from "../components/teamMembers/inviteMember";
import UserAvatar from "@/components/utils/UserAvatar";
import { PageHeader } from "@/components/shared/PageHeader";

export function TeamManager() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  return (
    <>
      <InviteMember
        isInviteDialogOpen={isInviteDialogOpen}
        setIsInviteDialogOpen={setIsInviteDialogOpen}
      />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-indigo-50/30 min-h-screen">
        <div className="p-6">
          <PageHeader
            title="Team Management"
            description="Manage team members and their project access"
            actions={
              <Button
                onClick={() => setIsInviteDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            }
          />

          {/* Team Members Wrapper */}
          <Card className="border-slate-100 bg-gradient-to-br from-slate-50/50 to-white shadow-sm py-0 gap-0">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-xl hover:shadow-md hover:bg-white/80 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <UserAvatar initials="JD" />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-slate-900">
                            John Doe
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            Member
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          johndoe@example.com
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Mail className="w-4 h-4 mr-2" />
                          Resend Invitation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
                          <UserMinus className="w-4 h-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
