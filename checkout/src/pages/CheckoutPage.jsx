import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { route } from "preact-router";
import fetchData from "../fetchData";
import Button from "../components/Button.jsx";
import Fragment from "../components/Fragment.jsx";
import c from "./CheckoutPage.module.css";
import CompactHeader from "../components/CompactHeader.jsx";

const STORE_PICKER_EVENT = "explore:store-selected";

const Checkout = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [storeId, setStoreId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const storePickerRef = useRef(null);

  // enable/disable button based on form state
  useEffect(() => {
    setIsButtonDisabled(!firstname || !lastname || !storeId);
  }, [firstname, lastname, storeId]);

  useEffect(() => {
    const handleEvent = (event) => {
      setStoreId(event.detail);
    };

    const $el = storePickerRef.current;
    $el.addEventListener(STORE_PICKER_EVENT, handleEvent);

    // cleanup
    return () => {
      $el.removeEventListener(STORE_PICKER_EVENT, handleEvent);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData("/placeorder", { method: "POST" });
    route("/checkout/thanks");
  };

  return (
    <div>
      <CompactHeader />
      <main class={c.root}>
        <h2>Checkout</h2>
        <form
          action="/checkout/api/placeorder"
          method="post"
          class={c.form}
          onSubmit={handleSubmit}
        >
          <h3>Personal Data</h3>
          <fieldset class={c.name}>
            <div>
              <label class={c.label} for="c_firstname">
                First name
              </label>
              <input
                class={c.input}
                type="text"
                id="c_firstname"
                name="firstname"
                value={firstname}
                onInput={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div>
              <label class={c.label} for="c_lastname">
                Last name
              </label>
              <input
                class={c.input}
                type="text"
                id="c_lastname"
                name="lastname"
                value={lastname}
                onInput={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </fieldset>

          <h3>Store Pickup</h3>
          <fieldset>
            <div class={c.store} ref={storePickerRef}>
              <Fragment team="explore" name="storepicker" />
            </div>
            <label class={c.label} for="c_storeId">
              Store ID
            </label>
            <input
              class={c.input}
              type="text"
              id="c_storeId"
              name="storeId"
              value={storeId}
              readonly
              required
            />
          </fieldset>

          <div class={c.buttons}>
            <Button type="submit" variant="primary" disabled={isButtonDisabled}>
              Place Order
            </Button>
            <Button href="/checkout/cart" variant="secondary">
              Back to Cart
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

Checkout.api = null;

export default Checkout;
