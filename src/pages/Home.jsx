import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";

export function Home(){
    return(
        <Layout>
            <h1 className="text-4xl text-center">This is Home</h1>
            <Button btnClass="px-3 py-1 bg-blue-500 ml-5 rounded text-white" message="Submit"/>
            <Button btnClass="px-3 py-1 bg-cyan-500 ml-5 rounded text-white" message="Click Me"/>
            <Button btnClass="px-3 py-1 bg-pink-500 ml-5 rounded text-white" message="Register"/>
        </Layout>
    )
}