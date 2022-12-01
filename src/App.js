import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import ShowOrder from './components/ShowOrder';
import NewOrder from './components/NewOrder';

const App = () => {
  return (
    <div className="">
      <div className='container p-4'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/welcome/:id' element={<Welcome/>}/>
          <Route path='/:id/orders/:order_id' element={<ShowOrder/>}/>
          <Route path='/:id/orders' element={<NewOrder/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
