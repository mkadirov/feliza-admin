import { createContext } from "react";

const MyContext = createContext({
    likedList: [], changeLikedList: ()=> {}, 
    basketList: [], addToBasket: () => {}
});
export default MyContext;