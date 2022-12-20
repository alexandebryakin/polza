import React from 'react';

export function useClickOutside({ handler }: { handler: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // event.stopPropagation();
      // event.preventDefault();
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handler, ref]);

  return [ref];
}
