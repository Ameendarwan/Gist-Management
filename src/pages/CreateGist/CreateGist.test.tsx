import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import CreateGist from './CreateGist';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const createGistMock = vi.fn();
const mockUseCreateGistMutation = vi.fn(() => [createGistMock, { isLoading: false }]);

vi.mock('@app/store/apis/gist', () => ({
  useCreateGistMutation: () => mockUseCreateGistMutation(),
}));

const renderComponent = () => {
  const store = configureStore({ reducer: {} });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateGist />
      </BrowserRouter>
    </Provider>
  );
};

describe('CreateGist Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders CreateGist component', () => {
    renderComponent();
    expect(screen.getAllByText('Create Gist').length).toBeGreaterThan(0);
  });

  it('allows user to input a description', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Gist Description') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Gist' } });
    expect(input.value).toBe('New Gist');
  });

  it('adds a new file when clicking Add File', () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText('Add another file'));
  });

  it('calls createGist mutation when Create Gist button is clicked', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Gist Description'), {
      target: { value: 'Test Gist' },
    });

    fireEvent.change(screen.getByPlaceholderText('Filename including extension...'), {
      target: { value: 'test.js' },
    });

    fireEvent.click(screen.getByLabelText('Create gist button'));

    await waitFor(() => {
      expect(createGistMock).toHaveBeenCalled();
    });
  });

  it('shows an error toast if gist creation fails', async () => {
    createGistMock.mockRejectedValueOnce(new Error('Failed to create gist'));
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText('Gist Description'), {
      target: { value: 'Test Gist' },
    });

    fireEvent.change(screen.getByPlaceholderText('Filename including extension...'), {
      target: { value: 'test.js' },
    });
    fireEvent.click(screen.getByLabelText('Create gist button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create gist!');
    });
  });
});
