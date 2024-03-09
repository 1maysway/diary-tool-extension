export const getNode = <E extends Element = Element>(query: string, timeoutMs = 300, delayMs = 100): Promise<E | null> => {
  return new Promise((r) => {
    let ms = 0;

    console.log(query);
    const intervalId = setInterval(() => {
      const node: E = document.querySelector(query);
      console.log(node);
      if (node) {
        clearInterval(intervalId);
        r(node);
      } else if (ms > timeoutMs) {
        clearInterval(intervalId);
        r(null);
      }

      ms += delayMs;
    }, delayMs);
  });
};
