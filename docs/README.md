# DALVacationHome - Flow Documentation

This directory contains comprehensive flow diagrams and architectural documentation for the DALVacationHome project.

## Documentation Index

### 1. **[System Architecture Overview](./01-system-architecture.md)**
   - High-level system design
   - Service interactions
   - Technology stack breakdown
   - AWS vs GCP service usage

### 2. **[Authentication & User Management Flow](./02-authentication-flow.md)**
   - User signup process
   - Email verification
   - 2FA setup and verification
   - Sign-in flow
   - JWT token management

### 3. **[Booking & Reservation Flow](./03-booking-flow.md)**
   - Property browsing
   - Availability checking
   - Reservation creation
   - Booking confirmation
   - DynamoDB interactions

### 4. **[Messaging System Flow](./04-messaging-flow.md)**
   - Customer → Property Manager messaging
   - GCP Pub/Sub integration
   - AWS Lambda message processing
   - DynamoDB message storage
   - Real-time notification system

### 5. **[Virtual Assistant (AWS Lex) Flow](./05-virtual-assistant-flow.md)**
   - Customer intent recognition
   - Lex intents: Greetings, Registration, Login, Booking, Support
   - Lambda fulfillment
   - CloudWatch logging

### 6. **[Feedback & Sentiment Analysis Flow](./06-feedback-analytics-flow.md)**
   - Feedback submission
   - Google Natural Language API integration
   - Sentiment analysis processing
   - Feedback storage and retrieval
   - Dashboard visualization with Looker Studio

### 7. **[Deployment Pipeline](./07-deployment-pipeline.md)**
   - Code repository structure
   - Docker containerization
   - Google Cloud Build CI/CD
   - Container Registry (Artifact Registry)
   - Cloud Run deployment

### 8. **[Data Flow Architecture](./08-data-flow-architecture.md)**
   - End-to-end data movement
   - Service communication patterns
   - Async messaging workflows
   - Database operations
   - Event-driven architecture

## Quick Reference

### Key Services by Function

| Service | Purpose |
|---------|---------|
| **AWS Cognito** | User authentication & management |
| **AWS Lambda** | Serverless function execution |
| **AWS DynamoDB** | NoSQL database for all data |
| **AWS SNS/SQS** | Notification and message queues |
| **AWS Lex** | Conversational AI assistant |
| **API Gateway** | REST API endpoint |
| **GCP Pub/Sub** | Async message broker |
| **GCP Cloud Functions** | Event-driven functions |
| **GCP Cloud Run** | Containerized app deployment |
| **Google NLP API** | Sentiment analysis |
| **Looker Studio** | Data visualization & analytics |

### Key AWS Lambda Functions

- `createRoom.zip` - Create new properties
- `createReservation.zip` - Handle booking requests
- `createFeedback.zip` - Store feedback
- `postSignUpConfirmation.zip` - Post-signup workflows
- `postSignInSNS.zip` - Post-signin notifications
- `pub_sub_to_dynamodb.zip` - Message processing

### Frontend Components

- React 18 with Vite
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- Shadcn UI components

