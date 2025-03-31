import { Link } from "react-router-dom";

export function NavBar(){
    return(
        <nav className="h-[50px] bg-violet-500 text-white flex gap-3 items-center justify-end pr-8">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Sign In</Link>
        </nav>
    )
}