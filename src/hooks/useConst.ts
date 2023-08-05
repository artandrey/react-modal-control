import { useMemo } from 'react';

export function useConst<T>(value: T): T {
  return useMemo(() => value, []);
}
