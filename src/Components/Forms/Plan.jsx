import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArcadeSVG from "../Svgs/ArcadeSvg";
import AdvancedSVG from "../Svgs/AdvancedSvg";
import ProSVG from "../Svgs/ProSvg";
import SwitchButton from "../SwitchButton";
import { PlanContext } from "../FormStep";

const planData = [
  {
    name: "arcade",
    price: {
      monthly: "$9/mo",
      yearly: "$90/yr",
    },
    SVG: ArcadeSVG,
  },
  {
    name: "advanced",
    price: {
      monthly: "$12/mo",
      yearly: "$120/yr",
    },
    SVG: AdvancedSVG,
  },
  {
    name: "pro",
    price: {
      monthly: "$15/mo",
      yearly: "$150/yr",
    },
    SVG: ProSVG,
  },
];

const Plan = () => {
  const { planCurrent, setPlanCurrent, billing, setBilling } = useContext(PlanContext);
  const planOptionsInput = useRef({});

  const handlePlan = (value, price) => {
    const duration = billing ? 'yearly' : 'monthly';
    setPlanCurrent({ plan: value, price, duration });
  }

  const handleChange = ({ target }) => {
    const { value, dataset } = target;
    handlePlan(value, dataset.price)
  };
  console.log(planCurrent)
  
  useEffect(() => {
    const {value, dataset} = planOptionsInput.current[planCurrent.plan]
    handlePlan(value, dataset.price)
  }, [billing])

  return (
    <Container>
      <ul>
        {planData.map(({ name, SVG, price: { monthly, yearly } }) => {
          return (
            <PlanRadio key={name}>
              <InputRadio
                type="radio"
                id={name}
                name="plan"
                value={name}
                checked={planCurrent.plan === name}
                onChange={handleChange}
                data-price={billing ? yearly : monthly}
                ref={(el) => {planOptionsInput.current[name] = el}}
              />
              <PlanLabel htmlFor={name}>
                <SVG />
                <div>
                  <h3>{name}</h3>
                  <span>{billing ? yearly : monthly}</span>
                  {billing && <FreeMonth>2 months free</FreeMonth>}
                </div>
              </PlanLabel>
            </PlanRadio>
          );
        })}
      </ul>
      <BillingContainer>
        <span>Monthly</span>
        <SwitchButton value={billing} setValue={setBilling} />
        <span>Yearly</span>
      </BillingContainer>
    </Container>
  );
};

export default Plan;

const PlanLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border: 1px solid hsl(231, 11%, 63%);
  border-radius: 5px;
  min-width: 140px;
  h3 {
    font-size: 1rem;
    margin-bottom: 3px;
    text-transform: capitalize;
  }
  span {
    font-size: 0.875rem;
    color: hsl(231, 11%, 63%);
  }
`;

const InputRadio = styled.input`
  padding: 30px;
  display: none;
`;
const PlanRadio = styled.div`
  min-height: 170px;
  input[type="radio"]:checked + label {
    border-color: hsl(213, 96%, 18%);
    background: hsl(217, 100%, 97%);
  }
`;

const FreeMonth = styled.p`
  font-size: 0.79rem;
  margin-top: 5px;
`;

const Container = styled.div`
  opacity: 0;
  transform: translate3d(-30px, 0 , 0);
  animation: anima 0.5s forwards;
  @keyframes anima {
    to {
      opacity: 1;
      transform: translate3d(0, 0 , 0);
    }
  }
  ul {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const BillingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background: hsl(217, 100%, 97%);
  padding: 10px;
  border-radius: 10px;
  span {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;
