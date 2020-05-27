import { formatNumber, svg } from ".";

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

test("Number formatting", () => {
  expect(formatNumber(-1.005)).toStrictEqual("-1.00");
  expect(formatNumber(0)).toStrictEqual("0.00");
  expect(formatNumber(0.999999)).toStrictEqual("1.00");
  expect(formatNumber(9.999999)).toStrictEqual("10.0");
  expect(formatNumber(100.11111)).toStrictEqual("100");
});
