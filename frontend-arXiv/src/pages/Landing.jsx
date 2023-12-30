import MainNavbar from "../components/MainNavbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import MainFooter from "../components/MainFooter";

function Landing() {
  const [initLoad, setInitLoad] = useState(false);

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
  const [posts, setPosts] = useState("");
  useEffect(() => {
    fetch(apiUrl + "/posts.php")
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
    </>
  );
}

export default Landing;
