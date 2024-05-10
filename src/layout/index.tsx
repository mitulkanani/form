import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

type IMainProps = {
  children: ReactNode;
};

const Layout = (props: IMainProps) => {
  return (
    <>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />

        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
