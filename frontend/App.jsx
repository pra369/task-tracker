import React from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Toast from './components/Toast';

const AppContent = () => {
  const { toast } = useTasks();
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Home />
      </main>
      <Toast toast={toast} />
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <AppContent />
  </TaskProvider>
);

export default App;
