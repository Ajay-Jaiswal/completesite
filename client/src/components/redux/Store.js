import {createStore} from "redux"
import combineReducers from "./RootReducer"


const data = () =>{
    return 100
}
const store = createStore(combineReducers)

export default store;