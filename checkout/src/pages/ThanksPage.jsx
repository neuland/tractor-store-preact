import { h } from "preact";
import { useEffect } from "preact/hooks";
import c from "./ThanksPage.module.css";
import Button from "../components/Button";
import Fragment from "../components/Fragment";
import confetti from "canvas-confetti";

const ThanksPage = () => {
  useEffect(() => {
    var end = Date.now() + 1000;

    const settings = {
      particleCount: 3,
      scalar: 1.5,
      colors: ["#FFDE54", "#FF5A54", "#54FF90"],
      spread: 70,
    };

    // Animates confetti particles.
    function frame() {
      confetti({
        ...settings,
        angle: 60,
        origin: { x: 0 },
      });
      confetti({
        ...settings,
        angle: 120,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        window.requestAnimationFrame(frame);
      }
    }
    frame();
  }, []);

  return (
    <div>
      <Fragment team="explore" name="header" />
      <main class={c.root}>
        <h2 class={c.title}>Thanks for your order!</h2>
        <p class={c.text}>We'll notify you, when its ready for pickup.</p>
        <Button href="/" variant="secondary" data-native>
          Continue Shopping
        </Button>
      </main>
    </div>
  );
};

ThanksPage.api = null;

export default ThanksPage;
