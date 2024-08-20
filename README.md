# DALVacationHome

The DALVacationHome project was developed as part of a collaborative effort by a team of four. The purpose of the project was to create a cloud-based platform that manages vacation home rentals. The application focuses on providing a seamless experience for customers and property managers, integrating multiple cloud services to handle everything from user management to data processing.

Live Project URL: [DALVacationHome](https://dalvacationservice-w6miucx2da-uc.a.run.app/)

## Overview

The DALVacationHome project is designed to simplify the management of vacation home rentals by leveraging serverless technologies. The application enables customers to book vacation homes, manage reservations, and communicate concerns, while property managers can efficiently handle bookings, address customer issues, and manage properties.

This project was developed using a combination of AWS and Google Cloud Platform services, focusing on scalability, security, and ease of use. The development process was divided into several sprints, each focusing on different aspects of the application, including backend services, frontend integration, data processing, and messaging systems.

## Modules

### 1. **User Management Module**
   - **Description:** Manages user registration, authentication, and profile management. 
   - **Technologies Used:** AWS Cognito, Amazon DynamoDB,AWS Lambda
   - **Key Features:** Secure user authentication, JWT-based authorization, and user role management.

### 2. **Message Passing Module**
   - **Description:** Facilitates communication between customers and property managers.
   - **Technologies Used:** GCP Pub/Sub, AWS Lambda, DynamoDB, API Gateway
   - **Key Features:** Asynchronous messaging, real-time notifications, and message history storage.

### 3. **Data Analysis and Reporting Module**
   - **Description:** Provides insights into user behavior, booking trends, and property performance.
   - **Technologies Used:** Google Natural Language API, AWS Lambda, Looker Studio, Google Apps Script
   - **Key Features:** Customizable reports, data visualization, and predictive analytics.

### 4. **Notification and Alerting Module**
   - **Description:** Sends alerts and notifications to users about booking updates, property availability, and promotional offers.
   - **Technologies Used:** AWS SNS, AWS SQS
   - **Key Features:** Email and SMS notifications, push notifications, and alert management.

### 5. **Virtual Assistant Module**
   - **Description:** Implements a virtual assistant to help users with booking inquiries and common questions.
   - **Technologies Used:** AWS Lex, AWS Lambda, DynamoDB
   - **Key Features:** Natural language processing, AI-driven responses, and integration with messaging systems.

### 6. **Web Application Building and Deployment Module**
   - **Description**: Developed and deployed the web application using React, Tailwind CSS, Docker, and Google Cloud services for a robust and scalable solution.
   - **Technologies Used:** React.js, Tailwind CSS, Vite, Docker, Google Cloud Run, Google Cloud Build, Google Artifact Registry
   - **Key Features**: React frontend, Tailwind CSS styling, Docker containerization, Cloud Run deployment, and Cloud Build CI/CD automation.

### Conclusion

The DALVacationHome project has been an enriching journey, pushing the boundaries of serverless computing, data processing, and cloud-native applications. Collaborating with three other teammates, we successfully built a comprehensive and scalable vacation home management platform that leverages cutting-edge technologies and services. The project modules, ranging from user management to real-time notifications and web application deployment, demonstrate the power of cloud services in creating robust and efficient solutions.

Each module played a crucial role in ensuring the platform's functionality, scalability, and user experience. The seamless integration of Google Cloud and AWS services has enabled us to build a highly responsive and scalable system capable of handling complex data flows and user interactions. The continuous deployment pipeline ensures that our application remains up-to-date with the latest features and fixes, providing a reliable service to end-users.
