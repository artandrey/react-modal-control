import { act, cleanup, screen } from '@testing-library/react';
import { renderHookToProvider } from './helpers/renderHookToProvider';
import useModal from './testing-app/hooks/useModal';

describe('Modal queue after-close test', () => {
  afterAll(() => cleanup());

  const { result } = renderHookToProvider(() => useModal(), {
    type: 'queue',
    appearenceMode: 'after-close',
  });

  result.current.open('debug', {
    props: {
      identifier: 'first-modal',
    },
  });

  result.current.open('debug', {
    props: {
      identifier: 'second-modal',
    },
  });

  test('Modal 1 is rendered', () => {
    expect(screen.getByText(/first-modal$/i)).toBeDefined();
  });

  test('Modal 1 is unmounted', () => {
    act(() => result.current.close());
    expect(screen.queryByText(/first-modal$/i)).toBeNull();
  });

  test('Modal 2 is rendered', () => {
    expect(screen.getByText(/second-modal$/i)).toBeDefined();
  });
});
