import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MiradorRotationMenuItem from '../src/plugins/MiradorRotationMenuItem';
// import '@testing-library/jest-dom/extend-expect';

describe('MiradorRotationMenuItem', () => {
  const mockUpdateWindow = jest.fn();
  const windowId = 'window-1';
  const t = (key) => key; // simplistic translation function for testing

  it('should render lock icon when enabled', () => {
    render(
      <MiradorRotationMenuItem
        enabled
        t={t}
        updateWindow={mockUpdateWindow}
        windowId={windowId}
      />,
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'rotation');
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('LockIcon'));
  });

  it('should render lock open icon when not enabled', () => {
    render(
      <MiradorRotationMenuItem
        enabled={false}
        t={t}
        updateWindow={mockUpdateWindow}
        windowId={windowId}
      />,
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'enableZoom');
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('LockOpenIcon'));
  });

  it('should toggle the enabled state on click', () => {
    render(
      <MiradorRotationMenuItem
        enabled
        t={t}
        updateWindow={mockUpdateWindow}
        windowId={windowId}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockUpdateWindow).toHaveBeenCalledWith(windowId, { rotationEnabled: false });

    fireEvent.click(button);
    expect(mockUpdateWindow).toHaveBeenCalledWith(windowId, { rotationEnabled: true });
  });
});
