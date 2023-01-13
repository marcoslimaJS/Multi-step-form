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
export const AddOnsContext = createContext();
export const PlanContext = createContext();

const FormStep = () => {
  const { currentStep, setCurrentStep } = useContext(StepContenxt);

  // states of forms -----------------------------------------------------
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
  const [planCurrent, setPlanCurrent] = useState({
    plan: "arcade",
    price: "$9/mo",
    duration: "monthly",
  });
  const [planBilling, setPlanBilling] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // -----------------------------------------------------------------------

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
    if (currentStep !== steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const previousStep = () => {
    if (currentStep !== 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    console.log(`useEffect: ${currentStep}`);
  }, [currentStep]);

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
      <PersonalContext.Provider
        value={{
          form: personalForm,
          setForm: setPersonalForm,
          error: errorPersonal,
          setError: setErrorPersonal,
        }}
      >
        <AddOnsContext.Provider
          value={{
            selectedAddOns: selectedAddOns,
            setSelectedAddOns: setSelectedAddOns,
          }}
        >
          <PlanContext.Provider
            value={{
              planCurrent: planCurrent,
              setPlanCurrent: setPlanCurrent,
              billing: planBilling,
              setBilling: setPlanBilling,
            }}
          >
            <form onSubmit={teste}>
              <FormContent>
                <Head>
                  <h1>{steps[currentStep].title}</h1>
                  <p>{steps[currentStep].description}</p>
                </Head>
                <ContentForm />
              </FormContent>
              <ContainerButtons>
                {currentStep < steps.length && currentStep !== 0 && (
                  <BackButton onClick={previousStep}>Go Back</BackButton>
                )}
                <Button type="submit">Next Step</Button>
              </ContainerButtons>
            </form>
          </PlanContext.Provider>
        </AddOnsContext.Provider>
      </PersonalContext.Provider>
    </Container>
  );
};

export default FormStep;

const Container = styled.div`
  padding: 40px 60px;
  color: hsl(213, 96%, 18%);
  @media (max-width: 900px) {
    padding: 0px;
  }
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

const FormContent = styled.div`
  @media (max-width: 900px) {
    padding: 20px;
    background: #FFF; 
    border-radius: 10px;
    margin: -70px 30px 80px 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    background: #FFF;
    padding: 20px;
  }
`;

const BackButton = styled.span`
  background: none;
  color: hsl(231, 11%, 63%);
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Button = styled.button`
  background: hsl(213, 96%, 18%);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Ubuntu", sans-serif;
  border: none;
  border-radius: 10px;
  padding: 15px 25px;
  transition: 0.3s ease-in-out;
  display: flex;
  margin-left: auto;
  cursor: pointer;
  :hover {
    background: #124585;
  }
`;
