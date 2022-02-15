import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const SmallDivision = styled.div`
  width: 30%;
  height: 100vh;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const BigDivision = styled.div`
  width: 70%;
  height: 100vh;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
