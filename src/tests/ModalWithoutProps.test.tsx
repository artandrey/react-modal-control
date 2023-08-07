import { cleanup, screen } from '@testing-library/react';
import { renderHookToProvider } from './helpers/renderHookToProvider';
import useModal from './testing-app/hooks/useModal';

describe('Test for modal without props', () => {
  afterAll(() => cleanup());

  const { result } = renderHookToProvider(() => useModal(), {
    type: 'queue',
    appearenceMode: 'during-close',
  });

  result.current.open('withoutProps');

  test('Modal should be opened', () => {
    expect(screen.getByText('ModalWithoutProps')).toBeDefined();
  });
});
