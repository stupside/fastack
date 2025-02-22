"use client";

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ISseContext {
  source?: EventSource;
}

export const SseContext = createContext<ISseContext>({});

const Provider: FC<PropsWithChildren<{ src: string }>> = ({
  src,
  children,
}) => {
  const [source, setSource] = useState<EventSource>();

  useEffect(() => {
    const source = new EventSource(src, {
      withCredentials: true,
    });

    setSource(source);

    return () => {
      source.close();
    };
  }, [src]);

  const value = useMemo(
    () => ({
      source,
    }),
    [source],
  );

  return <SseContext.Provider value={value}>{children}</SseContext.Provider>;
};

export default Provider;
