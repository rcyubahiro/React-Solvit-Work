export function convertCtoF(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;

  let status =
    fahrenheit > 86 ? "Hot" : fahrenheit >= 59 ? "Warm" : "Cold";

  return `${celsius}°C = ${fahrenheit}°F (${status})`;
}
