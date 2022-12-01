import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../images/logo_proximity.png';
import styles from './styles.module.scss';

const NewOrder = () => {
  const [order, setOrder] = useState({
    date: '', hour: '', width: '', hight: '',
    large: '', weight: '', quantity: '', senderAddress: '',
    senderCity: '', senderPhone: '', senderCellPhone: '',
    targetAddress: '', targetCity: '', receiverPhone: ''
  });
  let { id } = useParams([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const {
    date, hour, width, hight, large, weight, quantity, senderAddress,
    senderCity, senderPhone, senderCellPhone, targetAddress ,targetCity,
    receiverPhone} = order;
  const [userId, setId] = useState(id);

  const onChange = (e) => {
    setOrder({...order, [e.target.name]: e.target.value});
  };

  const saveOrder = async (e) => {
    e.preventDefault();

    if (date !== "" && hour !== "" && width !== '' && hight !== "" && large !== "" &&
    weight !== "" && quantity !== "" && senderAddress !== "" && senderCity !== "" &&
    senderPhone !== "" && senderCellPhone !== "" && targetAddress !== "" &&
    targetCity !== "" && receiverPhone !== "") {

      const newOrder = {
        date, hour, width, hight, large, weight, quantity, senderAddress,
        senderCity, senderPhone, senderCellPhone, targetAddress, targetCity, receiverPhone
      };

      setLoading(true);

      await fetch(`http://localhost:4000/api/v1/users/orders/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })
      .then((response) => response.json())
      .then(response => {
        if (response.error) {
          return Swal.fire(response.error, '', 'error');
        } else {
          setMessage(response.message)
          setOrder({date: '', hour: '', width: '', hight: '',
            large: '', weight: '', quantity: '', senderAddress: '',
            senderCity: '', senderPhone: '', senderCellPhone: '',
            targetAddress: '', targetCity: '', receiverPhone: ''})
          setTimeout(() => {
            setMessage('');
            navegate(`/welcome/${userId}`)
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
    } else {
      Swal.fire('Please. Make sure you have filled up all fields.', '','error')
    }

    setLoading(false);
  }

  const navegate = useNavigate();

  return(
    <div className='container'>
      <div className='col-md-12'>
        <div className='card' style={{border: '1px solid', borderRadius: '30px'}}>
          <div className='card-body'>
            <div className='d-flex'>
              <img className='mx-sm-auto' src={logo} alt='logo' height={150}
                width={250} align="end"/>
            </div>
            <form onSubmit={(e) => saveOrder(e)}>
              <div className='row'>
                <div className='mb-3 col-md-3'>
                  <label class="form-label">Date:</label>
                  <input type="date" className="form-control" 
                  name='date' placeholder="Enter date"
                  value={date} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-3'>
                  <label class="form-label">Hour:</label>
                  <input type="time" className="form-control"
                  name='hour' placeholder="Enter time"
                  value={hour} require onChange={(e) => onChange(e)}/>
                </div>
                {/* Limit to separate columns */}
                <div className='mb-3 col-md-6'>
                </div>
                {/* Second line */}
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Width:</label>
                  <input type="text" className="form-control"
                  name='width' placeholder="Enter width" 
                  value={width} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Hight:</label>
                  <input type="text" className="form-control"
                  name='hight' placeholder="Enter hight" 
                  value={hight} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Large:</label>
                  <input type="text" className="form-control"
                  name='large' placeholder="Enter large" 
                  value={large} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Weight:</label>
                  <input type="text" className="form-control"
                  name='weight' placeholder="Enter weight" 
                  value={weight} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Quantity:</label>
                  <input type="text" className="form-control"
                  name='quantity' placeholder="Enter quantity" 
                  value={quantity} require onChange={(e) => onChange(e)}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Sender address:</label>
                  <input type="text" className="form-control"
                  name='senderAddress' placeholder="Enter sender address"
                  value={senderAddress} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Sender city:</label>
                  <input type="text" className="form-control" 
                  name='senderCity' placeholder="Enter sender city"
                  value={senderCity} require onChange={(e) => onChange(e)}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Sender phone:</label>
                  <input type="text" className="form-control"
                  name='senderPhone' placeholder="Enter sender phone (605) 3233433"
                  value={senderPhone} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Sender cell phone:</label>
                  <input type="text" className="form-control" 
                  name='senderCellPhone' placeholder="Enter sender phone (+57) 3124353637"
                  value={senderCellPhone} require onChange={(e) => onChange(e)}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Destination address:</label>
                  <input type="text" className="form-control"
                  name='targetAddress' placeholder="Enter destination address"
                  value={targetAddress} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Destination city:</label>
                  <input type="text" className="form-control" 
                  name='targetCity' placeholder="Enter destination city"
                  value={targetCity} require onChange={(e) => onChange(e)}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Contact destination phone:</label>
                  <input type="text" className="form-control" 
                  name='receiverPhone' placeholder="Enter contact destination phone"
                  value={receiverPhone} require onChange={(e) => onChange(e)}/>
                </div>
              </div>
              <div className='d-grid gap-2 col-4 mx-auto mt-4'>
                <button className='btn btn-primary' type='submit'>{loading ? 'loading...' : 'Save'}</button>
              </div>
            </form>
          </div>
          {message && <div className={styles.toast}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default NewOrder
