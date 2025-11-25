import { GoalList } from "@/components/goal/goal-list";

export default function Home() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Goals</h1>
        <p className="text-gray-500 text-lg">
          Browse previous Goal breakdowns or search for inspiration.
        </p>
      </div>

      <GoalList />
    </div>
  );
}
