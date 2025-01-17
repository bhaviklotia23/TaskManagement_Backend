**Prerequisites**
Node.js (16 or later)
Docker and Docker Compose
Git

git clone <repository-url>
cd <repository-name>

Create a .env file using .env.example file

**Without Docker**
npm install

npm run start:dev

**Docker**

docker-compose up --build
docker ps

**Access the Server**

Backend: http://localhost:5000
WebSocket: ws://localhost:8080


