import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import AddToCart from "../../components/AddToCart";
import fetchData from "../../fetchData";

const initialState = window.CHECKOUT_ADDTOCART || {};

const AddToCartCe = ({ sku }) => {
  const [state, setState] = useState(initialState);
  const [confirmed, setConfirmed] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    if (isInitialRender.current && state.variant) {
      isInitialRender.current = false;
      return;
    }
    if (!sku) return;
    const data = await fetchData(AddToCart.api, { query: { sku } });
    setState(data);
  }, [sku]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchData("/cart/item", { method: "POST", query: { sku } });
    setConfirmed(true);
    window.dispatchEvent(new CustomEvent("checkout:cart-updated"));
  };

  return (
    <AddToCart {...state} confirmed={confirmed} handleSubmit={handleSubmit} />
  );
};

AddToCartCe.propTypes = {
  sku: String,
};

export default AddToCartCe;
