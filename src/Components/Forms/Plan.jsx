import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArcadeSVG from "../Svgs/ArcadeSvg";
import AdvancedSVG from "../Svgs/AdvancedSvg";
import ProSVG from "../Svgs/ProSvg";
import SwitchButton from "../SwitchButton";

const planData = [
  {
    title: "Arcade",
    price: {
      monthly: "$9/mo",
      yearly: "$90/yr",
    },
    SVG: ArcadeSVG,
  },
  {
    title: "Advanced",
    price: {
      monthly: "$12/mo",
      yearly: "$120/yr",
    },
    SVG: AdvancedSVG,
  },
  {
    title: "Pro",
    price: {
      monthly: "$15/mo",
      yearly: "$150/yr",
    },
    SVG: ProSVG,
  },
];

const Plan = () => {
  const [billing, setBilling] = useState(false);
  const [planCurrent, setPlanCurrent] = useState({
    plan: planData[0].title,
    price: planData[0].price.monthly
  });

  const handleChange = ({ target }) => {
    const { value, dataset } = target;
    const currentPrice = billing ? 'yearly' : 'monthly';
    setPlanCurrent({plan:value, price: dataset.price})
  }

  useEffect(() => {
    console.log('atualizar plano')
  }, [billing])

  console.log(planCurrent)

  return (
    <Container>
      <ul>
        {planData.map(({ title, SVG, price: { monthly, yearly } }) => {
          return (
            <PlanRadio key={title}>
              <InputRadio type="radio" id={title} name="plan" value={title}  checked={planCurrent.plan === title} onChange={handleChange} data-price={billing ? yearly : monthly}/>
              <PlanLabel htmlFor={title}>
                <SVG />
                <div>
                  <h3>{title}</h3>
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
