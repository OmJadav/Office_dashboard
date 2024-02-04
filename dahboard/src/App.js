import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Editpage from './pages/Editpage';
import Reportpage from './pages/Reportpage';
import Login from './components/Login';
import Expensespage from './pages/Expensespage';
// import AdminProtected from './Admin/Protected';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const location = useLocation()
  console.log(user);
  return user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route element={<Layout />}>
          <Route path='/home' element={<Homepage />} />
          <Route path='/edit/:productId' element={<Editpage />} />
          <Route path='/report' element={<Reportpage />} />
          <Route path='/expenses' element={<Expensespage />} />
        </Route>
        <Route path='/' element={<Login />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
