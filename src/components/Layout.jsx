import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export function Layout(props){
    return(
        <div className="min-h-screen flex flex-col">
            <NavBar/>
            <div className="flex-1">
            {props.children}
            </div>
            <Footer/>
        </div>
    )
}