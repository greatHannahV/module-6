import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Lazy } from "fp-ts/function";

export const useToggle = (
  initial: boolean = false
): [boolean, Lazy<void>, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(!value), [value]);

  return [value, toggle, setValue];
};
