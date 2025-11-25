import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Goal } from "@/types/goal.type";
import { ChevronRight, Target } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-red-500 text-white";
    if (score >= 5) return "bg-yellow-500 text-white";
    return "bg-green-500 text-white";
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-200 hover:shadow-md border-gray-200 rounded-2xl p-0 overflow-hidden group bg-white"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {goal.title}
            </CardTitle>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-default">
              Click to view steps
            </span>
          </div>

          <Badge
            className={`${getScoreColor(
              goal.complexity_score
            )} px-3 py-1 rounded-full font-medium text-xs`}
          >
            {goal.complexity_score}/10
          </Badge>
        </div>
      </div>
    </Card>
  );
}
