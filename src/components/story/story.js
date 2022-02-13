import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Division = styled.div`
  display: inline-block;
  width: 50%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
