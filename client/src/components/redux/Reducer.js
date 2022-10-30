
 const reducerData = (data = [], action) => {
    if (action.type === "ADD_DATA"){
        console.warn( action)
        return  data
    }else {
        return "no action called"
    }
}
export default reducerData