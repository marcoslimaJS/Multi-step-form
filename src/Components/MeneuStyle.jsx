import styled from "styled-components";
import fotoBG from  '../assets/images/bg-sidebar-desktop.svg'

export const Container = styled.div`
  background: url(${fotoBG}) no-repeat;
  padding: 20px;
  height: 500px;
`

export const ListItem = styled.div`
  color: #FFF;
  text-transform: uppercase;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  p {
    color: hsl(231, 11%, 63%);
    font-size: 0.875rem;
    margin-bottom: 3px;
  }
  h3  {
    font-size: 0.950rem;
    letter-spacing: 1.5px;
  }
`

export const ListNumber = styled.div`
  display: inline-block;
  border: 1px solid ${({active, index}) => active === index ? 'hsl(217, 100%, 97%)' : '#fff' };
  background: ${({active, index}) => active === index ? ' hsl(206, 94%, 87%)' : '' };
  color: ${({active, index}) => active === index ? '#000' : '' };
  border-radius: 50%;
  padding: 10px 15px;
`