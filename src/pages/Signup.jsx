import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup(){
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // function handleSubmit(e){
    //     e.preventDefault();
    //     const user = {
    //         username: username,
    //         email: email,
    //         password: password,
    //     }
    //     localStorage.setItem("user-object", JSON.stringify(user));
    //     toast.success("Your successfully Registered");
    //     document.getElementById("form").reset();
    //     navigate("/login");
    // }

    async function handleSubmit(ev){
        try {
            ev.preventDefault();
            setLoading(true);
            await axios.post("http://localhost:3002/register", {
                username: Username,
                email: Email,
                password: Password
            });
            toast.success("Registration successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-blue-400">
            <form 
            id="form"
            className="max-w-lg bg-white p-4 rounded-lg"
            onSubmit={(ev)=>handleSubmit(ev)}
            >
                <h2 className="w-full text-center text-lg">Sign Up</h2>
                <div className="mb-2 w-full">
                    <input 
                    type="text"
                    className="w-full border px-2"
                    placeholder="username"
                    required
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-2 w-full">
                    <input 
                    type="email"
                    className="w-full border px-2"
                    placeholder="Email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2 w-full">
                    <input 
                    type="password"
                    className="w-full border px-2"
                    placeholder="Password"
                    required
                    onChange={(event)=>setPassword(event.target.value)}
                    />
                </div>
                <button 
                type="submit"
                disabled={loading}
                className="w-full px-3 rounded bg-blue-500 text-white mt-1.5"
                >
                    {loading? "Loading...": "Sing Up"}
                </button>
            </form>
        </div>
    )
}