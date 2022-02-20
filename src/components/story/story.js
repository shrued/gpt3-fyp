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
  font-size: 35px;

  @media (max-width: 900px) {
    font-size: 25px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;

  @media (max-width: 900px) {
    font-size: 15px;
  }
`;

export const StoryContainer = styled.div`
  margin: 20px;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ArrowSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;
