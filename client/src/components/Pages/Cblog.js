import React,{useState} from "react";
import { useHistory} from "react-router-dom";
import pic from "./image/superman.gif"

 const Cblog = () => {

  const history = useHistory();
  const[title,setTitle] = useState('')
  const[body,setBody] = useState('')
  const[authorId,setAuthorid] = useState('')
  const[tags,setTags] = useState([''])
  const[category,setCategory] = useState('')
  const[subcategory,setSubcategory] = useState([''])
  const[isPublished,setIspublished] = useState('')
  
  console.warn( title ,body, authorId, tags, category, subcategory, isPublished)

  function Saveuser(e){
    e.preventDefault();
    let data  = {title ,body, authorId, tags, category, subcategory, isPublished}
    console.warn( title ,body, authorId, tags, category, subcategory, isPublished)

    let token = localStorage.getItem('authortoken')
    console.log("cblog" , token)
    console.log("data", data)

    fetch("http://localhost:4000/blogs",{
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "x-api-key" : token
      },
      body : JSON.stringify(data)
    }).then((result) =>{
      result.json().then((resp) =>{
        console.warn("resp" , resp)

        if(resp.status === true){
          window.alert( resp.message );
          console.log(resp.message );
          history.push("/blog")
            
        } else{

          window.alert( resp.message)
            console.log('invalid data', resp)
        }
      })
    })
    
  }


  return (
    <div className="form">
      <div className="div1"><img src={pic} /></div>
      <div className="div2">
      <form >
        <label>
        title :  
           <input type="text"  value={title} onChange={(e) => setTitle(e.target.value) } name="title"/>
        </label><br></br>

        <label>
        Body :  
           <textarea type="text" name="body" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        </label><br></br>

        <label>
        AuthorId :  
           <input type="text" name="authorId" value={authorId} onChange={(e)=>{setAuthorid(e.target.value)}} />
        </label><br></br>

        <label>
        Tags :  
           <input type="text" name="tags" value = {tags} onChange={(e)=>{setTags([e.target.value])}} />
        </label><br></br>

        <label>
        Category :  
           <input type="text" name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        </label><br></br>

        <label>
        Subcategory :  
           <input type="text" name="subcategory" value={subcategory} onChange={(e)=>{setSubcategory([e.target.value])}} />
        </label><br></br>

        <label>
        isPublished :  
        <select value={isPublished}  onChange={(e)=>{setIspublished(e.target.value)}} >
        <option>select</option>
        <option>false</option>
        <option>true</option>
        </select>
          
        </label><br></br>

        <button type="button" className="button-33" onClick={Saveuser}>Create Blog</button>
      </form>
      </div>
      
    </div>
  );
}

export default Cblog;
