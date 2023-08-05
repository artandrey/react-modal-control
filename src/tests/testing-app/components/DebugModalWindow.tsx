import React from 'react';
import { useInternalModal } from '../../../hooks';

export interface DebugModalWindowProps {
  identifier: string;
}

const DebugModalWindow: React.FC<
  React.PropsWithChildren<DebugModalWindowProps>
> = ({ identifier, children }) => {
  const { id, isActive, isClosing, lifecycleState, closeSelf } =
    useInternalModal();
  return (
    <div>
      <p>Id-{id}</p>
      <p>IsActive-{String(isActive)}</p>
      <p>IsClosing-{String(isClosing)}</p>
      <p>LifecycleState-{lifecycleState}</p>
      <p>Count-{identifier}</p>
      <button data-testid={`${identifier} close`} onClick={closeSelf}>
        Close
      </button>
      {children}
    </div>
  );
};

export default DebugModalWindow;
