from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import goals
from db.session import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Goal Breaker API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goals.router, prefix="/api/v1/goals", tags=["goals"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "System is running 🚀"}