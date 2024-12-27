<h1># Task Management System</h1>

![Task Management System](./images/screenshot.png)

## 📖 About the Project
The Task Management System is a full-stack application designed to help users manage their tasks efficiently. Users can register, log in, add tasks, view all their tasks, and manage their statuses. The application is built with:
- **Backend**: Node.js and SQLite
- **Frontend**: HTML, CSS, and JavaScript

## 🎯 Features
- Secure user registration and login system.
- Session management using Express-Session.
- Add, view, and update task statuses.
- Responsive and user-friendly design.

## 🚀 How to Run the Project

### Prerequisites
- Node.js and npm installed on your system.
- SQLite installed (optional for advanced database management).

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/task-management-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd task-management-system
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the server:
    ```bash
    node server.js
    ```
5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## 🗂️ Project Structure
- `server.js`: Contains the server-side logic and routes.
- `task.html`: The frontend for task management.
- `register.html` and `login.html`: Authentication pages.
- `management.db`: SQLite database file.
- `public/`: Contains static assets like CSS and JavaScript files.

## 📸 Screenshot
![Screenshot of Task Management System](./images/screenshot.png)

## 💻 API Endpoints

### Authentication
- `POST /register`: Register a new user.
- `POST /login`: Login a user.
- `GET /logout`: Logout the current user.

### Tasks
- `GET /tasks`: Fetch all tasks for the logged-in user.
- `POST /task`: Add a new task.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

## 🛠️ Technologies Used
- Node.js
- Express.js
- SQLite
- HTML, CSS, JavaScript

## 🙌 Acknowledgements
- Inspired by task management systems like Trello and Asana.
- Built for learning and demonstration purposes.
