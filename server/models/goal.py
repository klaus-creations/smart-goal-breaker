from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from db.session import Base

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    complexity_score = Column(Integer)
    steps = Column(JSON) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
