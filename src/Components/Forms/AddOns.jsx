import React, { useState } from "react";
import styled from "styled-components";
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
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handleChange = ({ target }) => {
    const {value, checked, dataset} = target;
    if(checked) {
      setSelectedAddOns(prevState => ([...prevState, { name: value, price: dataset.price}]))
    } else {
      setSelectedAddOns(addOns => (addOns.filter(({name}) => name !== value)))
    }
  }

  console.log(selectedAddOns)

  return (
    <Container>
      <ul>
        {addOnsData.map(({ name, description, price, id }) => {
          return (
            <AddOnsCheck key={id}>
              <CheckboxInput type="checkbox" id={id} value={name} onChange={handleChange} data-price={price.monthly} />
              <Label htmlFor={id}>
                <PseudoCheckbox>
                  <CheckMarkSvg />
                </PseudoCheckbox>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <span>{price.monthly}</span>
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
`;

const PseudoCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid hsl(231, 11%, 63%);
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
