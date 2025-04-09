import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DeletePost } from "../components/DeletePost";
import { AddPostModal } from "../components/AddPostModal";
import { EditPostModel } from "../components/EditPostModal";
import { Navigate } from "react-router-dom";

export function Users(){
    const [users, setUsers]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get("http://localhost:3002/users",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            setUsers(res.data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>setLoading(false));
    },[]);

    // if(!localStorage.getItem("token")){
    //     return <Navigate to="/" replace/>
    // }
    return(
        <div className="m-8">
            {
            loading?<p>Loading...</p> :
           <div className="w-full h-full">
             <table className="border border-collapse p-5">
                <thead>
                    <tr>
                        <th align="center" className="border">ID</th>
                        <th align="center" className="border">Username</th>
                        <th align="center" className="border">Email</th>
                        <th align="center" className="border">Joined</th>
                        <th align="center" className="border w-[70px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>(
                            <tr key={user.id}>
                                <td align="center" className="border">{user.id}</td>
                                <td align="center" className="border">{user.username}</td>
                                <td align="center" className="border">{user.email}</td>
                                <td align="center" className="border">{new Date(user.createdAt).toDateString()}</td>
                                <td align="center" className="border">
                                    {/* <EditPostModel posts={posts} setPosts={setPosts} post={pst}/>
                                <DeletePost id={pst.id} posts={posts} setPosts={setPosts} /> */}
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