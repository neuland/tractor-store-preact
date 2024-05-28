import { h } from "preact";

const Navigation = ({ avg }) => {
  return (
    <nav>
      <a href="/explore/about">About</a>
      <a href="/explore/contact">Contact</a>
      <a href="/explore/faq">FAQ</a>
      <p>Average: {avg}</p>
    </nav>
  );
};

export default Navigation;
