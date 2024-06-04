import { h } from "preact";
import Navigation from "../components/Navigation";
import { useEffect, useState, useRef } from "preact/hooks";
import { fetchFragmentData } from "../fetchData";

const NavigationCe = ({ min, max }, initialState) => {
  const [state, setState] = useState(initialState);
  const isInitialRender = useRef(true);

  // convert custom element attributes to integers
  const params = {
    min: parseInt(min, 10),
    max: parseInt(max, 10),
  };

  useEffect(async () => {
    if (isInitialRender.current && state.avg !== undefined) {
      isInitialRender.current = false;
      return;
    }

    if (isNaN(params.min) || isNaN(params.max)) {
      return;
    }

    const data = await fetchFragmentData("navigation", params);
    setState(data);
  }, [params.min, params.max]);

  return <Navigation {...state} />;
};

NavigationCe.propTypes = {
  min: Number,
  max: Number,
};

export default NavigationCe;
