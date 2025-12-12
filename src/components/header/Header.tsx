import { forwardRef } from "react";
import { Container, Logo, Button } from "../index";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/loginSlice";
import appAuth from "../../appwrite/auth";

const Header = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const { isLoggedIn } = useAppSelector((state) => state.loginStatus);
    const dispatch = useAppDispatch();

    const authenticated = isLoggedIn;

    const handleLogout = () => {
      appAuth.logout().then(() => dispatch(logout()));
    };

    let navigate = useNavigate();

    const headerNav = [
      {
        name: "Home",
        path: "/",
        active: true,
      },
      {
        name: "About Me",
        path: "/about",
        active: true,
      },
      {
        name: "Projects",
        path: "/projects",
        active: authenticated,
      },
      {
        name: "Skills",
        path: "/skills",
        active: authenticated,
      },
      {
        name: "Blog",
        path: "/blog",
        active: authenticated,
      },
      {
        name: "Contact",
        path: "/contact",
        active: true,
      },
    ];

    return (
      <>
        <header {...props}>
          <div
            ref={ref}
            className="header_wrapper bg-transparent backdrop-blur-md fixed w-full left-0 top-0 z-50"
          >
            <Container>
              <div className="flex gap-5 justify-between items-center py-4">
                <div className="w-1/4">
                  <Logo width={200} />
                </div>
                <nav className="navigation flex items-center justify-between grow">
                  <ul className="flex items-center">
                    {headerNav.map((navItem) =>
                      navItem.active ? (
                        <li key={navItem.name}>
                          <Link
                            to={navItem.path}
                            className="text-[#ffffffb2] hover:text-white inline-block py-3 px-5 leading-none"
                          >
                            {navItem.name}
                          </Link>
                        </li>
                      ) : null
                    )}
                  </ul>

                  <ul className="flex items-center">
                    {!authenticated && (
                      <>
                        <li className="mr-5">
                          <button
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Log In
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigate("/signup");
                            }}
                          >
                            Sign Up
                          </button>
                        </li>
                      </>
                    )}

                    {authenticated && (
                      <li>
                        <Button onClick={handleLogout}>Logout</Button>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </Container>
          </div>
        </header>
      </>
    );
  }
);

export default Header;
