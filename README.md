**Task Management Server**
This is the backend server for the Task Management application, featuring task tracking, user management, WebSocket notifications, and Kafka event streaming.

**Prerequisites**
Node.js (16 or later)
Docker and Docker Compose
Git

**Setup Instructions**
1. Clone the repository:
git clone <repository-url>
cd <repository-name>

2. Create a .env file by copying .env.example:
cp .env.example .env

**Running the Server**
**Without Docker**
npm install

npm run start:dev

**Docker**

1. Build and start the Docker containers:
docker-compose up --build

2. Verify the running containers:
docker ps

**Access the Server**

Backend: http://localhost:5000
WebSocket: ws://localhost:8080


