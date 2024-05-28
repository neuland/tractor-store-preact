import { h } from "preact";

const Stores = (props) => {
  return (
    <div>
      <h2>Stores Page</h2>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
};

export default Stores;
