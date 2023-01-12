import React from "react";
import styled from "styled-components";
import Personal from "./Forms/Personal";
import Plan from "./Forms/Plan";


const ContentForm = () => {
  return (
    <Container>
      <Plan />
    </Container>
  );
};

export default ContentForm;

const Container = styled.div`
  min-height: 266px;
  margin-bottom: 40px;
`