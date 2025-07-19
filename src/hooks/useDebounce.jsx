import React from "react";

const useDebounce = (cb, delay, dependacy) => {
  useEffect(() => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }, dependacy);
};

export default useDebounce;
