import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AddOnsContext, PlanContext } from "../FormStep";
import CheckMarkSvg from "../Svgs/CheckMarkSvg";

const addOnsData = [
  {
    name: "Online service",
    description: "Acess to multiplayer games",
    price: {
      monthly: "$1/mo",
      yearly: "$10/yr",
    },
    id: "online",
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      monthly: "$2/mo",
      yearly: "$20/yr",
    },
    id: "larger",
  },
  {
    name: "Customizable profile",
    description: "Acess to multiplayer games",
    price: {
      monthly: "$2/mo",
      yearly: "$20/yr",
    },
    id: "customizable",
  },
];

const AddOns = () => {
  const { selectedAddOns, setSelectedAddOns } = useContext(AddOnsContext);
  const {
    planCurrent: { duration },
  } = useContext(PlanContext);

  const handleChange = ({ target }) => {
    const { value, checked, dataset } = target;
    if (checked) {
      setSelectedAddOns((prevState) => [
        ...prevState,
        { name: value, price: dataset.price },
      ]);
    } else {
      setSelectedAddOns((addOns) =>
        addOns.filter(({ name }) => name !== value)
      );
    }
  };

  console.log(selectedAddOns);

  return (
    <Container>
      <ul>
        {addOnsData.map(({ name, description, price, id }) => {
          return (
            <AddOnsCheck key={id}>
              <CheckboxInput
                type="checkbox"
                id={id}
                value={name}
                checked={selectedAddOns.some((addOns) => addOns.name === name)}
                onChange={handleChange}
                data-price={price[duration]}
              />
              <Label htmlFor={id}>
                <PseudoCheckbox>
                  <CheckMarkSvg />
                </PseudoCheckbox>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <span>{price[duration]}</span>
              </Label>
            </AddOnsCheck>
          );
        })}
      </ul>
    </Container>
  );
};

export default AddOns;

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
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const Label = styled.label`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid hsl(231, 11%, 63%);
  border-radius: 5px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    color: hsl(231, 11%, 63%);
    font-size: 0.875rem;
  }
  span {
    color: hsl(243, 100%, 62%);
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: auto;
  }
  @media (max-width: 460px) {
    padding: 15px;
    gap: 15px;
    h3 {
      margin-bottom: 2px;
      font-size: 0.900rem;
    }
    p {
      font-size: 0.800rem;
    }
    span {
      font-size: 0.800rem;
    }
  }
`;

const PseudoCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid hsl(231, 11%, 63%);
  @media (max-width: 460px) {
    width: 20px;
    height: 20px;
  }
`;

const AddOnsCheck = styled.div`
  input:checked + label {
    border-color: hsl(213, 96%, 18%);
    background: hsl(217, 100%, 97%);
    ${PseudoCheckbox} {
      background: hsl(243, 100%, 62%);
    }
  }
`;
