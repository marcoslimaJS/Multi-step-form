import React from "react";
import styled from "styled-components";

const SwitchButton = ({ value, setValue, clearAddOns }) => {

  const handleChange = ({ target }) => {
    setValue(target.checked)
  }

  const handleClick = () => {
    clearAddOns(prev => prev = [])
  }

  return (
    <>
      <Label>
        <Input type='checkbox' checked={value} onChange={handleChange} onClick={handleClick} />
        <Switch />
      </Label>
    </>
  );
};

export default SwitchButton;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;


const Switch = styled.div`
  position: relative;
  width: 50px;
  height: 26px;
  background: hsl(213, 96%, 18%);
  border-radius: 32px;
  padding: 3px;
  transition: 300ms all;

  &::before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: #FFF;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  display: none;
  &:checked + ${Switch} {
    &::before {
      transform: translate(24px, -50%);
    }
  }
`;