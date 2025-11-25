"use client";

import { useState } from "react";
import { useCreateGoal } from "@/lib/hooks/useGoals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Send, Target } from "lucide-react";
import { Goal } from "@/types/goal.type";

export function GoalGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Goal | null>(null);

  const { mutate, isPending } = useCreateGoal();

  const handleGenerate = () => {
    if (!input.trim()) return;
    setResult(null);

    mutate(
      { goal_text: input },
      {
        onSuccess: (data) => {
          setResult(data);
          toast.success("Goal broken down successfully!");
        },
        onError: () => {
          toast.error("Failed to generate steps");
        },
      }
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Break Your Goal
          </h2>
          <p className="text-gray-500">
            Enter any goal and we&apos;ll break it down into achievable steps
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Learn web development, Start a business, Run a marathon..."
            className="h-12 text-base border-gray-300 focus:border-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
          <Button
            onClick={handleGenerate}
            disabled={isPending || !input.trim()}
            className="h-12 px-6 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="text-center py-8 space-y-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-500 text-sm">
            AI is breaking down your goal...
          </p>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Your Action Plan
            </h3>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Complexity: {result.complexity_score}/10
            </div>
          </div>

          <Card className="border-0 bg-gray-50">
            <CardContent className="p-6">
              <div className="space-y-3">
                {result.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-medium mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed flex-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setInput("");
                setResult(null);
              }}
              className="rounded-full border-gray-300 hover:bg-gray-50"
            >
              Create Another Goal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
