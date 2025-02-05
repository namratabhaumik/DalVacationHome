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

## System Architecture
<p align="center"><img src="https://github.com/user-attachments/assets/35369233-3af4-4616-9fe2-f4b6ef6e21b4" alt><br><em>System Architecture</em></p>

## Screenshots
<p align="center"><img src="https://github.com/user-attachments/assets/bd18d510-0a71-404e-a2c8-b354c01514cb"><br><em>1st Factor Authentication setup</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/00c7c4c0-80cb-4e59-837f-36a7d259ea28" alt><br><em>Subscription email is sent to the user EmailID</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/bdbf0c8d-c594-4b14-9752-8a6b144fa956" alt><br><em>Subscription email</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/1b47c035-1916-48f4-b5e6-17cf7e1f296f" alt><br><em>2nd Factor Authentication setup</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/3311eac9-03e6-483a-86c2-2ef9b2d7dd3d" alt><br><em>Email upon successful SignUp</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/d9c4fc74-6d1a-44f4-8586-d4d3f4807846" alt><br><em>Email upon successful SignIn</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/0b3606d6-ac21-44ee-a194-8a7f4927522b" alt><br><em>Homepage for Guest user</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/53a3e2a7-53c9-4210-b654-bf4679f92c14" alt><br><em>Property Details page for Guest user</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/b8d98cdd-78bd-4b70-8e94-5185518f507d" alt><br><em>Home page for Regular users</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/c6f61467-a846-4eb0-bfbf-e7c438b35648" alt><br><em>Property Details page for Regular users</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/bbfd3703-a6e6-4e0a-9be7-4f77c330ef8e" alt><br><em>Create Reservation Modal</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/761f0453-0d75-478d-ad15-5a58464501ec" alt><br><em>Create Reservation Modal</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/531c06c6-37ae-4e7c-8a95-0c24cda61923" alt><br><em>Email for Booking Confirmation</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/4a134ba7-c996-4a16-9dda-32e0c7acaea9" alt><br><em>Property Details page after successful booking</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/3825e926-250a-4600-af7d-004b779fc174" alt><br><em>Homepage for Property Owners</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/2a55dd61-700c-4457-8155-b4a32038f786" alt><br><em>Add room Modal</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/4e01d6fb-e2ee-4754-8c4c-59812d60c6a8" alt><br><em>Property Details page for Property Owners</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/342197d7-256c-4e37-ac4f-94bf7461561f" alt><br><em>Update room Modal</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/e055fee9-1161-429e-b7e8-34d896843d8d" alt><br><em>AWS Lex - GreetingsIntent</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/b5bacc3b-2da5-4b30-a04c-08ef1dcdd728" alt><br><em>AWS Lex - RegistrationIntent</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/ca70b042-4a7a-405d-85f7-18be9d3f8814" alt><br><em>AWS Lex - LoginIntent</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/970b52b4-4d0e-48b2-8c3f-3b5c218495d9" alt><br><em>AWS Lex - BookingIntent (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/7eaa6bc5-8949-4327-9461-aca7a2e70c58" alt><br><em>AWS Lex - BookingIntent (2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/2b650605-a411-4b5b-af2c-43bd85c8ea50" alt><br><em>AWS Lex - BookingIntent (3)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/e19dd137-5e90-4c71-8c95-aec0aa80b47f" alt><br><em>AWS Lex - CustomerConcerns</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/a79bd68c-a751-4fa4-97a7-009a65d1a1ed" alt><br><em>AWS Lex - CloudWatch Logs (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/3c428547-97d3-40e7-ab4e-c437a62377b6" alt><br><em>AWS Lex - CloudWatch Logs (2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/120d85fd-b38d-4fd9-a61b-f21862bd8e05" alt><br><em>Customer concern posted on AWS Lex (Part 1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/379175f1-abe6-4b06-b3dd-2980aebdee9d" alt><br><em>Customer concern posted on AWS Lex (Part 2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/c14e367a-a69e-4008-990c-6e74a5f6ab08" alt><br><em>Frontend of Lex (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/1162e39d-a362-4eff-b573-16cc01a3b1bf" alt><br><em>Frontend of Lex (2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/fa5882ad-0674-424e-bfda-69d02acbca8a" alt><br><em>Frontend of Lex (3)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/8da13bdd-4c27-46c7-af23-28941c9d4374" alt><br><em>Message successfully published under the Pub/Sub topic</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/8f8db10a-f4db-4805-87bb-ec779bd275b3" alt><br><em>Cloud function triggered after message publishing in Pub/Sub which forwards it to AWS Lambda</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/31f82af9-df95-4069-82e6-9d815a42b06b" alt><br><em>Dynamo table to hold all customer concerns passed as pub/sub messages</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/248cb8ec-a588-4228-af0c-aee9293f16c4" alt><br><em>CloudWatch logs on trigger of AWS lambda function to store data in DynamoDB</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/a51bc9c2-b898-4d2e-a81a-4df9d072639d" alt><br><em>API Gateway to invoke Lambda to fetch details from DynamoDB</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/7a5751e1-15fa-4212-b326-df5ae2062839" alt><br><em>Cloudwatch metrics of lambda to fetch from DynamoDB</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/b06d0e40-f348-47c1-ac49-ee385ad1f1ad" alt><br><em>Customer Concerns visible to only Admins from frontend</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/fcf9926a-4c62-4bc8-82fa-92545dcade00" alt><br><em>Customer concern provided via Lex interface</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/f03e4031-821c-4ec3-88c8-9db70a0684f6" alt><br><em>Feedback button on the Property details page</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/fde93b8a-adc8-4635-8dcf-83f7f1913767" alt><br><em>Add Feedback Modal</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/5e95a69c-21d1-4928-84c5-534d99864ce4" alt><br><em>Feedbacks are displayed with Sentiment</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/92f00640-2ebd-466f-b5e7-cb8b7ca38f50" alt><br><em>Dashboard (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/67a97f5e-41b4-439c-86c9-5e46b5920cfa" alt><br><em>Dashboard (2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/4ac30cd3-6f6b-4b87-931d-aea034d7578d" alt><br><em>Cloud build trigger</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/c5ec2f72-f51b-4336-b40f-0a9d7c6e2045" alt><br><em>Build in progress</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/77b05876-b4f6-4458-9b25-b9bbc6955ba4" alt><br><em>Build Successful (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/59d6ea96-484a-47d2-93b0-fcbbd8fa24e9" alt><br><em>Build Successful (2)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/61598ca2-1d11-44d4-96d7-c82804cd4e04" alt><br><em>Artifact registry for storing docker images</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/c7da2203-38c8-4429-a08b-33e3d11d9b52" alt><br><em>Docker Images</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/6ae61a66-d4ff-4e52-9b41-a72142304e29" alt><br><em>Application Deployment on Cloud run (1)</em></p>
<p align="center"><img src="https://github.com/user-attachments/assets/20125b14-5d25-4403-a55b-0622cddab511" alt><br><em>Application Deployment on Cloud run (2)</em></p>

### Conclusion

The DALVacationHome project has been an enriching journey, pushing the boundaries of serverless computing, data processing, and cloud-native applications. Collaborating with three other teammates, we successfully built a comprehensive and scalable vacation home management platform that leverages cutting-edge technologies and services. The project modules, ranging from user management to real-time notifications and web application deployment, demonstrate the power of cloud services in creating robust and efficient solutions.

Each module played a crucial role in ensuring the platform's functionality, scalability, and user experience. The seamless integration of Google Cloud and AWS services has enabled us to build a highly responsive and scalable system capable of handling complex data flows and user interactions. The continuous deployment pipeline ensures that our application remains up-to-date with the latest features and fixes, providing a reliable service to end-users.
