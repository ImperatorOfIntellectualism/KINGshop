import React, { useState, useEffect } from 'react';
import {useHttp} from '../hooks/http.hook'
import {Button} from 'react-bootstrap'

const Column = () => {
  let [quantity, setQuantity] = useState(1)

  const less = () => {
    if (quantity != 1){
      setQuantity(quantity = quantity - 1)
    }
  }

  const more = () => {
     setQuantity(quantity = quantity + 1)
  }

return (
   <div className="col">
      <Button onClick={less}>-</Button>
      <a href="#" className="border">{quantity}</a>
      <Button onClick={more}>+</Button> 
   </div>
)
}

export const CartPage = () => {
  const {request} = useHttp()
  let [items, setItems] = useState(null);
  async function getData(){
    let items = await request('/api/auth/getcart', "POST", {userName: JSON.parse(localStorage.getItem("userData")).userName})
    setItems(items);
  }
  useEffect( () => {
    getData();
  }, []);


    return (
<div className="card">
  <div className="row">
    <div className="col-md-8 cart">
      <div className="title">
        <div className="row">
          <div className="col">
            <h4><b>Shopping Cart</b></h4>
          </div>
          <div className="col align-self-center text-right text-muted">{!!items && items.length} товара</div>
        </div>
      </div>
      { !!items && items.map((item, index) => (
          <div key={index} className="row border-top border-bottom">
        <div className="row main align-items-center">
        <div className="col-2"><img className="img-fluid" src={require(`../images/${item[0].image}.png`).default} /></div>
        <div className="col">
          <div className="row">{item[0].name}</div>
        </div>
        <Column/>
        <div className="col">{item[0].cost}₽ <span className="close">✕</span></div>
      </div>
    </div>
        ))}
      <div className="back-to-shop"><a href="#">←</a><span className="text-muted">Back to shop</span></div>
    </div>
    <div className="col-md-4 summary">
      <div>
        <h5><b>Summary</b></h5>
      </div>
      <hr />
      <div className="row">
        <div className="col" >ITEMS 3</div>
        <div className="col text-right">€ 132.00</div>
      </div>
      <form>
        <p>SHIPPING</p> <select>
          <option className="text-muted">Standard-Delivery- €5.00</option>
        </select>
        <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
      </form>
      <div className="row" style={{borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0'}}>
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">€ 137.00</div>
      </div> <button className="btn">CHECKOUT</button>
    </div>
  </div>
</div>

    )
}