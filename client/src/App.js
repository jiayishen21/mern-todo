import {Fragment} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const App = () => {
  return (
    <Fragment>
      <div className='container'>
        <Header />
        <Routes>
          <Route path ='/' element={<Dashboard />} />
          <Route path ='/login' element={<Login />} />
          <Route path ='/register' element={<Register />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;