import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../../../contexts/Auth';
import UserMenu from '../user-menu';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../../contexts/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../../../contexts/Sheets', () => ({
  useSheets: jest.fn().mockImplementation(() => mockSheetsValue),
}));

const mockSheetsValue = {
  updateOrdersRow: jest.fn(),
};

const defaultAuthValue = {
  currentUser: {
    email: 'testuser@example.com',
    displayName: 'Test User',
  },
  logout: jest.fn(),
  getUserRole: jest.fn(() => 'reader'),
};

describe('UserMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a user menu with editor permission', async () => {
    const mockAuthValue = {
      ...defaultAuthValue,
      getUserRole: jest.fn(() => 'editor'),
    };
    useAuth.mockImplementation(() => mockAuthValue);
    render(<UserMenu />);

    await waitFor(() => {
      expect(screen.getByText(/Hello, Test User/i)).toBeInTheDocument();
      expect(screen.getByText(/Edit Data/i)).toBeInTheDocument();
    });
  });

  it('should render a user menu without editor permission', async () => {
    const mockAuthValue = {
      ...defaultAuthValue,
    };
    useAuth.mockImplementation(() => mockAuthValue);
    render(<UserMenu />);
    await waitFor(() => {
      expect(screen.getByText(/Hello, Test User/i)).toBeInTheDocument();
      expect(screen.queryByText(/Edit Data/i)).not.toBeInTheDocument();
    });
  });

  it('should logout a user', async () => {
    const mockAuthValue = {
      ...defaultAuthValue,
    };
    useAuth.mockImplementation(() => mockAuthValue);
    render(<UserMenu />);
    await waitFor(() => {
      const logOutButton = screen.getByText(/Log out/i);
      logOutButton.click();
    });

    await waitFor(() => {
      expect(mockAuthValue.logout).toHaveBeenCalled();
      expect(mockRouter.pathname).toEqual('/login');
    });
  });

  it('should display error message when logout fails', async () => {
    const mockAuthValue = {
      ...defaultAuthValue,
      logout: jest.fn(() => {
        throw new Error();
      }),
    };
    useAuth.mockImplementation(() => mockAuthValue);
    render(<UserMenu />);
    const logOutButton = await screen.findByText(/Log out/i);
    fireEvent.click(logOutButton);
    await waitFor(() => {
      expect(mockAuthValue.logout).toHaveBeenCalled();
      expect(screen.getByText(/Failed to log oout/i)).toBeInTheDocument();
    });
  });
});
