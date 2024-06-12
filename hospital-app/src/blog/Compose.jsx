import React, {useState} from "react";
import axios from "axios";
import './blog.css';
const Compose =()=>{
    const [postTitle, setPostTitle] = useState('');
    const[postBody, setPostBody] = useState('');
 return (
    <div className="Container">
         <h1>Compose</h1>
         <form className="form" >
            <div className="form-grp">
                <label>Title</label>
                <input 
                    className="form-control"
                    type="text"
                    name="postTitle"
                    value ={postTitle}
                    onChange={(e)=>setPostTitle(e.target.value)}
                />
                <label>Compose</label>
                <textarea
                        className="form-control"
                        name="postBody"
                        rows="5"
                        cols="30"
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                    />
                        <button size={"large "} 
                    onClick={async() => {
                       
                        await axios.post("http://localhost:3000/blog/compose",{
                            //left is backend var : frontvar
                            title: postTitle,
                            content: postBody
                            
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Post added!");
                    }}

                >Post</button>
            </div>
         </form>
    </div>
 )
}

export default Compose;