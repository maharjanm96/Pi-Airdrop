"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SeedPhraseSchema, seedPhraseSchema } from "@/schemas/seedPhraseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SuccessDialog from "./success-dialog";

export function AirdropClaimDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SeedPhraseSchema>({
    resolver: zodResolver(seedPhraseSchema),
  });

  // TanStack Query mutation
  const seedPhraseMutation = useMutation({
    mutationFn: async (data: SeedPhraseSchema) => {
      const response = await axios.post("/api/seedphrase", {
        seedPhrase: data.seedPhrase,
      });
      return response.data;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Successfully claimed your airdrop!");

      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        form.reset();
      }, 3000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          toast.error(
            error.response.data.message || "You have already participated"
          );
        } else if (error.response?.data?.errors?.seedPhrase?._errors) {
          const errorMessage = error.response.data.errors.seedPhrase._errors[0];
          form.setError("seedPhrase", {
            type: "manual",
            message: errorMessage,
          });
          toast.error(errorMessage);
        } else {
          toast.error(
            error.response?.data?.message || "Failed to process your request"
          );
        }
      } else {
        toast.error("Failed to connect to the server. Please try again.");
      }
    },
  });

  const onSubmit = (data: SeedPhraseSchema) => {
    seedPhraseMutation.mutate(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          setIsSuccess(false);
        }
      }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-amber-600 hover:bg-amber-500 w-full cursor-pointer text-white px-6 py-5 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        CLAIM 314 PI NETWORK COINS
      </Button>

      <DialogContent className="border border-purple-500/50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">Claim Your Airdrop</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your Pi Network seed phrase to claim your 314 π tokens
              airdrop.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <SuccessDialog />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6"
              >
                <FormField
                  control={form.control}
                  name="seedPhrase"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="seedPhrase">Pi Wallet Seed Phrase</Label>
                      <FormControl>
                        <Textarea
                          id="seedPhrase"
                          placeholder="Enter your Pi wallet 24-word seed phrase..."
                          className="text-muted-foreground resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground font-mono">
                        Your seed phrase should contain exactly 24 lowercase
                        words separated by spaces.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-800 to-purple-900 cursor-pointer text-white py-5"
                  disabled={seedPhraseMutation.isPending}
                >
                  {seedPhraseMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Claim Airdrop"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground mt-1">
                  Notice: The transaction may take some time to process.
                </p>
              </form>
            </Form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
