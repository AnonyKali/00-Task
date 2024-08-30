# 00-Task: RESTful API for To-Do List Application

## Getting Started
### 1. Cloning the Repository
First, clone the repository to your local machine:

```bash
git clone <repository-url>
```

### 2. Navigate to Project Directory
Change to the project directory:
```bash
cd 00-Task/
```

### 3. Install Dependencies
Install the necessary dependencies:
```bash
npm install
```

### 4. Running Locally
To run the application locally, use:
```bash
node src/app.js
```
By default, the application will start on port 4004. You can change the port by modifying the .env file or by setting the PORT environment variable.

### 5. Running with Docker
To run the application using Docker:
#### First Build The Image
```bash
docker build -t todo-api .
```
#### Then Run Docker Container
```bash
docker run -p 4004:4004 todo-api
```
