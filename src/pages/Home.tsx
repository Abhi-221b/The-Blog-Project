import { Banner } from "../components";
import image from '../assets/ajay-gorecha.jpg'



export default function Home() {
    
const bannerData = {
    title: "Welcome to MegaMind,",
    subtitle: "a project built with React and Appwrite to demonstrate the skills I’m currently developing. \n Explore the site, sign up to unlock more projects (you can delete your account anytime), or use dummy login details.",
    image: image,
    button: "My Projects"
}


    return (
        <div className="page-layout home-page">
            <Banner bannerData={bannerData} overlay={true} />
        </div>
    );
}
