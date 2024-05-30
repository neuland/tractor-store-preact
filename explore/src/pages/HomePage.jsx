import { h } from "preact";
import Fragment from "../components/Fragment";
import { src, srcset } from "../utils.js";
import c from "./HomePage.module.css";

const HomePage = ({ teasers = [], recommendationSkus = [] }) => {
  return (
    <main class={c.page}>
      {teasers.map(({ title, image, url }) => (
        <a class={c.categoryLink} href={url}>
          <img
            src={src(image, 500)}
            srcet={srcset(image, [500, 1000])}
            sizes="100vw, (min-width: 500px) 50vw"
            alt={title}
          />
          {title}
        </a>
      ))}
      <div class={c.recommendations}>
        <Fragment
          team="explore"
          name="recommendations"
          skus={recommendationSkus.join(",")}
        />
      </div>
    </main>
  );
};

HomePage.route = "home";

export default HomePage;