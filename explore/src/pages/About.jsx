import { h } from "preact";
import { useState } from "preact/hooks";
import c from "./About.module.css";
import Fragment from "../components/Fragment";

const About = ({ title, content }) => {
  const [counter, setCounter] = useState(0);
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(110);

  let classes = c.headline;
  if (counter >= 10) {
    classes += " " + c.headlineSpecial;
  }

  return (
    <div>
      <div>
        <h2>About Page</h2>
        <h1 class={classes}>{title}</h1>
        <pre>{JSON.stringify(c)}</pre>
        <p>{content}</p>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>+1</button>
        <hr />
        <p>
          Range: {min}-{max}
        </p>
        <button onClick={() => setMin(min + 1)}>min +1</button>
        <button onClick={() => setMax(max + 1)}>max +1</button>
        <Fragment team="explore" name="navigation" min={min} max={max} />
      </div>
    </div>
  );
};

export default About;
