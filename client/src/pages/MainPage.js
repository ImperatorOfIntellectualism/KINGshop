import React, { useState } from 'react';
import {useHttp} from '../hooks/http.hook';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import {ItemContext} from '../context/item.context'
import { ItemPage } from './ItemPage';

export const MainPage = () => {
    const {request} = useHttp();
    const id = 1;
    let [chosen, setChosen] = useState(0);
    const itemFinder = async () => {
        try {
          const data = await request('/api/auth/getitems', 'POST')
        } catch (error) {
          
        }
      }
    if (chosen == 0) return (
        <div>
        <div><button onClick={itemFinder}>find</button></div>{/*Выдаёт данные из БД товаров*/}
        <form>
        <input type="text" id="itemId"></input>
        <input type="button" onClick={() => setChosen(chosen = parseInt(document.getElementById('itemId').value) )}></input>
        </form>
        </div>
    )
    if (chosen > 0) return (
      <div>
      <ItemContext.Provider value={{id: chosen}}>
        <ItemPage/>
        </ItemContext.Provider>
      </div>
  )
}
