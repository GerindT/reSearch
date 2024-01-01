import MainNavbar from "../components/MainNavbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import MainFooter from "../components/MainFooter";

export const UserContext = createContext(null);
export const SetUserContext = createContext(null);

function Landing() {
  const [initLoad, setInitLoad] = useState(false);
  const [posts, setPosts] = useState("");
  const [user, setUser] = useState(null);

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  useEffect(() => {
    // Fetch user data with credentials
    fetch(apiUrl + "/index.php", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.loggedIn == true) {
          setUser(data.user);
        } else setUser(null);
      });
    // Fetch posts with credentials
    fetch(apiUrl + "/posts.php", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((p) => {
          if (p.Categories !== null) {
            p.Categories = JSON.parse(p.Categories);
          }
        });

        setPosts(data);
        setInitLoad(true);
      });
  }, []);

  return (
    <>
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <MainNavbar posts={posts} setPosts={setPosts} />
          {initLoad ? (
            <>
              <Outlet context={[posts, setPosts]} />
            </>
          ) : (
            <div className="flex flex-row justify-center">
              <div className="h-[77vh] flex flex-col justify-center self-center w-[50vh]">
                <p className="font-thin text-xs text-gray-500 text-center mr-[4em]">
                  The papers are loading. Please wait.😊
                </p>
                <img src="/giphy.gif" alt="coffe crying" />
              </div>
            </div>
          )}
          <MainFooter />
        </UserContext.Provider>
      </SetUserContext.Provider>
    </>
  );
}

export default Landing;
