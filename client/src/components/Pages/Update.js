import React,{useEffect, useState} from 'react'
import pic from "./image/superman.gif"
import "../../App.css"



function Update() {
    const [post, setPost] = useState([]);
    
    const[blogId,setBlogId] = useState('')
    const[title,setTitle] = useState('')
    const[body,setBody] = useState('')
    const[authorId,setAuthorid] = useState('')
    const[tags,setTags] = useState([])
    const[category,setCategory] = useState('')
    const[subcategory,setSubcategory] = useState([])
    const[isPublished,setIspublished] = useState('')

    
  
    useEffect(()=>{ 
     getList();
    },[])
  
    function getList(){
      fetch("http://localhost:4000/blog").then((result)=>{result.json().then((resp)=>{
        setPost(resp.data)
        console.log(resp.data)
        setTitle(resp.data[0].title)
        setBody(resp.data[0].body)
        setAuthorid(resp.data[0].authorId)
        setTags(resp.data[0].tags)
        setCategory(resp.data[0].category)
        setSubcategory(resp.data[0].subcategory)
        setIspublished(resp.data[0].isPublished)
      })
    })
    }

   

    function Update(){
      
      let data  = {blogId ,title ,body, authorId, tags, category, subcategory, isPublished}
      console.warn(blogId, title ,body, authorId, tags, category, subcategory, isPublished)
  
      let token = localStorage.getItem('authortoken')
      console.log("cblog" , token)
      console.log("data", data)
  
      fetch("http://localhost:4000/blogs/"+blogId,{
        method : "PUT",
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
            window.alert(resp.message );
            console.log( resp.message );
            
              
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
        BlogId :  
           <input type="text"  value={blogId} onChange={(e) => setBlogId(e.target.value) } name="title"/>
        </label><br></br>

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
           <input type="text" name="tags" value = {tags} onChange={(e)=>{setTags(e.target.value)}} />
        </label><br></br>

        <label>
        Category :  
           <input type="text" name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        </label><br></br>

        <label>
        Subcategory :  
           <input type="text" name="subcategory" value={subcategory} onChange={(e)=>{setSubcategory(e.target.value)}} />
        </label><br></br>

        <label>
        isPublished :  
           <input type="text" name="isPublished" value={isPublished} onChange={(e)=>{setIspublished(e.target.value)}} />
        </label><br></br>

        <button className="button-33" type="button" onClick={Update} >Update</button>
      </form>
      </div>
      
    </div>
  );
}

export default Update