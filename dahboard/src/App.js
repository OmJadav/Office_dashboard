import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Editpage from './pages/Editpage';
import Reportpage from './pages/Reportpage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/edit/:productId' element={<Editpage />} />
        <Route path='/report' element={<Reportpage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
