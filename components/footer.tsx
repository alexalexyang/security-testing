import { Footer, ImageWrapper } from "../styles/layout";

import Image from "next/image";
import octocat from "../public/octocat.jpg";

export default function PageFooter() {
  return (
    <Footer>
      <h2>Steal this code</h2>
      <a
        href="https://github.com/alexalexyang/security-testing"
        target="__blank"
        aria-label="GitHub repository for this project"
      >
        <ImageWrapper>
          <Image src={octocat} alt="GitHub's octocat" />
        </ImageWrapper>
      </a>
    </Footer>
  );
}
