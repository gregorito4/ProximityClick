import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_proximity.png';
import styles from './styles.module.scss';

const SignIn = () => {
  const [user, setUser] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passConfirmation: ''
  });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const {name, userName, email, password, passConfirmation} = user;

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (password.length >= 6) {
      if (password !== passConfirmation) {
        return Swal.fire('Different passwords', 'Please make sure passwords be the same', 'error');
      } else if (name !== "" && userName !== "" && password !== "" && email !== "") {
        const newUser = {name, userName, email, password};
        setLoading(true);
  
        await fetch('http://localhost:4000/api/v1/users/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then(response => {
          if (response.error) {
            return Swal.fire(response.error, '', 'error');
          } else {
            setMessage(response.message)
            setUser({name: '', userName: '', email: '', password: '', passConfirmation: ''})
            setTimeout(() => {
              setMessage('');
              navegate(`/welcome/${response.user._id}`)
            }, 2500)
            .catch((error) => {
              console.error(error);
              setMessage('Something went wrong');
              setTimeout(() => {
                setMessage('');
              }, 1500)

            })
          }
        });
      }
    } else {
      return Swal.fire('Your password should have 6 chars or more','', 'error')
    }
    setLoading(false);
  }

  const navegate = useNavigate();

  return(
    <div className='container'>
      <div className='col-md-6 offset-md-3'>
        <div className='card' style={{border: '1px solid', borderRadius: '30px'}}>
          <div className='card-body'>
            <div className='d-flex'>
              <h3 className='mt-5 mx-sm-4'>Sign up</h3>
              <img className='mx-sm-auto' src={logo} alt='logo' height={150}
                width={250} align="end"/>
            </div>
            <form onSubmit={(e) => saveUser(e)}>
              <div className='mb-3'>
                <label class="form-label">Name:</label>
                <input type="text" className="form-control" 
                name='name' placeholder="Enter your full name"
                value={name} 
                require onChange={(e) => onChange(e)}/>
              </div>
              <div className='mb-3'>
                <label class="form-label">Username:</label>
                <input type="text" className="form-control"
                value={userName}
                name='userName' placeholder="Choose a unique username" 
                required onChange={(e) => onChange(e)}/>
              </div>
              <div className='mb-3'>
                <label class="form-label">Email:</label>
                <input type="text" className="form-control"
                value={email}
                name='email' placeholder="Enter your email address" 
                required onChange={(e) => onChange(e)}/>
              </div>
              <div className="mb-3">
                <label class="form-label">Password:</label>
                <input type="password" className="form-control"
                value={password}
                name='password' placeholder="Choose a password (min 6 chars)" required onChange={(e) => onChange(e)}/>
              </div>
              <div className='mb-3'>
                <label class="form-label">Password confirmation:</label>
                <input type="password" className="form-control" 
                name='passConfirmation' placeholder="confirm your password"
                required onChange={(e) => onChange(e)}/>
              </div>
              <div className='d-flex'>
                <button className='btn btn-primary' type='submit'>{loading ? 'loading...' : 'Sign up'}</button>
              </div>
            </form>
            <div className='mb-3 mt-3'>
              <p>
                Already got an account?
                <b className='mx-2' onClick={() => navegate('/')}>Log in</b>
              </p>
            </div>
          </div>
          {message && <div className={styles.toast}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignIn
