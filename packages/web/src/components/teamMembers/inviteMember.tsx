import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Shield, User, Mail, Crown } from "lucide-react";

function InviteMember({
  isInviteDialogOpen,
  setIsInviteDialogOpen,
}: {
  isInviteDialogOpen: boolean;
  setIsInviteDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <UserPlus className="w-4 h-4 text-indigo-600" />
            </div>
            Invite Team Member
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteEmail" className="text-slate-700 font-medium">
              Email Address
            </Label>
            <Input
              id="inviteEmail"
              type="email"
              placeholder="colleague@company.com"
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inviteRole" className="text-slate-700 font-medium">
              Role
            </Label>
            <Select defaultValue="member">
              <SelectTrigger className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Member
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md">
              <Shield className="w-4 h-4 mt-0.5 text-indigo-500 flex-shrink-0" />
              <p>
                Members can create and manage bots. Admins can also invite
                members and delete bots.
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(false)}
              className="border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteMember;
