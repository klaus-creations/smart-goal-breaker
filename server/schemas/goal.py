from pydantic import BaseModel
from typing import List

class GoalCreate(BaseModel):
    goal_text: str

class GoalResponse(BaseModel):
    id: int
    title: str
    complexity_score: int
    steps: List[str]

    class Config:
        from_attributes = True

class PaginatedGoalResponse(BaseModel):
    total: int
    page: int
    page_size: int
    results: List[GoalResponse]