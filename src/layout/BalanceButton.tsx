"use client";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Wallet, MessageSquareText } from "lucide-react";

const BalanceButton = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Balance Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <Wallet className="w-4 h-4 text-green-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              GH¢100.00
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Account Balance</p>
        </TooltipContent>
      </Tooltip>

      {/* SMS Balance Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <MessageSquareText className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              500
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>SMS Credits</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BalanceButton;