import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3em 5em;

  @media (max-width: 900px) {
    margin: 1em;
  }
`;
