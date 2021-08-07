import { Content, Header, Main } from "../styles/layout";

import CorsFormBypass from "../components/cors-form-bypass";
import ImageCorsBypass from "../components/cors-image-bypass";
import PageFooter from "../components/footer";
import Seo from "../components/seo";

const description = "Just some security testing.";

export default function Home() {
  return (
    <Main>
      <Seo description={description} />
      <Content>
        <Header>
          <h1>Security testing</h1>

          <p>{description}</p>

          <p>
            Get cookies from
            <a href="https://task-checklist.vercel.app/tryme" target="__blank">
              this page
            </a>
            . Then come back here to try these buttons.
          </p>

          <p>
            Feel free to download both repos to try locally and get insight from
            the server.
          </p>
        </Header>

        <ImageCorsBypass />

        <CorsFormBypass />

        <PageFooter />
      </Content>
    </Main>
  );
}
