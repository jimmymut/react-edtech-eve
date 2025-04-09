import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmittng] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        try {
            e.preventDefault();
            setSubmittng(true);
            const res = await axios.post("http://localhost:3002/login", {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            localStorage
            .setItem("user-date", JSON.stringify(res.data.userData));
            toast.success("Login is successful");
            navigate("/dashboard", {replace: true});
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setSubmittng(false)
        }
    }
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-blue-400">
            <form 
            id="form"
            className="max-w-lg bg-white p-4 rounded-lg"
            onSubmit={(ev)=>handleSubmit(ev)}
            >
                <h2 className="w-full text-center text-lg">Login</h2>
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
                disabled={submitting}
                className="w-full px-3 rounded bg-blue-500 text-white mt-1.5 cursor-pointer"
                >{submitting?"Processing...": "Sign In"}</button>
            </form>
        </div>
    )
}