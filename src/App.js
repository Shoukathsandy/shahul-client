import './App.css';
import Register from './component/register';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register />}/>
      </Routes>
<ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
