import { h } from "preact";
import StorePicker from "../../components/StorePicker";
import { useEffect, useState, useRef } from "preact/hooks";
import fetchData from "../../fetchData";

const initialState = window.EXPLORE_STOREPICKER || {};

const StorePickerCe = ({}) => {
  const [state, setState] = useState(initialState);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    if (isInitialRender.current && state.stores) {
      isInitialRender.current = false;
      return;
    }

    const data = await fetchData(StorePicker.api);
    setState(data);
  }, [isInitialRender.current]);

  return <StorePicker {...state} />;
};

StorePickerCe.propTypes = {};

export default StorePickerCe;
