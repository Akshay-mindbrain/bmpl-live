# Backend Auto-Code

A production-ready **Node.js + Express.js + TypeScript** backend boilerplate featuring solid architecture, automated audit logging, and role-based access control.

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed:

*   **Node.js** (v20+ Recommended)
*   **Docker & Docker Compose** (For MySQL database)
*   **Git**

---

## 🚀 Quick Start (For New Developers)

Follow these steps to get the project running on your local machine.

### 1. Clone & Install
```bash
git clone <repository-url>
cd backend-auto-code
npm install
```

### 2. Environment Setup
Create your local environment file:
- **Windows**: `copy .env.example .env`
- **Linux/Mac**: `cp .env.example .env`

> [!IMPORTANT]
> Open `.env` and ensure `APP_SECRET`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET` are populated with secure strings (min 32 chars).

### 3. Spin up Database
We use Docker to manage our MySQL instance for consistency.
```bash
docker compose up -d db
```
*The database will be available at `localhost:33061` by default.*

### 3a. Alternatively: Run Entire Stack with Docker
If you want to run the application, database, and phpMyAdmin all together in Docker:
```bash
docker compose up -d
```
*This will build the app and start all services. The app will be on port `3000`.*

### 4. Database Initialization
Generate the Prisma client and apply existing migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start Development
If you chose step 3 (Local App + Docker DB), run:
```bash
npm run dev
```
The API is now live at `http://localhost:3000`.  
Check the health status: `http://localhost:3000/health`

---

## 🗃️ Database Management

### phpMyAdmin
When running via Docker Compose, you have access to a web interface for database management:
- **URL**: `http://localhost:8080`
- **Host**: `db`
- **Username**: `root`
- **Password**: `secret` (as defined in `.env`)

---

## 💻 OS Specific Instructions

### 🪟 Windows Setup
1. **Node.js**: Install via [official installer](https://nodejs.org/).
2. **Docker**: Use [Docker Desktop](https://www.docker.com/products/docker-desktop). Ensure WSL2 backend is enabled.
3. **Terminal**: Use PowerShell or Git Bash for a better experience.

### 🐧 Linux (Ubuntu/Debian)
1. **Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
2. **Docker**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose-v2
   sudo usermod -aG docker $USER
   # Logout and back in for group changes
   ```

---

## 📁 Key Project Features

-   **Clean Architecture**: Separation of concerns between Controllers, Services, and Repositories.
-   **Audit Trail**: Automated logging for all User actions (Create, Update, Delete) via Prisma middleware/transactions.
-   **Role-Based Access**: Secure endpoints with `SUPERADMIN`, `ADMIN`, and `MANAGER` roles.
-   **Error Handling**: Centralized `AppError` factory for consistent API responses.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the app in watch mode (Hot-reload) |
| `npm run build` | Compiles TypeScript to JavaScript in `/dist` |
| `npm start` | Starts the production server from `/dist` |
| `npx prisma studio` | Opens a GUI to view/edit your database |
| `npm test` | Runs the test suite |

---

## 🤝 Troubleshooting

-   **Port Conflict**: If `3000` is taken, update `PORT` in `.env`.
-   **DB Connection**: If migrations fail, ensure the Docker container is running (`docker ps`).
-   **Prisma Errors**: If you see "Prisma Client not found", run `npx prisma generate`.

---

**Developed for scalability and developer happiness.**
