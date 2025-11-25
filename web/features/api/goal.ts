// lib/api/goals.ts
import apiClient from "../axios";
import { GoalInput, Goal, PaginatedGoals } from "../../types/goal.type";

export const createGoal = async (data: GoalInput): Promise<Goal> => {
  const response = await apiClient.post<Goal>("/goals/", data);
  return response.data;
};

export const fetchGoals = async (
  page: number = 1,
  limit: number = 5,
  search: string = ""
): Promise<PaginatedGoals> => {
  const skip = (page - 1) * limit;

  const response = await apiClient.get<PaginatedGoals>("/goals/", {
    params: {
      skip,
      limit,
      search: search || undefined,
    },
  });
  return response.data;
};
