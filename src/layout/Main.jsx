// from react router
import { Outlet, useLoaderData } from "react-router-dom";

// internal functions, images and componenets
import { fetchData } from "../helper/helper";
import wave from "../images/wave.svg";
import Nav from "../componenet/Nav";

// function to load data, stored in local storage
export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <>
      <div className="layout">
        <Nav userName={userName} />
        <main>
          <Outlet />
        </main>
        <img src={wave} alt="footer" />
      </div>
    </>
  );
};

export default Main;
