import '../../../../../tests/mocks';

import { fireEvent, render, screen } from '@testing-library/react';

import GistTable from './GistTable';
import { MemoryRouter } from 'react-router-dom';
import { mockGist } from '@app/mock/data';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockStarGist = vi.fn();
const mockForkGist = vi.fn();
const mockUseStarGistMutation = vi.fn(() => [mockStarGist, { isLoading: false }]);
const mockUseForkGistMutation = vi.fn(() => [mockForkGist, { isLoading: false }]);

vi.mock('@app/store/apis/gist', () => ({
  useStarGistMutation: () => mockUseStarGistMutation(),
  useForkGistMutation: () => mockUseForkGistMutation(),
}));

describe('GistTable Component', () => {
  const mockGists = [
    {
      ...mockGist,
    },
  ];
  const mockStarredGists = { '1': true };

  it('should render table headers correctly', () => {
    render(<GistTable gists={mockGists} starredGists={mockStarredGists} />, { wrapper: MemoryRouter });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Notebook Name')).toBeInTheDocument();
    expect(screen.getByText('Keyword', { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });

  it('should render gist data correctly', () => {
    render(<GistTable gists={mockGists} starredGists={mockStarredGists} />, { wrapper: MemoryRouter });

    expect(screen.getByText('mockuser')).toBeInTheDocument();
    expect(screen.getByText('This is a sample gist')).toBeInTheDocument();
  });

  it('should navigate to gist details page on row click', () => {
    render(<GistTable gists={mockGists} starredGists={mockStarredGists} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByLabelText('Gist by mockuser'));
    expect(mockNavigate).toHaveBeenCalledWith('/gist/1');
  });
});
