export const debounce = (fn: (...params: any[]) => any, delayTime: number) => {
  let timer: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delayTime);
  };
};
