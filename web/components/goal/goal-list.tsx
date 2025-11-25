"use client";

import { useState } from "react";
import { useGoals } from "@/lib/hooks/useGoals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { GoalCard } from "./goal-card";
import { GoalDetailDialog } from "./show-goal-detail";
import { Goal } from "@/types/goal.type";

export function GoalList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const LIMIT = 10;

  const { data, isLoading, isFetching } = useGoals(page, LIMIT, search);

  return (
    <div className="space-y-6 w-full">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search goals..."
          className="pl-10 h-12 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        {isFetching && !isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          </div>
        )}
      </div>

      {/* Goals List - Single Column */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-6 space-y-4 bg-white"
            >
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
          ))
        ) : data?.results.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200">
            <div className="text-lg font-medium mb-2">No goals found</div>
            <div className="text-sm">Try creating your first goal!</div>
          </div>
        ) : (
          data?.results.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={() => setSelectedGoal(goal)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {data && data.total > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full px-4 border-gray-300 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-gray-600 font-medium">
            Page {data.page} of {Math.ceil(data.total / data.page_size)}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page * data.page_size >= data.total}
            className="rounded-full px-4 border-gray-300 hover:bg-gray-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Goal Detail Dialog */}
      <GoalDetailDialog
        goal={selectedGoal}
        isOpen={!!selectedGoal}
        onClose={() => setSelectedGoal(null)}
      />
    </div>
  );
}
