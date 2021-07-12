import React, { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/item.context";
import { useHttp } from "../hooks/http.hook";

export const ItemPage = () => {
  const {request} = useHttp()
  const info = useContext(ItemContext);
  let [item, setItem] = useState(null);
  let [show, setShow] = useState(true);
  async function getCart() {
    if (!!localStorage.getItem("userData")){
      let item = await request("/api/auth/getitem", 
      "POST",
      {name: info.name}
    )
    setItem(item);
      let cart = await request('/api/auth/getcartid', "POST", {userName: JSON.parse(localStorage.getItem("userData")).userName})
      cart = Object.values(cart)
      const arr = []
      for (let i = 0;i < cart.length;i++ ){
        arr.push(cart[i])
      }
      if (arr.includes(item.id)){
        setShow(false)
    }
    else setShow(true)
  }
  }
  useEffect(() => {
    getCart();
  }, [info]);
  async function buy () {
    setShow(false)
    await request("/api/auth/buy", 
      "POST", {userName: JSON.parse(localStorage.getItem("userData")).userName, id: item.id}
    )
  }
  if (item != null) {
    return (
      <div className="container py-4 my-4 mx-auto d-flex flex-column">
        <div className="header">
          <div className="row r1">
            <div className="col-md-9 abc">
              <h1>{item.name}</h1>
            </div>
          </div>
        </div>
        <div className="container-body mt-4">
          <div className="row r3">
            <div className="col-md-5 p-0 klo">
              <div className="product-card-top__buy" data-avails-as-tile="">
                <div className="product-buy product-buy_one-line">
                  <div className="product-buy__price-wrap product-buy__price-wrap_interactive">
                    <div className="product-buy__price">{item.cost} ₽</div>
                    <div className="product-buy__hint"></div>
                    <div className="product-buy__sub">от 975 ₽/ мес.</div>
                  </div>
                  {!!document.getElementById("username") && show &&<button className="button-ui buy-btn button-ui_brand button-ui_passive" onClick={buy}>
                    Купить
                  </button>}
                </div>
                <div data-multicard-placeholder=""></div>
                <span
                  id="as-uWJR2H"
                  className="product-card-top__avails avails-container avails-container_tile"
                >
                  <div className="order-avail-wrap">
                    <span className="available">В магазинах: </span>
                    <a href="!"
                      className="order-avail-wrap__link ui-link ui-link_blue ui-link_pseudolink"
                    >
                      <span>11 мая (ВТ)</span>
                    </a>
                  </div>
                  <div
                    className="delivery-info-widget inited"
                  >
                    <span className="delivery-info-widget__text">
                      Доставим на дом:{" "}
                    </span>
                    <a href="!" className="delivery-info-widget__button ui-link ui-link_blue ui-link_pseudolink">
                      11 мая (ВТ)
                    </a>
                  </div>
                </span>
              </div>
            </div>
            <div className="col-md-7">
              {" "}
              <img
                src={require(`../images/${item.image}.png`).default}
                alt=""
                width="90%"
                height="95%"
              />{" "}
            </div>
          </div>
        </div>
        <div className="footer d-flex flex-column mt-5"></div>
        <div className="product-card-top__code">
          Код товара: {item.id}
        </div>
      </div>
    );
  } else return <div></div>;
};
/*id: ({item.id}).
                    name: ({item.name}).
                    cost: ({item.cost})
                    quantity: ({item.quantity})
                    description: ({item.description})
                    image: ({item.image})*/
