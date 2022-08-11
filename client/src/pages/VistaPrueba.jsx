import React, { useState, CSSProperties } from "react";
import { Container } from "../Components/Container/Container";

import {
  SpinnerDotted
} from "spinners-react";


export const VistaPrueba = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <Container>
      <SpinnerDotted
        size={200}
        thickness={80}
        color={"#38ad48"}
        speed={60}
      />
    </Container>
  );
};
