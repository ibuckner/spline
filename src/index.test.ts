import { svg } from ".";

test("Test SVG creation", () => {
  const div = document.createElement("div");
  div.style.height = "400px";
  div.style.width = "450px";
  document.body.appendChild(div);
  const s = svg(div);
  expect(s).toBeDefined();
  const canvas = s.select(".canvas");
  expect(canvas.node().classList.contains("canvas")).toStrictEqual(true);
});

