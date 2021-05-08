import React, { useState } from 'react';
import {useHttp} from '../hooks/http.hook';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import {ItemContext} from '../context/item.context'
import { ItemPage } from './ItemPage';

export const MainPage = () => {
    const {request} = useHttp();
    let [chosen, setChosen] = useState(0);
    if (chosen == 0) return (
        <div>
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
