// lib/hooks/useGoals.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal, fetchGoals } from "../../features/api/goal";
import { GoalInput } from "../../types/goal.type";

// HOOK: Get Goals
export const useGoals = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["goals", page, search],
    queryFn: () => fetchGoals(page, limit, search),
    placeholderData: (previousData) => previousData,
  });
};

// HOOK: Create Goal
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalInput) => createGoal(data),
    onSuccess: () => {
      // Refresh the list immediately after success
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
