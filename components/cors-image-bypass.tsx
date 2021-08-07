import {
  ButtonsWrapper,
  RoundButton,
  SectionWrapper,
  StyledImage,
  TextWrapper,
} from "../styles/misc-styles";

import { baseUrl } from "../constants/constants";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

const catUrl = `${baseUrl}/api/csrf/get-image`;

export default function ImageCorsBypass() {
  const [catApiError, setCatApiError] = useState<string | undefined>();
  const [catWithImg, setCatWithImg] = useState<boolean>(false);

  const getCatfromApi = async () => {
    try {
      await fetch(catUrl);
    } catch (error) {
      catApiError ? setCatApiError(undefined) : setCatApiError(error.message);
    }
  };

  const getCatWithImgTag = () => {
    setCatWithImg(!catWithImg);
  };

  return (
    <SectionWrapper>
      <h2>Get cat image</h2>

      <TextWrapper>
        <p>Getting the image directly from the API does not work.</p>
        <p>The HTML img tag by-passes CORS to get it for us.</p>
      </TextWrapper>

      <ButtonsWrapper>
        <RoundButton onClick={getCatfromApi}>
          {catApiError ? "Delete cat API error from state" : "Get cat from API"}
        </RoundButton>
        <RoundButton onClick={getCatWithImgTag}>
          {catWithImg ? "Delete cat from img " : "Get cat with img tag"}
        </RoundButton>
      </ButtonsWrapper>

      {catApiError && (
        <>
          <p>Error message: {catApiError}.</p>
          <p>Look in dev tools console to see CORS error message.</p>
        </>
      )}
      {catWithImg && <StyledImage src={catUrl} alt="random cat" />}
    </SectionWrapper>
  );
}
