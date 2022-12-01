import React, { useEffect, useState } from 'react'
import logo from '../images/logo_proximity.png';
import { useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import styles from './styles.module.scss';

const ShowOrder = () => {
  const initial_value = {
    date: '', hour: '', width: '', hight: '',
    large: '', weight: '', quantity: '', senderAddress: '',
    senderCity: '', senderPhone: '', senderCellPhone: '',
    targetAddress: '', targetCity: '', receiverPhone: ''
  }

  let {id, order_id } = useParams([]);
  const [order, setOrder] = useState(initial_value);
  const [subId, setSubId] = useState(id);
  const [subOrderId, setSubOrderId] = useState(order_id);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const navegate = useNavigate();

  const getData = (e) => {
    const { name, value } = e.target;
    setOrder({...order, [name]: value})
  }

  const getOrderData = async (subId, subOrderId) => {
    const response = await fetch(`http://localhost:4000/api/v1/users/${subId}/orders/${subOrderId}`)
    .then((res) => res.json())
    .then((data) => {
      return data
    });

    setOrder({
      id: response._id,
      date: response.date,
      hour: response.hour,
      width: response.width,
      hight: response.hight,
      large: response.large,
      weight: response.weight,
      quantity: response.quantity,
      senderAddress: response.senderAddress,
      senderCity: response.senderCity,
      senderPhone: response.senderPhone,
      senderCellPhone: response.senderCellPhone,
      targetAddress: response.targetAddress,
      targetCity: response.targetCity,
      receiverPhone: response.receiverPhone,
      status: response.status
    })
  }

  useEffect(() => {
    if (subId !== '' && subOrderId !== '') {
      getOrderData(subId, subOrderId)
    }
  },[subId, subOrderId])

  const updateOrderData = async (e) => {
    e.preventDefault();
    const orderUpdated = {
      date: order.date,
      hour: order.hour,
      width: order.width,
      hight: order.hight,
      large: order.large,
      weight: order.weight,
      quantity: order.quantity,
      senderAddress: order.senderAddress,
      senderCity: order.senderCity,
      senderPhone: order.senderPhone,
      senderCellPhone: order.senderCellPhone,
      targetAddress: order.targetAddress,
      targetCity: order.targetCity,
      receiverPhone: order.receiverPhone
    }
    setLoading(true);

    await fetch(`http://localhost:4000/api/v1/users/${subId}/orders/${subOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderUpdated),
    })
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message)
      setTimeout(() => {
        setMessage('');
        navegate(`/welcome/${subId}`)
      }, 2500)
      .catch((error) => {
        console.error(error);
        setMessage('Something went wrong');
        setTimeout(() => {
          setMessage('');
        }, 1500)
      })
    });
    setLoading(false);

    setOrder({...initial_value});
    setSubId('');
    setSubOrderId('');
  }

  const cancelOrder = async (e) => {
    e.preventDefault();
    const orderUpdated = {
      status: 'Cancelled'
    }

    setLoading(true);

    await fetch(`http://localhost:4000/api/v1/users/${subId}/orders/${subOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderUpdated),
    })
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message)
      setTimeout(() => {
        setMessage('');
        navegate(`/welcome/${subId}`)
      }, 2500)
      .catch((error) => {
        console.error(error);
        setMessage('Something went wrong');
        setTimeout(() => {
          setMessage('');
        }, 1500)
      })
    });
    setLoading(false);

    setOrder({...initial_value});
    setSubId('');
    setSubOrderId('');
  }

  return(
    <div className='container'>
      <div className='col-md-12'>
        <div className='card' style={{border: '1px solid', borderRadius: '30px'}}>
          <div className='card-body'>
            <div className='d-flex'>
              <h3 className='mt-5 mx-sm-4'>Order n° <p className='h1 text-secondary'>{ order.id }</p></h3>
              <img className='mx-sm-auto' src={logo} alt='logo' height={150}
                width={250} align="end"/>
            </div>
            <form onSubmit={updateOrderData}>
              <div className='row'>
                <div className='mb-3 col-md-3'>
                  <label class="form-label">Date:</label>
                  <input type="date" className="form-control" 
                  name='date' placeholder="Enter date"
                  value={dateFormat(order.date, "yyyy-mm-dd")} required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-3'>
                  <label class="form-label">Hour:</label>
                  <input type="time" className="form-control"
                  name='hour' placeholder="Enter time"
                  value={ order.hour } required
                  onChange={getData}/>
                </div>
                {/* Limit to separate columns */}
                <div className='mb-3 col-md-6'>
                  <label>Status: { order.status }</label>
                </div>
                {/* Second line */}
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Width:</label>
                  <input type="text" className="form-control"
                  name='width' placeholder="Enter width" 
                  value={ order.width } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Hight:</label>
                  <input type="text" className="form-control"
                  name='hight' placeholder="Enter hight" 
                  value={ order.hight } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Large:</label>
                  <input type="text" className="form-control"
                  name='large' placeholder="Enter large" 
                  value={ order.large } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Weight:</label>
                  <input type="text" className="form-control"
                  name='weight' placeholder="Enter weight" 
                  value={ order.weight } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-2'>
                  <label class="form-label">Quantity:</label>
                  <input type="text" className="form-control"
                  name='quantity' placeholder="Enter quantity" 
                  value={ order.quantity } required
                  onChange={getData}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Sender address:</label>
                  <input type="text" className="form-control"
                  name='senderAddress' placeholder="Enter sender address"
                  value={ order.senderAddress } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Sender city:</label>
                  <input type="text" className="form-control" 
                  name='senderCity' placeholder="Enter sender city"
                  value={ order.senderCity } required
                  onChange={getData}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Sender phone:</label>
                  <input type="text" className="form-control"
                  name='senderPhone' placeholder="Enter sender phone (605) 3233433"
                  value={ order.senderPhone } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Sender cell phone:</label>
                  <input type="text" className="form-control" 
                  name='senderCellPhone' placeholder="Enter sender phone (+57) 3124353637"
                  value={ order.senderCellPhone } required
                  onChange={getData}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label class="form-label">Destination address:</label>
                  <input type="text" className="form-control"
                  name='targetAddress' placeholder="Enter destination address"
                  value={ order.targetAddress } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Destination city:</label>
                  <input type="text" className="form-control" 
                  name='targetCity' placeholder="Enter destination city"
                  value={ order.targetCity } required
                  onChange={getData}/>
                </div>
                <div className='mb-3 col-md-6'>
                  <label class="form-label">Contact destination phone:</label>
                  <input type="text" className="form-control" 
                  name='receiverPhone' placeholder="Enter contact destination phone"
                  value={order.receiverPhone} require onChange={getData}/>
                </div>
              </div>
              <div className='d-grid gap-2 col-4 mx-auto mt-4'>
                <button className='btn btn-primary' type='submit'>{loading ? 'loading...' : 'Update'}</button>
              </div>
            </form>
            <form onSubmit={cancelOrder}>
              <div className='d-grid gap-2 col-4 mx-auto mt-4'>
                <button className='btn btn-danger mx-3' >Cancel order</button>
              </div>
            </form>
            </div>
          {message && <div className={styles.toast}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default ShowOrder
