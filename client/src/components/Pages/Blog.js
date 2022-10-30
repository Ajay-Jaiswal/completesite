
import { NavLink } from "react-router-dom";
import React,{useEffect, useState} from "react";
 function Blog() {
  
  const [post, setPost] = useState([]);
  
  useEffect(()=>{ 
   getList();
  },[])

  function getList(){
    fetch("http://localhost:4000/blog").then((result)=>{result.json().then((resp)=>{
      setPost(resp.data)
      console.log(resp.data)
    })
  })
  }

  function selectUser(blogid){
    let token = localStorage.getItem('authortoken')
    fetch("http://localhost:4000/blogs/"+blogid,{
      method : "DELETE",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "x-api-key" : token
      }
     
    }).then((result) =>{
      result.json().then((resp) =>{
        console.warn("resp" , resp)

        if(resp.status === true){
          window.alert('Deleted' );
          console.log('Login Sucessfull '+ resp.messag );
          getList();
            
        } else{

          window.alert('Invalid data ' + resp.messag)
            console.log('invalid data', resp)
        }
      })
    })
  }
  

  



    
    
    
      
      
     
      if(post){
        return (
          <div>

          <button className="button-33"><NavLink to="Cblog">Create blog</NavLink></button>
      {
        post.map((data)=>{
            return(
                <div className="idiv">
                    <p><b>Title</b> : {data.title}</p>
                    <p><b>Body</b> : {data.body}</p>
                    <p><b>Tags</b> : {data.tags}</p>
                    <p><b>Category</b> : {data.category}</p>
                    <p><b>Subcategory</b> : {data.subcategory}</p>
                    <p><b>BlogId</b> : {data._id}</p>
                  <p><b>AuthorId</b> : {data.authorId}</p>
                    <p><b>PublishedAt</b> : {data.publishedAt}</p>
                    <button className="button-33" onClick ={()=>{selectUser(data._id)}}>Delete</button>
                    <button className="button-33"><NavLink to="/update">update</NavLink></button>
                </div>
                
            )
        })
      }
      </div>
      )
      }
      else{
        return (
          <div>
          <button className="button-33"><NavLink to="Cblog">Create blog</NavLink></button>
          
          <h1> no post</h1>
          </div>
        )
      }
      
    
}

export default Blog;

