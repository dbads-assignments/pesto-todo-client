import './app.css';
import Navbar from './components/Navbar/Navbar';
import TodoForm from './components/TodoForm/TodoForm';

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <TodoForm />
    </div>
  );
}

export default App;
