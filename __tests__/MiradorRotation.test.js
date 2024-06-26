import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MiradorRotationMenuItem from '../src/plugins/MiradorRotationMenuItem';
// import '@testing-library/jest-dom/extend-expect';

describe('MiradorRotationMenuItem', () => {
  const mockUpdateWindow = jest.fn();
  const mockHandleClose = jest.fn();
  const windowId = 'window-1';
  const t = (key) => key; // simplistic translation function for testing

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle the enabled state on click', () => {
    const { rerender } = render(
      <MiradorRotationMenuItem
        enabled
        handleClose={mockHandleClose}
        t={t}
        updateWindow={mockUpdateWindow}
        windowId={windowId}
      />,
    );

    // First click should disable
    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);
    expect(mockUpdateWindow).toHaveBeenCalledWith(windowId, { rotationEnabled: false });
    expect(mockHandleClose).toHaveBeenCalled();

    // Reset mocks to clear call history
    jest.clearAllMocks();

    // Rerender with new "enabled" state as false
    rerender(
      <MiradorRotationMenuItem
        enabled={false}
        handleClose={mockHandleClose}
        t={t}
        updateWindow={mockUpdateWindow}
        windowId={windowId}
      />,
    );

    // Second click should enable
    fireEvent.click(menuItem);
    expect(mockUpdateWindow).toHaveBeenCalledWith(windowId, { rotationEnabled: true });
  });
});
