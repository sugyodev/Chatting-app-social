import styled, { createGlobalStyle, css } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
    transition: var(--main-transition) !important ;
  }
  
  :root {
    --for-active-click: scale(.92);
    --main-transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  html {
      scroll-behavior: smooth;
  }
 
 
  @media only screen and (min-width: 768px){
      body{
          font-size: 16px;
      }
  }
  
  @media only screen and (min-width: 480px) and (max-width: 768px){
      body{
          font-size: 15px;
      }
  }
  
  @media only screen and (max-width: 479px) {
      body{
          font-size: 14px;
      }
  }

  /* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

  
`;
 
export default GlobalStyle;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  transition: var(--main-transition);

`;

export const Wraper = styled.div`

`

export const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`