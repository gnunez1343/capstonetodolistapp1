// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import CompletedTasks from "./pages/CompletedTasks";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/new" element={<CreateTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/tasks/completed" element={<CompletedTasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
