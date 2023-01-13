import { createContext, useState } from "react";
import styled from "styled-components";
import FormStep from "./Components/FormStep";
import Sidebar from "./Components/Sidebar";
import GlobalStyle from './styles/Global';

export const StepContenxt = createContext();

export function App() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Container>
      <GlobalStyle />
      <StepContenxt.Provider value={{currentStep: currentStep, setCurrentStep: setCurrentStep}}>
        <Sidebar />
        <FormStep />
      </StepContenxt.Provider>
    </Container>
  );
}


const Container = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    margin: 0px;
    padding: 0px;
    background: none;
  }
`