import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import MiniCart from "../../components/MiniCart";
import fetchData from "../../fetchData";

const initialState = window.CHECKOUT_MINICART || {};

const MiniCartCe = ({}) => {
  const [state, setState] = useState(initialState);
  const [highlight, setHighlight] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    const fetchCartData = async () => {
      const data = await fetchData(MiniCart.api);
      setState(data);
    };

    const handleCartUpdated = async () => {
      await fetchCartData();
      setHighlight(true);
      setTimeout(() => setHighlight(false), 600);
    };

    window.addEventListener("checkout:cart-updated", handleCartUpdated);

    if (isInitialRender.current && state.quantity !== undefined) {
      isInitialRender.current = false;
    } else {
      fetchCartData();
    }

    return () => {
      window.removeEventListener("checkout:cart-updated", handleCartUpdated);
    };
  }, []);

  return <MiniCart {...state} highlight={highlight} />;
};

MiniCartCe.propTypes = {};

export default MiniCartCe;
