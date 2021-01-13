import {useEffect} from "react";

const useDebounce = (operation, ms) => {
  useEffect(() => {
    const handle = setTimeout(operation, ms);
    return () => clearTimeout(handle)
  }, [operation, ms]);
}

export default useDebounce;