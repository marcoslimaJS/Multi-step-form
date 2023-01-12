import React, { useContext, useState } from "react";
import { Container, ListItem, ListNumber } from "./MeneuStyle";
import { StepContenxt } from "../App";

const items = [
  {
    text: "Your Info",
  },
  {
    text: "Select Plain",
  },
  {
    text: "Add-ons",
  },
  {
    text: "Summary",
  },
];

const MenuList = () => {
  const { currentStep } = useContext(StepContenxt)

  return (
    <Container>
      {items.map(({ text }, index) => {
        return (
          <ListItem key={index}>
            <div>
              <ListNumber active={currentStep} index={index}>
                {index + 1}
              </ListNumber>
            </div>
            <div>
              <p>Step {index + 1}</p>
              <h3>{text}</h3>
            </div>
          </ListItem>
        );
      })}
    </Container>
  );
};

export default MenuList;
