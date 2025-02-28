# Portfolio Site

A modern portfolio website built with Angular for the frontend and Node.js/Express for the backend.

## Features

- Responsive design
- Project showcase with detailed project pages
- Contact form
- About section with skills and experience
- MongoDB database for storing projects and messages

## Technologies Used

### Frontend
- Angular 17
- TypeScript
- SCSS
- Angular Router
- RxJS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Nodemailer for email functionality

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (v4 or higher)
- Angular CLI (v17 or higher)

## Installation and Setup

### Option 1: Traditional Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd portfolio-site
   ```

2. Install dependencies:
   ```
   npm run install:all
   ```

3. Set up environment variables:
   - Copy the `.env.example` file in the `backend` directory to `.env` and update with your values:
     ```
     cp backend/.env.example backend/.env
     ```
   - Update the following variables in the `.env` file:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/portfolio
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```

4. Seed the database with example projects:
   ```
   npm run seed
   ```

5. Start the development servers:
   ```
   npm run dev
   ```

6. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

### Option 2: Docker Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd portfolio-site
   ```

2. Configure environment variables:
   - Copy the `.env.example` file in the root directory to `.env` and update with your values:
     ```
     cp .env.example .env
     ```
   - Update the following variables in the `.env` file:
     ```
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```

3. Build and start the Docker containers:
   ```
   npm run docker:build
   ```

4. Seed the database with example projects:
   ```
   npm run docker:seed
   ```

5. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3000

## Project Structure

```
portfolio-site/
├── frontend/
│   └── portfolio-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   ├── models/
│       │   │   ├── services/
│       │   │   └── ...
│       │   ├── assets/
│       │   └── ...
│       └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── ...
└── ...
```

## Development

### Frontend Development

```
cd frontend/portfolio-app
ng serve
```

### Backend Development

```
cd backend
npm run dev
```

## Docker Commands

### Start the application
```
docker-compose up -d
```

### Stop the application
```
docker-compose down
```

### View logs
```
docker-compose logs -f
```

### Rebuild containers
```
docker-compose up -d --build
```

## GitHub Repository Setup

### Sensitive Information Protection

This project includes `.gitignore` files to prevent sensitive information from being committed to your repository:

1. **Root `.gitignore`**: Ignores node_modules, environment files, build outputs, and system files.

2. **Backend `.gitignore`**: Specifically ignores the backend's `.env` file containing database credentials and email settings.

3. **Frontend `.gitignore`**: Ignores Angular-specific files and environment configurations.

### Before Pushing to GitHub

1. Make sure you've set up the `.gitignore` files correctly.

2. Check that no sensitive information is being tracked:
   ```
   git status
   ```

3. If you see any sensitive files being tracked, add them to the appropriate `.gitignore` file.

4. Use environment example files:
   - The repository includes `.env.example` files that show the required environment variables without revealing actual credentials.
   - New users of your repository can copy these files to create their own `.env` files.

### Initial GitHub Push

```bash
# Initialize Git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

## License

This project is licensed under the ISC License. 