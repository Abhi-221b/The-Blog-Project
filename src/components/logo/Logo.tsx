import { Link } from "react-router";
import logo from '../../assets/MyLogo.svg'

export interface LogoProps {
    width?: number;
}

export default function Logo({ width = 120 }: LogoProps) {

    return (
        <Link to="/"><img src={logo} alt="myBlog" style={{ width: `${width}px` }} /></Link>
    );
}
