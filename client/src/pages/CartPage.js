import React, { useState, useEffect } from 'react';
import {useHttp} from '../hooks/http.hook'
import {Button} from 'react-bootstrap'

const Column = (props) => {
  let [quantity, setQuantity] = useState(1)
  const less = async () => {
    if (quantity != 1){
      setQuantity(quantity = quantity - 1)
      await new Promise(r => setTimeout(r, 1000));
      let arr = [];
      for ( let i = 0; i < document.getElementsByClassName("costmul").length; i++){
        arr.push(parseInt(document.getElementsByClassName("costmul")[i].textContent))
      }
      let sum = arr.reduce((a, b) => {
        return a + b;
      })
      document.getElementById("total").textContent = sum
    }
  }
  const more = async () => {
     setQuantity(quantity = quantity + 1)
     await new Promise(r => setTimeout(r, 1000));
     let arr = [];
      for ( let i = 0; i < document.getElementsByClassName("costmul").length; i++){
        arr.push(parseInt(document.getElementsByClassName("costmul")[i].textContent))
      }
      let sum = arr.reduce((a, b) => {
        return a + b;
      })
      document.getElementById("total").textContent = sum
  }

return (
   <div className="col">
      <Button onClick={less}>-</Button>
      <a href="#" id={props.number + "col"} className="border">{quantity}</a>
      <Button onClick={more}>+</Button> 
   </div>
)
}

export const CartPage = () => {
  const {request} = useHttp()
  let [items, setItems] = useState(null);
  async function getTotal(){
    await new Promise(r => setTimeout(r, 1000));
    let arr = [];
      for ( let i = 0; i < document.getElementsByClassName("costmul").length; i++){
        arr.push(parseInt(document.getElementsByClassName("costmul")[i].textContent))
      }
      let sum = arr.reduce((a, b) => {
        return a + b;
      })
      document.getElementById("total").textContent = sum
  }
  async function getData(){
    let items = await request('/api/auth/getcart', "POST", {userName: JSON.parse(localStorage.getItem("userData")).userName})
    setItems(items);
  }
  useEffect( () => {
    getData();
    if (!!document.getElementsByClassName("costmul")) {getTotal();}
    const interval = setInterval(() => {
      getData();
    }, 1000)
    return () => clearInterval(interval);
  }, [items]);


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
        <Column number={index}/>
        <div className="col"><span className="costmul">{!!document.getElementById(index + "col") && item[0].cost * document.getElementById(index + "col").textContent }</span >₽ <Button onClick={async () => {await request('/api/auth/deleteitem', "POST", {userName: JSON.parse(localStorage.getItem("userData")).userName, item: item[0].id});}} className="close">✕</Button></div>
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
        <div className="col" >ITEMS {document.getElementsByClassName("costmul").length}</div>
      </div>
      <form>
        <p>SHIPPING</p> <select>
          <option className="text-muted">Standard-Delivery- €5.00</option>
        </select>
        <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
      </form>
      <div className="row" style={{borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0'}}>
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right"><span id="total"></span>₽</div>
      </div> <button onClick={async () => {
      let arr = [];
      for ( let i = 0; i < document.getElementsByClassName("border").length; i++){
        arr.push(document.getElementsByClassName("border")[i].textContent)
      }
      await request("/api/auth/sendmail", "POST", {data: items, quantity: arr, total: document.getElementById("total").textContent, name: JSON.parse(localStorage.getItem("userData")).userName});
      }} className="btn">CHECKOUT</button>
    </div>
  </div>
</div>

    )
}