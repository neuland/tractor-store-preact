import { h } from "preact";

const Navigation = ({ avg }) => {
  return (
    <nav>
      <a href="/decide/about">About</a>
      <a href="/decide/contact">Contact</a>
      <a href="/decide/faq">FAQ</a>
      <p>Average: {avg}</p>
    </nav>
  );
};

export default Navigation;
