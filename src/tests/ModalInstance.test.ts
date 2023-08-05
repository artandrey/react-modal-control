import { vi } from 'vitest';
import { IModalState } from '../hooks/useModalManager/IModalState';
import { ModalInstance } from '../hooks/useModalManager/ModalInstance';

test('Matches state snapshot', () => {
  const Element = () => '';
  const stateSnapshot: IModalState = {
    Element: Element,
    id: 1,
    key: '',
    lifecycleState: 'PENDING',
    props: {},
  };

  const instnaceWithProps = new ModalInstance(Element, 1, '', {
    modalOptions: { props: {} },
  });

  const instanceWithoutProps = new ModalInstance(Element, 1, '', {
    modalOptions: { props: undefined },
  });

  expect(instnaceWithProps.toState()).toMatchSnapshot(stateSnapshot);
  expect(instanceWithoutProps.toState()).toMatchSnapshot(stateSnapshot);
});

function createCallbaskSpy() {
  const callbacks = {
    onOpen() {},
    onCloseStart() {},
    onClosed() {},
  };

  const onOpenSpy = vi.spyOn(callbacks, 'onOpen');
  const onCloseStartSpy = vi.spyOn(callbacks, 'onCloseStart');
  const onCloseEndSpy = vi.spyOn(callbacks, 'onClosed');

  return { callbacks, onOpenSpy, onCloseStartSpy, onCloseEndSpy };
}

describe('Testing instance hooks', () => {
  const { callbacks, onCloseEndSpy, onCloseStartSpy, onOpenSpy } =
    createCallbaskSpy();

  const instance = new ModalInstance(() => '', 1, '', {
    modalOptions: { props: {} },
    hooks: callbacks,
  });

  test('After creation any test shouldn`t be called', () => {
    expect(onOpenSpy).not.toHaveBeenCalled();
    expect(onCloseStartSpy).not.toHaveBeenCalled();
    expect(onCloseEndSpy).not.toHaveBeenCalled();
  });

  test('Open should call only open hook', () => {
    instance.open();
    instance.open();
    expect(onOpenSpy).toHaveBeenCalled();
    expect(onCloseStartSpy).not.toHaveBeenCalled();
    expect(onCloseEndSpy).not.toHaveBeenCalled();
  });

  test('Start close should call only close start hook and after close end hook', () => {
    instance.startClose();

    expect(onCloseStartSpy).toHaveBeenCalled();
    expect(onCloseEndSpy).toHaveBeenCalled();
  });

  test('After calling methods twice, hooks Open and Closed called once', () => {
    instance.open();
    instance.open();
    instance.endClose();
    instance.endClose();

    expect(onOpenSpy).toBeCalledTimes(1);
    expect(onCloseEndSpy).toBeCalledTimes(1);
  });
});
