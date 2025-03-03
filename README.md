# Task Manager API (MERN Backend) 🚀

A **RESTful API** built using **Node.js, Express.js, and MongoDB** to manage tasks efficiently. This API supports **CRUD operations**, **sorting**, **pagination**, and follows **industry best practices** for backend development.

## 📌 Features

- ✅ **Create, Read, Update, and Delete (CRUD) Tasks**
- ✅ **Sorting & Pagination for Efficient Data Retrieval**
- ✅ **MongoDB Atlas Integration for Cloud Storage**
- ✅ **Environment Variables for Security**
- ✅ **Middleware for Error Handling & Logging**

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Tools:** Postman (API Testing), GitHub

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4️⃣ Run the Server

```bash
npm run dev
```

The server will start at **[http://localhost:5000](http://localhost:5000)**

---

## 📡 API Endpoints

### ➤ **Task Routes**

#### 1️⃣ Add a New Task

```http
POST /tasks/add
```

**Body:**

```json
{
  "title": "Learn Node.js",
  "owner": "Aayush"
}
```

#### 2️⃣ View Tasks with Sorting & Pagination

```http
GET /tasks/view?sort=title&order=asc&page=1&limit=5
```

#### 3️⃣ Update a Task

```http
PUT /tasks/update/:id
```

**Body:**

```json
{
  "title": "Updated Task Title"
}
```

#### 4️⃣ Delete a Task

```http
DELETE /tasks/delete/:id
```

---

## 🛠 Best Practices Followed

- **Environment Variables** for sensitive data.
- **Middleware** for error handling and logging.
- **Mongoose ODM** for efficient database interaction.
- **Pagination & Sorting** for optimized performance.

---

## 🤝 Contributions

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

🚀 **Happy Coding!**
