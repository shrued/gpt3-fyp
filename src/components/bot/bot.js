import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding: 1em;
  height: 60vh;
  width: 45vh;
  margin-right: 20px;
  background: white;
  border-radius: 10px;

  @media (max-width: 900px) {
    height: 60vh;
  }
`;
