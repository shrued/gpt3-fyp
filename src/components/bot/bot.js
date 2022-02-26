import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 4em 5em;
  height: 70vh;

  @media (max-width: 900px) {
    height: 80vh;
    margin: 1em;
  }
`;
