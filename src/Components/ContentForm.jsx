import React, { useContext } from "react";
import styled from "styled-components";
import Personal from "./Forms/Personal";
import Plan from "./Forms/Plan";
import AddOns from "./Forms/AddOns";
import Finishing from "./Forms/Finishing";
import { StepContenxt } from "../App";

const ContentForm = () => {
  const { currentStep, setCurrentStep } = useContext(StepContenxt);

  const showCurrentContent = () => {
    switch (currentStep) {
      case 0:
        return <Personal />;
      case 1:
        return <Plan />;
      case 2:
        return <AddOns />;
      case 3:
        return <Finishing />;
      default:
        return <Personal />;
    }
  };

  return <Container>{showCurrentContent()}</Container>;
};

export default ContentForm;

const Container = styled.div`
  min-height: 300px;
  margin-bottom: 40px;
  @media (max-width: 900px) {
    min-height: 0px;
    margin-bottom: 0px;
  }
`;

