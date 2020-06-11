import { svg } from ".";

beforeAll(() => {
  document.body.innerHTML = `<div id="container" style="height: 400px; width: 450px;">Hello world</div>`;
});

afterAll(() => {
  const div = document.getElementById("container");
  if (div) {
    document.body.removeChild(div);
  }
});

test("Test SVG creation", () => {
  const el: HTMLDivElement = document.getElementById("container") as HTMLDivElement;
  expect(el).toBeDefined();
  expect(el.style.height).toStrictEqual("400px");
});
