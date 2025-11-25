import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Goal } from "@/types/goal.type";
import { Target, CheckCircle2 } from "lucide-react";

interface GoalDetailDialogProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GoalDetailDialog({
  goal,
  isOpen,
  onClose,
}: GoalDetailDialogProps) {
  if (!goal) return null;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-red-500 text-white";
    if (score >= 5) return "bg-yellow-500 text-white";
    return "bg-green-500 text-white";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-0 border-0 bg-white">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {goal.title}
                </DialogTitle>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* Complexity Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Complexity
            </span>
            <Badge
              className={`${getScoreColor(
                goal.complexity_score
              )} px-3 py-1 rounded-full font-medium`}
            >
              {goal.complexity_score}/10
            </Badge>
          </div>

          {/* Action Plan */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Action Steps
            </h3>
            <div className="space-y-3">
              {goal.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-medium mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed flex-1">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
