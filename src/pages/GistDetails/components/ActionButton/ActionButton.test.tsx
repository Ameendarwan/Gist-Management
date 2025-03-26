import { fireEvent, render, screen } from '@testing-library/react';

import ActionButton from './ActionButton';
import { ActionButtonProps } from './types';
import { vi } from 'vitest';

describe('ActionButton Component', () => {
  const mockHandleClick = vi.fn();
  const defaultProps: ActionButtonProps = {
    title: 'Fork',
    count: 5,
    isDisabled: false,
    handleClick: mockHandleClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<ActionButton {...defaultProps} />);

    expect(screen.getByLabelText('Fork button, count: 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Fork icon and label')).toBeInTheDocument();
    expect(screen.getByLabelText('Fork count')).toHaveTextContent('5');
  });

  it('calls handleClick when clicked', () => {
    render(<ActionButton {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Fork button, count: 5'));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('disables button when isDisabled is true', () => {
    render(<ActionButton {...defaultProps} isDisabled={true} />);
    expect(screen.getByLabelText('Fork button, count: 5')).toBeDisabled();
  });
});
