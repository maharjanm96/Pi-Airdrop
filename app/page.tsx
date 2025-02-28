"use client";

import { AirdropClaimDialog } from "@/components/airdrop-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-950">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="relative h-16 w-30 md:w-50 ">
          <Link href="/">
            <Image
              src="/full-pi.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-white">
            <li>
              <Link href="/" className="hover:text-amber-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-300 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-white">Pi Network </span>
                <span className="text-amber-500">First</span>
                <br />
                <span className="text-white">Airdrop</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-300 text-lg text-justify">
                The official Pi Network has reached 2 million pioneers! To get
                closer to the mainnet and activate and attract more pioneers,
                they will be holding an airdrop, awarding a total of 314
                π/pioneer prizes to those who successfully complete KYC.
              </p>
              <p className="text-gray-300 text-lg mt-4 text-justify">
                The future looks very exciting as the Pi community continues to
                build the Web3 Pi ecosystem full of amazing apps and utilities
                on top of the Pi browser. Let&apos;s get the job done right and
                do everything we can to support this exciting development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            ></motion.div>
          </div>

          {/* Right Column - Illustration/Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-500/20">
              <CardContent className="p-8">
                <div className="relative w-full h-64 mb-6">
                  <Image
                    src="/full-pi.png"
                    alt="Pi Network Illustration"
                    fill
                    className="object-contain rounded-4xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Claim Your Pi Tokens
                </h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </div>
                    <span>Complete KYC verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </div>
                    <span>Connect your Pi wallet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </div>
                    <span>Receive 314 π tokens</span>
                  </li>
                </ul>
                <div className="mt-6">
                  {/* <Button className="w-full bg-amber-600 hover:bg-amber-500 cursor-pointer text-white">
                    CLAIM 314 PI NETWORK COINS
                  </Button> */}
                  <AirdropClaimDialog />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-purple-800 mt-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            © 2025 Pi Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
