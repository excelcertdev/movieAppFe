import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import MainLayout from './components/Layouts/MainLayout';
import MovieList from './components/Movie/MovieList';
import CreateMovie from './components/Movie/CreateMovie';
import UpdateMovie from './components/Movie/UpdateMovie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path='/' element={<MainLayout><LoginForm /></MainLayout>} />
          <Route path='/updateMovie/:id' element={<MainLayout><UpdateMovie /></MainLayout>} />
          <Route path='/movieList' element={<MainLayout><MovieList /></MainLayout>} />
          <Route path='/createMovie' element={<MainLayout><CreateMovie /></MainLayout>} />
        </Routes>
      </Router>
    

      </>
  );
}

export default App;
