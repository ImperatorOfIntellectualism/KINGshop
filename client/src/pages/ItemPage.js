import React, { useContext } from 'react';
import {ItemContext} from '../context/item.context';

export const ItemPage = () => {
    const item = useContext(ItemContext)
    return (
        <div>
            <h1>
                Страница авторизации ({item.id}).
            </h1>
        </div>
    )
}