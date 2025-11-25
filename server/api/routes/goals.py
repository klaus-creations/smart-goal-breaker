from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db.session import get_db
from models.goal import Goal
from schemas.goal import GoalCreate, GoalResponse, PaginatedGoalResponse
from services.ai import AIService

from typing import List, Optional

router = APIRouter()
ai_service = AIService()

@router.post("/", response_model=GoalResponse)
async def create_goal(request: GoalCreate, db: Session = Depends(get_db)):
    ai_data = await ai_service.generate_goal_steps(request.goal_text)
    
    if not ai_data:
        raise HTTPException(
            status_code=500, 
            detail="Failed to generate steps from AI. Please try again."
        )
    
    new_goal = Goal(
        title=request.goal_text,
        complexity_score=ai_data.get("complexity_score"),
        steps=ai_data.get("steps")
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    
    return new_goal

@router.get("/", response_model=PaginatedGoalResponse)
def get_goals(
    skip: int = 0, 
    limit: int = 10, 
    search: Optional[str] = Query(None, description="Search goals by title"),
    db: Session = Depends(get_db)
):
    query = db.query(Goal)
    
    if search:
        query = query.filter(Goal.title.ilike(f"%{search}%"))
    
    total_goals = query.count()
    
    goals = query.order_by(Goal.id.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total_goals,
        "page": (skip // limit) + 1,
        "page_size": limit,
        "results": goals
    }