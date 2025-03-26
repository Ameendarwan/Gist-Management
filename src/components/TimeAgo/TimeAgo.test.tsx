import { render, screen } from '@testing-library/react';

import TimeAgo from './TimeAgo';
import { vi } from 'vitest';

describe('TimeAgo Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-26T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders time ago correctly', () => {
    const pastDate = new Date('2025-03-26T11:00:00Z');
    render(<TimeAgo date={pastDate} />);
    expect(screen.getByText('about 1 hour ago')).toBeInTheDocument();
  });

  it('renders future dates correctly', () => {
    const futureDate = new Date('2025-03-26T13:00:00Z');
    render(<TimeAgo date={futureDate} />);
    expect(screen.getByText('in about 1 hour')).toBeInTheDocument();
  });

  it('renders correctly with different input formats', () => {
    const timestamp = new Date('2025-03-26T10:00:00Z').getTime();
    render(<TimeAgo date={timestamp} />);
    expect(screen.getByText('about 2 hours ago')).toBeInTheDocument();
  });

  it('applies the className prop correctly', () => {
    render(<TimeAgo date={new Date()} className="text-gray-500" />);
    expect(screen.getByText(/ago|in/i)).toHaveClass('text-gray-500');
  });
});
