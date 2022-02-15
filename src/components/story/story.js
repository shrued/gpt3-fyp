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
  height: 92vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const BigDivision = styled.div`
  width: 70%;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const BigText = styled.p`
  font-size: 40px;
`;

export const Heading = styled.p`
  font-size: 50px;
`;
