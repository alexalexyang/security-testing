import { Content, Header, Main } from "../styles/layout";

import CorsFormBypass from "../components/cors-form-bypass";
import ImageCorsBypass from "../components/cors-image-bypass";
import PageFooter from "../components/footer";
import Seo from "../components/seo";
import { TextWrapper } from "../styles/misc-styles";
import { vulnerableDomain } from "../constants/constants";

const description = "Just some security testing.";

export default function Home() {
  return (
    <Main>
      <Seo description={description} />
      <Content>
        <Header>
          <h1>Security testing</h1>

          <TextWrapper>
            <p>{description}</p>

            <p>
              Get cookies from{" "}
              <a href={vulnerableDomain} target="__blank">
                this page
              </a>
              . Then come back here to try these buttons.
            </p>

            <p>
              If you open the dev tools application tab you should see cookies
              from the other site. Even if not, the exploits still work. But if
              you really want visual confirmation, click the button to get the
              cat image. Somehow, this allowed me to see the cookies in the tab.
            </p>

            <p>
              Feel free to download both repos to try locally and get insight
              from the server.
            </p>
          </TextWrapper>
        </Header>

        <ImageCorsBypass />

        <CorsFormBypass />

        <PageFooter />
      </Content>
    </Main>
  );
}
