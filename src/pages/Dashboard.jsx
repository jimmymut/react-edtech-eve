import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DeletePost } from "../components/DeletePost";
import { AddPostModal } from "../components/AddPostModal";
import { EditPostModel } from "../components/EditPostModal";

export function Dashboard(){
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
           <div className="w-full h-full">
            <AddPostModal posts={posts} setPosts={setPosts}/>
             <table className="border border-collapse p-5">
                <thead>
                    <tr>
                        <th align="center" className="border">ID</th>
                        <th align="center" className="border w-[70px]">User ID</th>
                        <th align="center" className="border">Title</th>
                        <th align="center" className="border">Description</th>
                        <th align="center" className="border w-[70px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((pst)=>(
                            <tr key={pst.id}>
                                <td align="center" className="border">{pst.id}</td>
                                <td align="center" className="border">{pst.userId}</td>
                                <td align="center" className="border">{pst.title.substring(0, 50)}</td>
                                <td align="center" className="border">{pst.body.substring(0, 20)+"..."}</td>
                                <td align="center" className="border">
                                    <EditPostModel posts={posts} setPosts={setPosts} post={pst}/>
                                <DeletePost id={pst.id} posts={posts} setPosts={setPosts} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           </div>
            }
        </div>
    )
}