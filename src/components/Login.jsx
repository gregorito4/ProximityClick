import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_proximity.png';
import styles from './styles.module.scss';
import { Link } from "react-router-dom";

const LogIn = () => {
  const [user, setUser] = useState({
    userName: '',
    password: ''
  });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { userName, password } = user;

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const loadUser = async (e) => {
    e.preventDefault();

    if (userName !== "" && password) {
      const User = { userName, password};
      setLoading(true);

      await fetch('http://localhost:4000/api/v1/users/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      })
      .then((response) => response.json())
      .then(response => {
        console.log(response);
        if (response.error) {
          return Swal.fire(response.error, '', 'error');
        } else {
          setMessage(response.message)
          setUser({userName: '',password: ''})
          setTimeout(() => {
            setMessage('');
            navegate(`/welcome/${response.id}`)
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
    setLoading(false);
  }

  const navegate = useNavigate();

  return(
    <div className='container'>
      <div className='col-md-6 offset-md-3'>
        <div className='card' style={{border: '1px solid', borderRadius: '30px'}}>
          <div className='card-body'>
            <div className='d-flex'>
              <h3 className='mt-5 mx-sm-4'>Log in</h3>
              <img className='mx-sm-auto' src={logo} alt='logo' height={150}
                width={250} align="end"/>
            </div>
            <form onSubmit={(e) => loadUser(e)}>
              <div className='mb-3'>
                <label class="form-label">Username:</label>
                <input type="text" className="form-control" 
                name='userName' placeholder="username"
                value={userName}
                required onChange={(e) => onChange(e)}/>
              </div>
              <div className="mb-3">
                <label class="form-label">Password:</label>
                <input type="password" className="form-control"
                name='password' placeholder="password"
                value={password}
                required onChange={(e) => onChange(e)}/>
              </div>
              <div className='d-flex'>
                <button className='btn btn-primary' type='submit'>{loading ? 'loading...' : 'Log in'}</button>
              </div>
            </form>
            <div className='mt-3'>
              <p>
                Don't have an account yet?
                <Link className='mx-2' to={'/sign-in'}>
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
          {message && <div className={styles.toast}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default LogIn
