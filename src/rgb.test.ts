import { RGB } from "./rgb";

test("RGB declared by CSS name", () => {
  const red: RGB = new RGB("tomato");
  expect(red.r).toStrictEqual(255);
  expect(red.g).toStrictEqual(99);
  expect(red.b).toStrictEqual(71);
  expect(red.toString()).toStrictEqual("#ff6347");
  expect(red.toCSSString()).toStrictEqual("tomato");
});

test("RGB declared by 3 character HEX value", () => {
  const red: RGB = new RGB("#f00");
  expect(red.r).toStrictEqual(255);
  expect(red.g).toStrictEqual(0);
  expect(red.b).toStrictEqual(0);
  expect(red.toString()).toStrictEqual("#ff0000");
  expect(red.toCSSString()).toStrictEqual("red");
});

test("RGB declared by 6 character HEX value", () => {
  const red: RGB = new RGB("#ff6347");
  expect(red.r).toStrictEqual(255);
  expect(red.g).toStrictEqual(99);
  expect(red.b).toStrictEqual(71);
  expect(red.toString()).toStrictEqual("#ff6347");
  expect(red.toCSSString()).toStrictEqual("tomato");
});

test("Color brightness and difference", () => {
  const red: RGB = new RGB("#ff6347");
  const black: RGB = new RGB("black");
  const white: RGB = new RGB("white");
  expect(black.colorDifference(white)).toStrictEqual(765);
  expect(red.brightness).toStrictEqual(142.452);
});