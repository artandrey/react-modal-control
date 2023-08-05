import { act, cleanup, screen } from '@testing-library/react';
import { renderHookToProvider } from './helpers/renderHookToProvider';
import useModal from './testing-app/hooks/useModal';

describe('Modal multiple type test', () => {
  afterAll(() => cleanup());

  const { result } = renderHookToProvider(() => useModal(), {
    type: 'multiple',
  });

  test('Modal 1 is rendered', () => {
    act(() =>
      result.current.open('debug', { props: { identifier: 'first-modal' } })
    );
    expect(screen.getByText(/first-modal$/i)).toBeDefined();
  });

  test('Modal 1 and Modal 2 is rendered', () => {
    act(() =>
      result.current.open('debug', { props: { identifier: 'second-modal' } })
    );
    expect(screen.getByText(/first-modal$/i)).toBeDefined();
    expect(screen.getByText(/second-modal$/i)).toBeDefined();
  });
});
