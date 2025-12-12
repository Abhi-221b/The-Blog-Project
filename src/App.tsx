import { useRef, useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { Outlet } from "react-router";
import { useAppDispatch } from "./store/hooks";
import appAuth from "./appwrite/auth";
import { checkLogin, logout } from "./store/loginSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appAuth
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(checkLogin(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const headerElement = useRef<HTMLDivElement>(null);
  const [headerHeight, setheaderHeight] = useState<number>(80);

  useEffect(() => {
    if (headerElement.current) {
      setheaderHeight(headerElement.current.offsetHeight);
    }
  }, []);

  return !loading ? (
    <>
      <div
        className="body-wrapper"
        style={{ paddingTop: `${headerHeight + 20}px` }}
      >
        <Header ref={headerElement}></Header>
        <main>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </>
  ) : null;
}

export default App;
