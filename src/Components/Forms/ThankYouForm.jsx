import React from 'react';
import styled from 'styled-components';
import ThankYouSvg from '../Svgs/ThankYouSvg'

const ThankYouForm = () => {
  return (
    <Container>
      <ThankYouSvg />
      <h1>Thank you!</h1>
      <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </Container>
  )
}

export default ThankYouForm

const Container = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
  p {
    color: hsl(231, 11%, 63%);
    text-align: center;
    max-width: 49ch;
    line-height: 1.5;
  }
  @media (max-width: 400px) {
    gap: 10px;
    max-width: 33ch;
    h1 {
      font-size: 1.5rem;
    }
  }
`