import React, { useState } from "react";
import logo from "./logo.svg";
import Draggable from "react-draggable";
import ComponentList from "./components/ComponentList";
import { ExtButton, ExtGrid, ExtProgress } from "@sencha/ext-react-modern";
import { isEmpty, downloadLayout, isPrimitive } from "./util";
import "./App.css";

const SIDEBAR_WIDTH = 250;

function App() {
  const [components, setComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(null);
  const handleMove = (idx, e, data) => {
    const { x, y } = data;
    console.log(x, y);
    console.log("Event: ", e);
    console.log("Data: ", data);
    const c = components[idx];
    c.x = e.screenX + SIDEBAR_WIDTH;
    c.y = e.screenY + 60;
    setComponents(components);
  };

  const download = () => downloadLayout(components);

  const onSelect = (component) => {
    setComponents([...components, component]);
  };

  function doubleClick(i, e, item) {
    e.preventDefault();
    console.log("double");
    setSelected(item);
    setIndex(i);
  }

  const deleteItem = () => {
    console.log("delete", index, components.length);
    setSelected(null);
    components.splice(index, 1);
    setComponents([...components]);
  };

  const saveProp = (k, v) => {
    const c = components[index];
    c.props[k] = v;
    console.log("update", c.props);
    setComponents([...components]);
  };

  return (
    <div className="App">
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <b>ExtEditor - The ExtJS prototype editor</b>
          </a>
          {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
              width="112"
              height="28"
            /> */}
          {!isEmpty(components) && (
            <button
              className="button is-success download-button navbar-item"
              onClick={download}
            >
              Download layout
            </button>
          )}
        </div>
      </nav>

      <div className="columns">
        <div className="column is-narrow component-sidebar">
          <div style={{ width: SIDEBAR_WIDTH }}>
            <ComponentList onSelect={onSelect} />
          </div>
        </div>
        <div className="column component-area">
          {components.map((c, i) => {
            return (
              <div key={i}>
                <Draggable
                  handle=".handle"
                  scale={1}
                  // onStart={(e, data) => handleMove(i, e, data)}
                  // onDrag={(e, data) => handleMove(i, e, data)}
                  onStop={(e, data) => handleMove(i, e, data)}
                >
                  <div
                    onDoubleClick={(e) => doubleClick(i, e, c)}
                    className="handle"
                  >
                    <c.component {...c.props} />
                  </div>
                </Draggable>
              </div>
            );
          })}
        </div>
        <div class={`modal ${!!selected ? "is-active" : ""}`}>
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">
                {selected && `Edit ${selected.name} properties`}
              </p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => setSelected(null)}
              ></button>
            </header>
            <section class="modal-card-body">
              {selected &&
                Object.keys(selected.props).map((k, i) => {
                  if (!isPrimitive(selected.props[k])) {
                    return null;
                  }
                  return (
                    <div class="field" key={i}>
                      <label class="label">{k}</label>
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder={`Set ${k}`}
                          onChange={(e) => saveProp(k, e.target.value)}
                          value={selected.props[k]}
                        />
                      </div>
                    </div>
                  );
                })}
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger" onClick={deleteItem}>
                Delete
              </button>
              <button
                class="button is-success"
                onClick={() => setSelected(null)}
              >
                Ok
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
