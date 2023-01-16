import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PersonalContext } from "../FormStep";

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexPhone = /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;

export const validate = ({ type, value }, funcSetError) => {
  if (value.length === 0) {
    funcSetError((prevState) => ({
      ...prevState,
      [type]: "This field is required",
    }));
    return false;
  } else if (type === "email" && !regexEmail.test(value)) {
    funcSetError((prevState) => ({ ...prevState, email: "Invalid Email" }));
    return false;
  } else if (type === "phone" && !regexPhone.test(value)) {
    funcSetError((prevState) => ({ ...prevState, phone: "Invalid Phone" }));
    return false;
  } else {
    funcSetError(null);
    return true;
  }
};

const Personal = () => {
  const { form, setForm, error, setError } = useContext(PersonalContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error?.[name]) {
      validate({ type: name, value }, setError);
    }
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validate({ type: name, value }, setError);
  };

  return (
    <Container>
      <Label htmlFor="name">
        Name
        {error?.name && <span>{error.name}</span>}
      </Label>
      <Input
        type="text"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g. Stephen King"
        state={error?.name}
      />

      <Label htmlFor="email">
        Email Address
        {error?.email && <span>{error.email}</span>}
      </Label>
      <Input
        type="text"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g. stephenking@lorem.com"
        state={error?.email}
      />

      <Label htmlFor="phone">
        Phone Number
        {error?.phone && <span>{error.phone}</span>}
      </Label>
      <Input
        type="text"
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g. +1 234 567 890"
        state={error?.phone}
      />
    </Container>
  );
};

export default Personal;

const Input = styled.input`
  color: hsl(213, 96%, 18%);
  padding: 15px 15px;
  font-family: "Ubuntu", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid
    ${({ state }) => (state ? "hsl(354, 84%, 57%)" : "hsl(231, 11%, 63%)")};
  :focus {
    outline: none;
    border: 1px solid
      ${({ state }) => (state ? "hsl(354, 84%, 57%)" : "hsl(213, 96%, 18%)")};
  }
  @media (max-width: 900px) {
    &:last-child {
      margin-bottom: 0px;
    }
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  span {
    color: hsl(354, 84%, 57%);
  }
  @media (max-width: 500px) {
    font-size: 0.875rem;
    margin-bottom: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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
