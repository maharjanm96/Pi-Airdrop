"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SeedPhrase } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import moment from "moment";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface SeedPhraseDialogProps {
  seedPhrase: SeedPhrase;
  trigger: React.ReactNode;
}

const StatusBadge = ({
  status,
  interactive = false,
  onClick,
}: {
  status: string;
  interactive?: boolean;
  onClick?: () => void;
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          className:
            "bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200",
        };
      case "CHECKED":
        return {
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          className:
            "bg-green-100 hover:bg-green-200 text-green-800 border-green-200",
        };
      case "DECLINED":
        return {
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
          className: "bg-red-100 hover:bg-red-200 text-red-800 border-red-200",
        };
      default:
        return {
          icon: null,
          className:
            "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={`${config.className} font-medium transition-all duration-200 ${
        interactive ? "cursor-pointer transform hover:scale-105" : ""
      }`}
      onClick={interactive ? onClick : undefined}
    >
      <span className="flex items-center">
        {config.icon}
        {status}
      </span>
    </Badge>
  );
};

const SeedPhraseDialog = ({ seedPhrase, trigger }: SeedPhraseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(seedPhrase.status);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const { data } = await axios.post(
        `/api/seedphrase/byid?id=${seedPhrase.id}`,
        {
          status: newStatus,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seedphrases"] });
      toast.success(`Seed phrase status updated to ${status}`, {
        style: {
          backgroundColor:
            status === "CHECKED"
              ? "#f0fdf4"
              : status === "DECLINED"
              ? "#fef2f2"
              : "#fffbeb",
          color:
            status === "CHECKED"
              ? "#166534"
              : status === "DECLINED"
              ? "#991b1b"
              : "#92400e",
          border: `1px solid ${
            status === "CHECKED"
              ? "#bbf7d0"
              : status === "DECLINED"
              ? "#fecaca"
              : "#fde68a"
          }`,
        },
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update seed phrase status: ${error}`, {
        style: {
          backgroundColor: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
        },
      });
    },
  });

  const handleUpdateStatus = () => {
    updateMutation.mutate(status);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-amber-200 shadow-amber-100/20 shadow-lg">
        <DialogHeader className="border-b border-amber-100 pb-4">
          <DialogTitle>Seed Phrase Details</DialogTitle>
          <DialogDescription>
            View and update seed phrase information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-1">
          <Label>Seed Phrase</Label>
          <div className="relative">
            <div className="rounded-md border border-amber-200 p-3 text-sm font-mono font-medium">
              {seedPhrase.seedPhrase}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-amber-200 p-3 text-sm bg-amber-50">
            <div className="space-y-2">
              <Label>Current Status</Label>
              <div className="h-10 flex items-center">
                <StatusBadge status={seedPhrase.status} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Update Status</Label>
              <Select
                value={status}
                onValueChange={(value: "PENDING" | "CHECKED" | "DECLINED") =>
                  setStatus(value)
                }
                disabled={updateMutation.isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CHECKED">CHECKED</SelectItem>
                  <SelectItem value="DECLINED">DECLINED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Created Date</Label>
            <div className="rounded-md border border-amber-200 p-3 text-sm bg-amber-50 text-amber-900">
              {moment(seedPhrase.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
            </div>
          </div>
        </div>
        <DialogFooter className="border-t border-amber-100 pt-4">
          <div className="flex w-full justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={updateMutation.isPending}
              className="border-amber-200 text-amber-800 hover:bg-amber-50 hover:text-amber-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={
                status === seedPhrase.status || updateMutation.isPending
              }
              className="bg-amber-500 text-white hover:bg-amber-700"
            >
              {updateMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeedPhraseDialog;
