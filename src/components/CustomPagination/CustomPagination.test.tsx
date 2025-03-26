import { fireEvent, render, screen } from '@testing-library/react';

import CustomPagination from './CustomPagination';
import { vi } from 'vitest';

describe('CustomPagination Component', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('of 5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<CustomPagination page={3} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<CustomPagination page={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<CustomPagination page={5} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('updates input value when typed and triggers page change on valid input', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '4' } });
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('resets input value to current page if invalid input is entered', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.blur(input);
    expect(input).toHaveValue(2);
  });
});
