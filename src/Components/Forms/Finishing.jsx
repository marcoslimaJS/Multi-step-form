import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { StepContenxt } from "../../App";
import { AddOnsContext, PlanContext } from "../FormStep";

const Finishing = () => {
  const { planCurrent } = useContext(PlanContext);
  const { selectedAddOns } = useContext(AddOnsContext);
  const { setCurrentStep } = useContext(StepContenxt);
  const [totalValue, setTotalValue] = useState(0);

  console.log(selectedAddOns);

  const getNumbers = (string) => {
    const numbers = string.replace(/[^0-9]/g, "");
    return parseInt(numbers);
  };

  const changePlan = () => {
    setCurrentStep(prevStep => prevStep = 1)
  }

  useEffect(() => {
    const totalAddOns = selectedAddOns.reduce((accum, { price }) => {
      return (accum += getNumbers(price));
    }, 0);
    const pricePlan = getNumbers(planCurrent.price);
    setTotalValue((prevPrice) => (prevPrice = totalAddOns + pricePlan));
  }, [selectedAddOns, planCurrent]);

  return (
    <Container>
      <Products>
        <Plan>
          <div>
            <h3>
              {planCurrent.plan} ({planCurrent.duration})
            </h3>
            <p onClick={changePlan}>Change</p>
          </div>
          <span>{planCurrent.price}</span>
        </Plan>
        {selectedAddOns.map(({ name, price }) => {
          return (
            <AddOns key={name}>
              <p>{name}</p>
              <span>{price}</span>
            </AddOns>
          );
        })}
      </Products>
      <Total>
        <p>
          Total (per {planCurrent.duration === "monthly" ? "month" : "year"})
        </p>
        <span>
          ${totalValue}/{planCurrent.duration === "monthly" ? "mo" : "yr"}
        </span>
      </Total>
    </Container>
  );
};

export default Finishing;

const Container = styled.div`
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
  animation: anima 0.5s forwards;
  @keyframes anima {
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;
const Products = styled.div`
  background: hsl(217, 100%, 97%);
  padding: 20px;
  border-radius: 5px;
`;

const Plan = styled.div`
  border-bottom: 1px solid hsl(229, 24%, 87%);
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 1.2rem;
    margin-bottom: 3px;
  }
  p {
    color: hsl(231, 11%, 63%);
    text-decoration: underline;
    cursor: pointer;
  }
`;

const AddOns = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: hsl(231, 11%, 63%);
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  p {
    color: hsl(231, 11%, 63%);
  }
  span {
    color: hsl(243, 100%, 62%);
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
