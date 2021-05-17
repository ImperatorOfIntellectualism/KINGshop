import React, { useState } from 'react';
import {ItemContext} from '../context/item.context'
import { ItemPage } from './ItemPage';

export const MainPage = () => {
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
        <ItemPage bro="15"/>
        </ItemContext.Provider>
      </div>
  )
}