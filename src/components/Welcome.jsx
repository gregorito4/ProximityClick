import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../images/logo_proximity.png';
import dateFormat from 'dateformat';

const Welcome = () => {
  const [name, setName] = useState();
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setName(data.name)
    })
    .catch((error) => console.error(error))
  }, [id])

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`http://localhost:4000/api/v1/users/${id}/orders`)
      .then((res) => res.json())
      .then((data) => {
        return data.orders
      });
      setOrders(response);
    }

    getOrders()
  },[orders]);

  const navegate = useNavigate();

  return(
    <div className='container'>
      <div className='col-md-12'>
        <div className='card' style={{border: '1px solid', borderRadius: '30px'}}>
          <div className='card-body'>
            <div className='d-flex'>
              <h3 className='mt-5 mx-sm-4'>{name ? `Welcome Back ${name}` : 'Welcome weird'}</h3>
              <img className='mx-sm-auto' src={logo} alt='logo' height={150}
                width={250} align="end"/>
            </div>
            <div className='row' style={{height: '400px', overflow: 'auto'}}>
              {
                orders.map(order => (
                  <div className='col-md-4 p-2' key={order._id}>
                    <div className='card'>
                      <div className='card-header'>
                        <h5>Order n°: {order._id}</h5>
                      </div>
                      <div className='card-body'>
                        <p><strong>Date:</strong> {dateFormat(order.date, "mmmm dd, yyyy")}</p>
                        <p><strong>Sender address:</strong>  {order.senderAddress}</p>
                        <p><strong>Sender city:</strong>  {order.senderCity}</p>
                        <p><strong>Destination city:</strong>  {order.targetCity}</p>
                        <p><strong>Receiver phone:</strong> {order.receiverPhone}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                      </div>
                      <div className='card-footer'>
                        <button className='btn btn-outline-primary' onClick={() => navegate(`/${id}/orders/${order._id}`)}>Show more</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <button className='btn btn-primary' onClick={() => navegate(`/${id}/orders`)}>New order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
