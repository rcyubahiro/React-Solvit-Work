export function greet(name, time) {
  const message =
    time < 12
      ? `Good morning, ${name}`
      : time < 18
      ? `Good afternoon, ${name}`
      : `Good evening, ${name}`;

  return message;
}
