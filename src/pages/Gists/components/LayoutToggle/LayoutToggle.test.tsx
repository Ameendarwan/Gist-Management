import { fireEvent, render, screen } from '@testing-library/react';

import LayoutToggle from './LayoutToggle';
import { vi } from 'vitest';

describe('LayoutToggle Component', () => {
  it('should render both Grid and List buttons', () => {
    render(<LayoutToggle isGrid={true} setIsGrid={() => {}} />);

    expect(screen.getByTitle('Grid')).toBeInTheDocument();
    expect(screen.getByTitle('List')).toBeInTheDocument();
  });

  it('should call setIsGrid with true when Grid button is clicked', () => {
    const setIsGridMock = vi.fn();
    render(<LayoutToggle isGrid={false} setIsGrid={setIsGridMock} />);

    fireEvent.click(screen.getByTitle('Grid'));
    expect(setIsGridMock).toHaveBeenCalledWith(true);
  });

  it('should call setIsGrid with false when List button is clicked', () => {
    const setIsGridMock = vi.fn();
    render(<LayoutToggle isGrid={true} setIsGrid={setIsGridMock} />);

    fireEvent.click(screen.getByTitle('List'));
    expect(setIsGridMock).toHaveBeenCalledWith(false);
  });

  it('should apply the correct styles based on isGrid prop', () => {
    const { rerender } = render(<LayoutToggle isGrid={true} setIsGrid={() => {}} />);
    expect(screen.getByTitle('Grid')).toHaveClass('!bg-border');
    expect(screen.getByTitle('List')).toHaveClass('!bg-white');

    rerender(<LayoutToggle isGrid={false} setIsGrid={() => {}} />);
    expect(screen.getByTitle('Grid')).toHaveClass('!bg-white');
    expect(screen.getByTitle('List')).toHaveClass('!bg-border');
  });
});
