import { Container, Logo, SocialShare } from "../index";
import { Link } from "react-router";


export function Footer() {

    const navItem1 = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About Me",
            path: "/about"
        },
        {
            name: "Projects",
            path: "/projects"
        },
        {
            name: "Skills",
            path: "/skills"
        },
        {
            name: "Blog",
            path: "/blog"
        },
        {
            name: "Contact",
            path: "/contact"
        }

    ]

    const navItem2 = [
        {
            name: "Blog",
            path: "/blog"
        },
        {
            name: "Career",
            path: "/career"
        },
        {
            name: "Projects",
            path: "/projects"
        },
        {
            name: "GitHub",
            path: "/GitHub"
        }

    ]

    return (
        <>
            <footer>
                <div className='footer_wrapper py-10 md:py-20 bg-[#010101]'>
                    <Container >
                        <div className='flex flex-wrap md:flex-nowrap md:gap-4'>
                            <div className="w-full md:w-[35%] ">
                                <div className="max-w-[180px] mb-5 md:max-w-[255px]">
                                    <Logo width={250} />
                                </div>
                            </div>
                            <div className="w-full md:w-[20%] ">
                                <h6 className="text-white">Explore</h6>
                                <ul>
                                    {navItem1.map((item) => (
                                        <li key={item.name} className="text-[#ffffffb2] pb-2 hover:text-white">
                                            <Link to={item.path} > {item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full md:w-[20%]">
                                <h6 className="text-white">Connect</h6>
                                <ul>
                                    {navItem2.map((item) => (
                                        <li key={item.name} className="text-[#ffffffb2] pb-2 hover:text-white">
                                            <Link to={item.path} > {item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full md:w-[25%]">
                                <h6 className="text-white">About MegaMind</h6>
                                <p className="text-[#ffffffb2]">MegaMind is a personal learning sandbox using React, Appwrite for login/sign-up, and real API experiments.</p>
                                <SocialShare />
                            </div>
                        </div>
                    </Container>
                </div>
            </footer>
        </>

    );
}

export default Footer
