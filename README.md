# 🧠 Knowledge Base REST API

A TypeScript-based RESTful API for managing a dynamic knowledge base system.  
Supports interconnected topics, version control, user roles, and resource links.

---

## 🚀 Features

- ✅ Topic creation with parent-child hierarchy
- ✅ Topic versioning with history and restore support
- ✅ Resource association (articles, videos, PDFs)
- ✅ Role-based user management (Admin, Editor, Viewer)
- ✅ Shortest path algorithm between topics
- ✅ Fully tested with Jest + Supertest

---

## 📦 Tech Stack

- Node.js
- TypeScript
- Express.js
- Jest + Supertest (for testing)
- In-memory database (no external DB required)

---

## 📁 Project Structure

```
src/
├── app.ts                # Express server
├── db/                   # In-memory database
├── models/               # Interfaces and types
├── routes/               # Controllers
├── services/             # Business logic
└── __tests__/            # Jest test files
```

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/richardba/knowledge-base-api.git
cd knowledge-base-api
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Run the server

```bash
npm run dev
```

Server starts on **http://localhost:3000**

> You can test endpoints using Postman, Insomnia, or PowerShell.

---

## 🧪 Run Tests

```bash
npm test
```

Runs all unit and route tests using Jest + Supertest.

---

## 📬 Example Endpoints

- `GET /topics` – List all topics
- `POST /topics` – Create a new topic
- `PUT /topics/:id` – Update a topic (creates a new version)
- `GET /topics/:id/versions` – Get topic version history
- `POST /topics/:id/restore/:version` – Restore topic from previous version
- `GET /topics/:id/children` – Get child topics
- `GET /topics/path/:fromId/:toId` – Find shortest path between two topics
- `POST /resources` – Create a new resource linked to a topic
- `GET /resources/topic/:topicId` – List resources for a topic
- `POST /users` – Create a new user
- `GET /users` – List all users

---

## 🧠 User Roles

- **Admin**: full access
- **Editor**: can create/edit topics/resources
- **Viewer**: read-only access

(Role-based route protection can be added easily.)

---

## 📎 Notes

- This project uses an in-memory DB for simplicity.
- Data is **reset every time** the server restarts.
- Ideal for showcasing architecture, design patterns, and backend logic.

---

## 📮 License

MIT — free to use, modify, and distribute.
