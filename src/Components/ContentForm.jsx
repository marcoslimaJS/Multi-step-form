import React, { useContext } from "react";
import styled from "styled-components";
import Personal from "./Forms/Personal";
import Plan from "./Forms/Plan";
import AddOns from "./Forms/AddOns";
import { StepContenxt } from "../App";


const ContentForm = () => {
  const { currentStep, setCurrentStep } = useContext(StepContenxt);

  const showCurrentContent = () => {
    switch (currentStep) {
      case 0:
        return <Personal />
      case 1: 
        return <Plan />
      case 2: 
        return <AddOns />
      default: 
      return <Personal />
    }
  }


  return (
    <Container>
      {showCurrentContent()}
    </Container>
  );
};

export default ContentForm;

const Container = styled.div`
  min-height: 266px;
  margin-bottom: 40px;
`