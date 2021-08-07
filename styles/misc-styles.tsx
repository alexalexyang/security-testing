import styled, { css } from "styled-components";

export const SectionWrapper = styled.section`
  border: 1px solid plum;
  border-radius: 3rem;
  background-color: lemonchiffon;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommonButtonStyles = css`
  width: 8rem;
  height: 8rem;
  background-color: blanchedalmond;
  box-shadow: 2px 2px 2px lightgray;

  :hover {
    background-color: lightcyan;
  }

  :active {
    background-color: lightgreen;
  }
`;

export const RoundButton = styled.button`
  ${CommonButtonStyles}
  border: 2px solid pink;
  border-radius: 50%;
`;

export const RectButton = styled.button`
  ${CommonButtonStyles}
  height: 4rem;
  border: 2px solid pink;
  border-radius: 1rem;
`;

export const StyledImage = styled.img`
  width: 100%;
  border: 5px solid darkolivegreen;
  border-radius: 2rem;
  object-fit: contain;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const StyledInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  height: 2rem;
`;

export const StyledHr = styled.hr`
  border: 1px solid lightgray;
  width: 100%;
`;

export const TextWrapper = styled.div`
  line-height: 1.5rem;

  > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;
