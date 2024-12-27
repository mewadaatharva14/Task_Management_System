Task Management System

🚀 Overview
The Task Management System is a web-based platform for managing tasks efficiently. It features user authentication, task creation, and retrieval functionalities with a responsive design for seamless user experience. Built with Node.js, Express.js, and SQLite, this project is an excellent starting point for learning full-stack web development.

✨ Features
User Authentication: Secure registration and login system.
Task Operations:
Create new tasks with description, dates, and status.
View all tasks for the logged-in user.
Session Management: Securely manages user sessions with express-session.
Responsive UI: Styled using Bootstrap for a professional and mobile-friendly interface.
🛠 Tech Stack
Backend: Node.js, Express.js
Database: SQLite
Frontend: HTML, CSS, Bootstrap
Session Handling: express-session
📝 Installation
Prerequisites
Ensure the following are installed on your system:

Node.js (v14 or higher)
npm (Node Package Manager)
Steps to Run Locally
Clone this repository:

bash
Copy code
git clone <repository_url>
cd task-management-system
Install the required dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node app.js
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
📂 Project Structure
plaintext
Copy code
.
├── app.js              # Main server file
├── management.db       # SQLite database (auto-generated)
├── public/
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   ├── task.html       # Task management page
├── Screenshot 2024-12-27 at 12.09.50 PM.png  # Application preview
├── README.md           # Documentation
🛤 API Endpoints
Authentication
Method	Endpoint	Description
GET	/	Displays the registration page.
POST	/register	Registers a new user.
GET	/lo	Displays the login page.
POST	/login	Logs in a user.
GET	/logout	Logs out the current user.
Task Management
Method	Endpoint	Description
GET	/home	Displays the task management page.
GET	/tasks	Retrieves tasks for the logged-in user.
POST	/task	Creates a new task for the logged-in user.
User Info
Method	Endpoint	Description
GET	/username	Returns the logged-in user's username.
👀 Preview

🚀 How It Works
Register:

Create an account by providing your username, email, and password.
Emails must be unique for each user.
Login:

Access your account by logging in with your email and password.
Manage Tasks:

View, create, and manage tasks associated with your account.
Logout:

Securely end your session by logging out.
🌟 Future Enhancements
Task Updates: Add functionality to edit and delete tasks.
Search & Filter: Implement advanced search and filter options.
Security: Integrate password hashing and a password recovery system.
📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute this project as needed.

🤝 Contribution
Contributions are welcome! If you'd like to improve this project:

Fork this repository.
Create a feature branch:
bash
Copy code
git checkout -b feature/YourFeature
Commit your changes:
bash
Copy code
git commit -m 'Add your feature'
Push to the branch:
bash
Copy code
git push origin feature/YourFeature
Submit a pull request.
