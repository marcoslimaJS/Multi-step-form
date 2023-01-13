import React, { useState, createContext, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ContentForm from "./ContentForm";
import { validate } from "./Forms/Personal";
import { StepContenxt } from "../App";

const steps = [
  {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
    id: "PERSONAL",
  },
  {
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    id: "PLAN",
  },
  {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    id: "ADD-ONS",
  },
  {
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    id: "FINISH",
  },
];

export const PersonalContext = createContext();

const FormStep = () => {
  const { currentStep, setCurrentStep } = useContext(StepContenxt);

  const [personalForm, setPersonalForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errorPersonal, setErrorPersonal] = useState({
    name: null,
    email: null,
    phone: null,
  });

  const arrayOfValidations = () => {
    const results = [];
    for (let type in personalForm) {
      results.push(
        validate({ type, value: personalForm[type] }, setErrorPersonal)
      );
    }
    return results.every((result) => result === true);
  };

  const nextStep = () => {
    if(currentStep !== steps.length - 1)  {
      setCurrentStep(step => step + 1)
    }
  };

  const previousStep = () => {
    console.log(currentStep)
    if(currentStep !== 0)  {
      console.log('foi')
      setCurrentStep(step => step - 1)
    }
    console.log(currentStep)
  };
  

  useEffect(() => {
    console.log(`useEffect: ${currentStep}`)
  },[currentStep])

  function teste(e) {
    e.preventDefault();
    if (currentStep === 0) {
      const validated = arrayOfValidations();
      if (validated) {
        nextStep();
      }
    } else {
      nextStep();
    }
  }

  return (
    <Container>
      <Head>
        <h1>{steps[currentStep].title}</h1>
        <p>{steps[currentStep].description}</p>
      </Head>
      <PersonalContext.Provider
        value={{
          form: personalForm,
          setForm: setPersonalForm,
          error: errorPersonal,
          setError: setErrorPersonal,
        }}
      >
        <form onSubmit={teste}>
          <ContentForm />
          <ContainerButtons>
            {currentStep < steps.length - 1 && currentStep !== 0 &&(
              <BackButton onClick={previousStep}>Go Back</BackButton>
            )}
            <Button type="submit">Next Step</Button>
          </ContainerButtons>
        </form>
      </PersonalContext.Provider>
    </Container>
  );
};

export default FormStep;

const Container = styled.div`
  padding: 40px 60px;
  color: hsl(213, 96%, 18%);
`;

const Head = styled.div`
  margin-bottom: 40px;
  h1 {
    margin-bottom: 10px;
  }
  p {
    color: hsl(231, 11%, 63%);
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  color: hsl(231, 11%, 63%);
  border: none;
  font-size: 1rem;
  font-weight: 600;
`

const Button = styled.button`
  background: hsl(213, 96%, 18%);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Ubuntu", sans-serif;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  transition: 0.3s ease-in-out;
  display: flex;
  margin-left: auto;
  :hover {
    background: #124585;
  }
`;
