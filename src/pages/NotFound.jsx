import { NavBar } from "../components/NavBar";

export function NotFound(){
    return(
        <>
        <NavBar/>
        <h1 className="text-4xl text-center text-red-700">Error Page Not Found</h1>
        </>
    )
}