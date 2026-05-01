# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Git for version control
- Cloud provider account (AWS, GCP, Azure, etc.)

## Local Deployment with Docker Compose

### 1. Build and Run

```bash
docker-compose up --build
```

This will:
- Build the backend and frontend images
- Start both services
- Backend available at: http://localhost:8000
- Frontend available at: http://localhost:3000

### 2. Check Logs

```bash
docker-compose logs -f
```

### 3. Stop Services

```bash
docker-compose down
```

## Production Deployment

### Option 1: AWS ECS

1. Push images to ECR
2. Create ECS cluster and task definitions
3. Deploy services

### Option 2: Google Cloud Run

1. Build images
2. Push to Container Registry
3. Deploy to Cloud Run

### Option 3: Azure Container Instances

1. Push images to ACR
2. Deploy to Azure Container Instances

### Option 4: Kubernetes

1. Create deployment manifests
2. Apply to Kubernetes cluster
3. Expose services

## Environment Configuration

### Backend Environment Variables

Create `.env` file in backend directory:

```
DEBUG=False
DATABASE_URL=postgresql://user:pass@db:5432/cardb
ALLOWED_ORIGINS=["https://yourdomain.com"]
```

### Frontend Environment Variables

Create `.env.production.local` file in frontend directory:

```
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

## Database Setup

### For Production

Replace SQLite with PostgreSQL:

```
DATABASE_URL=postgresql://user:password@postgres-host:5432/used_car_db
```

Add PostgreSQL service to docker-compose.yml

## Security Considerations

1. **Environment Variables**: Store sensitive data in environment variables
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS appropriately
4. **API Keys**: Never commit API keys to repository
5. **Database**: Use strong passwords and restrict access
6. **Secrets**: Use secret management services

## Monitoring and Logging

1. Configure logging in FastAPI
2. Set up monitoring dashboards
3. Use cloud provider logging services
4. Set up alerts for errors

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push images
        run: |
          docker build -t backend ./backend
          docker build -t frontend ./frontend
```

## Performance Optimization

1. **Caching**: Implement caching strategies
2. **CDN**: Use CDN for static assets
3. **Database Optimization**: Index frequently queried columns
4. **Load Balancing**: Use load balancers for scalability

## Backup and Recovery

1. Regular database backups
2. Version control for code
3. Disaster recovery plan
4. Testing backup restoration

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

### Database Connection Issues

Check DATABASE_URL configuration and network connectivity.

### CORS Errors

Verify ALLOWED_ORIGINS in backend configuration.

### Frontend Not Connecting to Backend

Check NEXT_PUBLIC_API_BASE_URL and ensure backend is running.
