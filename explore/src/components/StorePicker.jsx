import { h } from "preact";
import { useRef } from "preact/hooks";
import Button from "./Button.jsx";
import { src, srcset } from "../utils.js";
import c from "./StorePicker.module.css";

const StorePicker = ({ stores = [] }) => {
  const dialogRef = useRef(null);

  const selectStore = (e, id) => {
    const event = new CustomEvent("explore:store-selected", {
      bubbles: true,
      composed: true,
      detail: id,
    });
    e.target.dispatchEvent(event);
    dialogRef.current.close();
  };

  const openModal = () => {
    dialogRef.current.showModal();
  };

  return (
    <div class={c.root}>
      <link rel="stylesheet" href="/explore/static/client.css" />
      <div class={c.control} data-boundary="explore">
        <div class={c.selected}></div>
        <Button className={c.recommendation} type="button" onClick={openModal}>
          Choose a store
        </Button>
      </div>
      <dialog class={c.dialog} ref={dialogRef} data-boundary="explore">
        <div class={c.wrapper}>
          <h2>Stores</h2>
          <ul class={c.list}>
            {stores.map((s) => (
              <li>
                <div>
                  <img
                    class={c.image}
                    src={src(s.image, 200)}
                    srcset={srcset(s.image, [200, 400])}
                    width="200"
                    height="200"
                  />
                  <p class={c.address}>
                    {s.name}
                    <br />
                    {s.street}
                    <br />
                    {s.city}
                  </p>
                </div>
                <Button
                  extraClass={c.select}
                  type="button"
                  onClick={(e) => selectStore(e, s.id)}
                >
                  Select
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};

StorePicker.api = "/stores";

export default StorePicker;
