# Todo App

This is a simple todo app I built using Angular for the frontend and .NET for the backend.

## What I Used

- **Frontend**: Angular 20 with TypeScript
- **Backend**: .NET Web API
- **How they talk**: HTTP requests

## What You Need

- Node.js installed on your computer
- .NET 8 SDK installed
- Angular CLI (install with: `npm install -g @angular/cli`)

## How to Run This App

### Step 1: Start the Backend

Open terminal and go to the backend folder:
```bash
cd API/ToDo/ToDo
dotnet run
```

The backend will start on: `http://localhost:5185/api/todos`

### Step 2: Start the Frontend

Open another terminal and go to the frontend folder:
Open terminal
cd Frontend/frontend
npm install
ng serve/ npm start

The frontend will start on: `http://localhost:4200`

## What This App Does

- You can add new todos
- You can mark todos as done or not done
- You can delete todos
- You can see all your todos
- It shows errors if something goes wrong

## How the Code is Organized

```
TodoAPP/
├── API/ToDo/ToDo/          # Backend code
└── Frontend/frontend/      # Frontend code
```

That's it! Just open `http://localhost:4200` in your browser and start using the app.
