import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "./../Header/Header";

export const Container = (props) => {
  return (
    <div className="bg-bluegray-300">
      <Header />
      <div >
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
