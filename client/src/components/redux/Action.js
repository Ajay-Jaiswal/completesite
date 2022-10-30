

 const addData = (data) =>{
    console.warn("action called" , data)

    return {
        type : "ADD_DATA",
            data : data
       
    }
}

export default addData;