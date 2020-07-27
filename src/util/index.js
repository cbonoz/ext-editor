export const isEmpty = (s) => !s || s.length === 0;

export const downloadLayout = (components) => {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(components)], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "layout.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export function isPrimitive(test) {
    return (test !== Object(test));
};