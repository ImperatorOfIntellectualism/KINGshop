import { createContext } from "react";

function noop() {

}

export const ItemContext = createContext ({
    id: null,
    name: null,
    cost: null,
    quantity: null,
    description: null,
    image: null
})