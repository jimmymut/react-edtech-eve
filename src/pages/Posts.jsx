import axios from "axios";
import { useEffect, useState } from "react";

export function Posts(){
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>{
            console.log(res.data);
            setPosts(res.data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>setLoading(false));
    },[]);
    return(
        <div className="m-8">
            {
            loading?<p>Loading...</p> :
            <ol>
                {posts.map((pst, index)=>(
                    <li className="" key={pst.id}>
                        <h1 className="font-bold text-md">{pst.title}</h1>
                        <p>{pst.body}</p>
                    </li>
                ))}
            </ol>
            }
        </div>
    )
}