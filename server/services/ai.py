import google.generativeai as genai
from core.config import settings
import json

class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-2.5-flash")

    async def generate_goal_steps(self, goal_text: str):
        prompt = f"""
        Act as a productivity expert.
        Goal: "{goal_text}"

        1. Break this into 5 actionable, specific steps.
        2. Estimate complexity (1-10).
        3. Return strictly valid JSON. No markdown formatting.

        Format:
        {{
            "complexity_score": 5,
            "steps": ["step 1", "step 2", "step 3", "step 4", "step 5"]
        }}
        """,

        try:
            response = self.model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"AI Error: {e}")
            return None
