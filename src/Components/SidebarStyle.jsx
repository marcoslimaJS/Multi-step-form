import styled from "styled-components";
import fotoBGDesktop from "../assets/images/bg-sidebar-desktop.svg";
import fotoBGMobile from "../assets/images/bg-sidebar-mobile.svg";

export const Container = styled.div`
  background: url(${fotoBGDesktop}) no-repeat;
  padding: 20px;
  min-width: 275px;
  min-height: 570px;
  @media (max-width: 900px) {
    background: url(${fotoBGMobile}) no-repeat;
    min-width: 0px;
    min-height: 0px;
    background-size: cover;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding-bottom: 60px;
  }
  @media (max-width: 500px) {
    gap: 15px;
  }
`;

export const ListItem = styled.div`
  color: #fff;
  text-transform: uppercase;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  p {
    color: hsl(231, 11%, 63%);
    font-size: 0.875rem;
    margin-bottom: 3px;
  }
  h3 {
    font-size: 0.95rem;
    letter-spacing: 1.5px;
  }
`;

export const ListItemText = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`

export const ListNumber = styled.div`
  display: inline-block;
  border: 1px solid
    ${({ active, index }) =>
      active === index ? "hsl(217, 100%, 97%)" : "#fff"};
  background: ${({ active, index }) =>
    active === index ? " hsl(206, 94%, 87%)" : ""};
  color: ${({ active, index }) => (active === index ? "#000" : "")};
  border-radius: 50%;
  padding: 10px 15px;
  transition: 0.5s;
`;
