![project vedio check it out : https://drive.google.com/file/d/1RzTCIv55wjY8NdWkEq11TMkeMCqirEyS/view?usp=sharing]

🚀 Setup Instructions

1️⃣ Clone Repository
```bash
# Clone the repo from GitHub
git clone https://github.com/Nithyalakshmi-M/Employee_management.git

# Go into project folder
cd employee-management

2️⃣ Backend Setup

# Move to backend folder
cd backend

# Install dependencies
npm install
Create a .env file inside backend/ with your database credentials:

# Database host
DB_HOST=localhost
# MySQL username
DB_USER=root
# MySQL password
DB_PASSWORD=yourpassword
# Database name
DB_NAME=employee_management
# Backend server port
PORT=5000
# Run the backend server
npm start

3️⃣ Frontend Setup

# Move to frontend folder
cd ../frontend
# Install frontend dependencies
npm install
# Start frontend server
npm start
👉 By default, frontend runs at:
http://localhost:3000


## 🗄️ Database Setup (MySQL)

# Step 1: Create new database
mysql -u root -p -e "CREATE DATABASE employee_management;"

# Step 2: Import only schema (table structure)
mysql -u root -p employee_management < database/schema.sql

# Step 3: Insert sample data
mysql -u root -p employee_management < database/seed.sql

# 👉 Alternate method: Import full backup (schema + data together)
mysql -u root -p employee_management < database/backup.sql

schema.sql → table structure
seed.sql → dummy/sample data
backup.sql → complete DB
