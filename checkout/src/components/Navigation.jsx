import { h } from "preact";

const Navigation = ({ avg }) => {
  return (
    <nav>
      <a href="/checkout/about">About</a>
      <a href="/checkout/contact">Contact</a>
      <a href="/checkout/faq">FAQ</a>
      <p>Average: {avg}</p>
    </nav>
  );
};

export default Navigation;
