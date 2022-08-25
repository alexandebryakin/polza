import React, { useCallback, useMemo } from 'react';

export interface Toggler {
  on: () => void;
  off: () => void;
  toggle: () => void;
  isOn: boolean;
  isOff: boolean;
}

export default function useToggler(initialState = false): Toggler {
  const [toggled, setToggled] = React.useState(initialState);

  const on = useCallback(() => {
    setToggled(true);
  }, [setToggled]);

  const off = useCallback(() => {
    setToggled(false);
  }, [setToggled]);

  const toggle = useCallback(() => {
    setToggled((prev) => !prev);
  }, [setToggled]);

  const isOn = toggled;
  const isOff = !toggled;

  return useMemo(
    () => ({
      on,
      off,
      toggle,
      isOn,
      isOff,
    }),
    [on, off, toggle, isOn, isOff]
  );
}
