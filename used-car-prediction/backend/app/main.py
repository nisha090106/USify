from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import predict, analytics, history

app = FastAPI(
    title="Used Car Price Prediction API",
    description="API for predicting used car prices",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predict.router, prefix="/api/predict", tags=["prediction"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(history.router, prefix="/api/history", tags=["history"])

@app.get("/")
async def root():
    return {"message": "Used Car Price Prediction API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
