import React from "react";
import {
  ExtButton,
  ExtGrid,
  ExtList,
  ExtProgress,
} from "@sencha/ext-react-modern";
import ExtSearchfield from "@sencha/ext-react-modern/dist/ExtSearchfield";
import ExtDatepicker from "@sencha/ext-react-modern/dist/ExtDatepicker";
import ExtRadiofield from "@sencha/ext-react-modern/dist/ExtRadiofield";
import ExtFilefield from "@sencha/ext-react-modern/dist/ExtFilefield";
import ExtPasswordfield from "@sencha/ext-react-modern/dist/ExtPasswordfield";
import ExtImage from "@sencha/ext-react-modern/dist/ExtImage";
import ExtTimepanel from "@sencha/ext-react-modern/dist/ExtTimepanel";
import ExtAccordion from "@sencha/ext-react-modern/dist/ExtAccordion";
import ExtDataview from "@sencha/ext-react-modern/dist/ExtDataview";
import ExtTitlebar from "@sencha/ext-react-modern/dist/ExtTitlebar";
import ExtEmailfield from "@sencha/ext-react-modern/dist/ExtEmailfield";
import ExtPanel from "@sencha/ext-react-modern/dist/ExtPanel";

const Ext = window["Ext"];

const c = (component, name, props) => {
  return {
    component,
    name,
    props: { width: 200, height: 75, ...props },
  };
};

function ComponentList({ onSelect }) {
  const COMPONENTS = [
    c(ExtList, "List", {
      store: new Ext.data.Store({
        data: [
          { title: "Item 1" },
          { title: "Item 2" },
          { title: "Item 3" },
          { title: "Item 4" },
        ],
      }),
      itemTpl: "My List",
    }),
    c(ExtGrid, "Grid", {
      store: new Ext.data.Store({
        data: [
          { name: "Lisa", email: "lisa@simpsons.com", phone: "555-111-1224" },
          { name: "Bart", email: "bart@simpsons.com", phone: "555-222-1234" },
          {
            name: "Homer",
            email: "home@simpsons.com",
            phone: "555-222-1244",
          },
          {
            name: "Marge",
            email: "marge@simpsons.com",
            phone: "555-222-1254",
          },
        ],
      }),
    }),
    c(ExtButton, "Button", {
      text: "Say Hello",
      handler: () => console.log("button clicked"),
      ui: "action raised",
    }),
    c(ExtProgress, "Progress bar", {
      value: 0.3,
    }),
    c(ExtSearchfield, "Search field", {
      value: "",
      placeholder: "Search...",
    }),
    c(ExtRadiofield, "Radio field", {
      boxLabel: "Unchecked",
      value: "unchecked",
    }),
    c(ExtFilefield, "File picker", {
      label: "Select a file",
      name: "phone",
      accept: "image",
    }),
    c(ExtEmailfield, "Email field", {
      label: "Email",
      placeholder: "user@domain.com",
    }),
    c(ExtPasswordfield, "Password field", { label: "Password" }),
    c(ExtImage, "Image", {
      src:
        "https://cdn.britannica.com/s:800x450,c:crop/87/196687-138-2D734164/facts-parrots.jpg",
    }),
    c(ExtAccordion, "Accordion", {
      title: "Accordion",
      fullscreen: true,
      openable: 2,
    }),
    c(ExtTimepanel, "Time panel", { shadow: true }),
    c(ExtDataview, "Data view", {
      store: new Ext.data.Store({
        data: [
          { name: "Peter", age: 26 },
          { name: "Ray", age: 21 },
          { name: "Egon", age: 29 },
          { name: "Winston", age: 24 },
        ],
      }),
    }),
    c(ExtTitlebar, "Title bar", { title: "My App", docked: "top" }),
    c(ExtPanel, "Panel", { title: "Panel", shadow: "true" }),
  ];

  return (
    <div>
      {COMPONENTS.map((c, i) => {
        return (
          <div key={i} className="component-item" onClick={() => onSelect(c)}>
            {c.name}
          </div>
        );
      })}
    </div>
  );
}

export default ComponentList;
