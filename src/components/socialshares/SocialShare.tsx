import { Link } from "react-router";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";




export default function SocialShare() {


    return (
        <>
            <div className="flex flex-wrap gap-3 items-center justify-start">
                <Link to="/">
                    <FaGithubSquare className="text-[#ffffffb2] hover:text-white w-6 h-6" />
                </Link>
                <Link to="/">
                    <FaLinkedin className="text-[#ffffffb2] hover:text-white w-6 h-6" />
                </Link>
                <Link to="/">
                    <BiLogoGmail className="text-[#ffffffb2] hover:text-white w-6 h-6" />
                </Link>
                <Link to="/">
                    <FaXTwitter className="text-[#ffffffb2] hover:text-white w-6 h-6" />
                </Link>
            </div>
        </>
    );
}
