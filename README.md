# Node.js Fundamentals API

> **Study Project**: This is a learning project focused on understanding Node.js core concepts without using external frameworks.

A RESTful API built with pure Node.js to explore fundamental concepts such as HTTP servers, streams, routing, middlewares, and file-based databases.

## 📚 Learning Goals

This project demonstrates:

- **HTTP Server**: Creating servers using Node's native `http` module
- **Routing System**: Custom routing with regex-based path matching and route parameters
- **Request Handling**: Processing JSON payloads with middlewares
- **Streams**: Working with Node.js streams for data processing
- **File System**: JSON-based database using `fs` module
- **ES Modules**: Using modern JavaScript module syntax

## 🚀 Features

- **CRUD Operations**: Complete user management (Create, Read, Update, Delete)
- **Query Parameters**: Search functionality with query strings
- **Route Parameters**: Dynamic routing with URL parameters
- **JSON Middleware**: Custom middleware for parsing JSON request bodies
- **Hot Reload**: Development mode with automatic restart on file changes

## 🛠️ Technologies

- **Node.js v24+**: Using native modules only
- **ES Modules**: Modern JavaScript imports/exports
- **Yarn**: Package manager

## 📦 Project Structure

```text
├── src/
│   ├── server.js              # Main HTTP server
│   ├── routes.js              # API routes definition
│   ├── middlewares/
│   │   └── json.js            # JSON body parser
│   ├── database/
│   │   └── database.js        # File-based database
│   └── utils/
│       ├── build-route-path.js       # Regex route builder
│       └── extract-query-params.js   # Query string parser
└── streams/
    ├── fundamentals.js               # Stream basics
    ├── buffer.js                     # Buffer handling
    └── fake-upload-to-http-stream.js # HTTP stream example
```

## 🏃 Getting Started

### Prerequisites

- Node.js v24.11.0 or higher
- Yarn 4.11.0 or higher

### Installation

```bash
# Install dependencies
yarn install
```

### Running the Server

```bash
# Start development server with hot reload
yarn dev
```

The server will start at `http://localhost:3333`

## 🔌 API Endpoints

### Get All Users

```bash
GET /users
```

**Query Parameters:**

- `search` (optional): Filter users by name or email

**Example:**

```bash
curl http://localhost:3333/users
curl http://localhost:3333/users?search=john
```

### Create User

```bash
POST /users
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Example:**

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Update User

```bash
PUT /users/:id
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Example:**

```bash
curl -X PUT http://localhost:3333/users/[user-id] \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

### Delete User

```bash
DELETE /users/:id
```

**Example:**

```bash
curl -X DELETE http://localhost:3333/users/[user-id]
```

## 🎓 Key Concepts Explored

### Custom Routing

The project implements a custom routing system using regular expressions to match paths and extract parameters:

```javascript
// Route with parameter
buildRoutePath("/users/:id");
// Matches: /users/123, /users/abc-def
```

### Middleware Pattern

Custom JSON parsing middleware that processes request bodies:

```javascript
await json(req, res);
// req.body now contains parsed JSON
```

### Stream Processing

Examples of working with Node.js streams in the `streams/` directory:

- Reading and transforming data streams
- Handling buffers
- HTTP upload streams

### File-Based Database

Simple JSON database with CRUD operations persisted to `db.json`:

- No external database required
- Synchronous file operations
- In-memory caching

## 📝 License

This is a study project and is available for educational purposes.

---

**Note**: This project intentionally avoids frameworks like Express.js to understand Node.js core concepts. It's not intended for production use.
