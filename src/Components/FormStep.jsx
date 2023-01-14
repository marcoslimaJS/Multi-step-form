import React, { useState, createContext, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ContentForm from "./ContentForm";
import { validate } from "./Forms/Personal";
import { StepContenxt } from "../App";
import ThankYouForm from "./Forms/ThankYouForm";

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
  const [thankYou, setThankYou] = useState(false);

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

  const checkForm = () => {
    console.log("foiiii");
    if (currentStep === 0) {
      const validated = arrayOfValidations();
      if (validated) {
        nextStep();
      }
    } else {
      nextStep();
    }
  };

  const sendForm = (e) => {
    e.preventDefault();
    setThankYou((prev) => prev = true);
    console.log("enviado");
  };

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
            <form onSubmit={sendForm}>
              <FormContent>
                {!thankYou && (
                  <>
                    <Head>
                      <h1>{steps[currentStep].title}</h1>
                      <p>{steps[currentStep].description}</p>
                    </Head>
                    <ContentForm />
                  </>
                )}
                {thankYou && <ThankYouForm />}
              </FormContent>
              {!thankYou && (
                <ContainerButtons>
                  {currentStep < steps.length && currentStep !== 0 && (
                    <BackButton onClick={previousStep}>Go Back</BackButton>
                  )}
                  {currentStep !== steps.length - 1 ? (
                    <ButtonDefault onClick={checkForm}>Next Step</ButtonDefault>
                  ) : (
                    <ButtonConfirm>Confirm</ButtonConfirm>
                  )}
                </ContainerButtons>
              )}
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
  @media (max-width: 500px) {
    h1 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 400px) {
    p {
      max-width: 30ch;
    }
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
  @media (max-width: 500px) {
    margin: -70px 15px 80px 15px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  @media (max-width: 900px) {
    background: #fff;
    padding: 20px 30px;
  }
  @media (max-width: 500px) {
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

const ButtonDefault = styled.span`
  background: hsl(213, 96%, 18%);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Ubuntu", sans-serif;
  border: none;
  border-radius: 5px;
  padding: 15px 25px;
  transition: 0.3s ease-in-out;
  display: flex;
  margin-left: auto;
  cursor: pointer;
  :hover {
    background: #124585;
  }
  @media (max-width: 500px) {
    padding: 15px 20px;
    font-size: 0.875rem;
  }
`;

const ButtonConfirm = styled.button`
  background: hsl(243, 100%, 62%);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Ubuntu", sans-serif;
  border: none;
  border-radius: 5px;
  padding: 15px 25px;
  transition: 0.3s ease-in-out;
  display: flex;
  margin-left: auto;
  cursor: pointer;
  :hover {
    background: hsl(243.03370786516854, 84.76190476190476%, 41.17647058823529%);
  }
`;
