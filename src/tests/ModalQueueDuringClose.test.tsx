import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHookToProvider } from './helpers/renderHookToProvider';
import useModal from './testing-app/hooks/useModal';
import { useModalCapture } from '../hooks';

const Delayer = () => {
  const release = useModalCapture();

  return <button onClick={release}>Delayer</button>;
};

describe('Modal queue during-close test', () => {
  afterAll(() => cleanup());

  const { result } = renderHookToProvider(() => useModal(), {
    type: 'queue',
    appearenceMode: 'during-close',
  });

  result.current.open('debug', {
    props: {
      identifier: 'first-modal',
      children: <Delayer />,
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

  test('Modal 2 is rendered but Modal 1 is still on screen', async () => {
    await userEvent.click(screen.getByTestId('first-modal close'));
    expect(screen.getByText(/second-modal$/i)).toBeDefined();
    expect(screen.getByText(/first-modal$/i)).toBeDefined();
  });

  test('Modal 1 is unmounted after release call', async () => {
    await userEvent.click(screen.getByText('Delayer'));
    expect(screen.queryByText(/first-modal$/i)).toBeNull();
  });
});
