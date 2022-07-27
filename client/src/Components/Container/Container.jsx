import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "./../Header/Header";

export const Container = (props) => {
  return (
    <div className="surface-ground">
      <Header />
        {props.children}
      <Footer />
    </div>
  );
};
