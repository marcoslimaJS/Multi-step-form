import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  ul {
	list-style: none;
  }
  a {
    text-decoration: none;
  }
  img{
    max-width: 100%;
  }
  body {
  font-family: "Ubuntu", sans-serif;
  font-size: 16px;
	background: hsl(217, 100%, 97%);
}
`;
