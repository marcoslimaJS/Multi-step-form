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
  height: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding: 20px;
  background: #FFF;
  display: grid;
  grid-template-columns: 1fr 2fr;
`