import { useState } from 'react';
import { useFetch } from '../hooks';
import { DeleteOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const OrderList = (props) => {
  const orders_url = `${process.env.REACT_APP_BACKEND_URL}/orders`
  const [isLoading, isError, setRefresh, data] = useFetch(orders_url)

  const Order = (props) => {
    return (
      <div className="order">
        <p>{props.temp} {props.syrups.join(" ")} latte with {props.milk} milk</p> <IconButton onClick={() => deleteItem(props.order_id)}><DeleteOutlined style={{ color: 'red' }} /></IconButton>
      </div>
    )
  }

  const deleteItem = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'id': id}),
    })
    .then((response) => response.json())
    .then((data) => {console.log(data); setRefresh(true)})
    .catch((error) => console.error(error))
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const elems = data.orders.map((order) => <Order temp={order.temperature} syrups={order.flavors} milk={order.milk} order_id={order._id["$oid"]} key={order._id["$oid"]}/>)

  console.log(elems)

  return (
    <>
      {elems}
    </>
  )
}

export default OrderList;
