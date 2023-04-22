import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthRoute from '../AuthRoute';
import mockRouter from 'next-router-mock';
import { useAuth } from '../index';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../', () => ({
  useAuth: jest.fn(),
}));

describe('AuthRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.push('/');
  });

  it('should redirect to /login when user is not logged in', () => {
    useAuth.mockImplementation(() => ({
      currentUser: false,
      loading: null,
    }));
    render(<AuthRoute />);

    expect(mockRouter.pathname).toEqual('/login');
  });

  it('should render children when user is logged in', () => {
    useAuth.mockImplementation(() => ({
      currentUser: true,
      loading: false,
    }));

    render(<AuthRoute>Test</AuthRoute>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(mockRouter.pathname).not.toEqual('/login');
  });

  it("should render loading when loading is true", () => {
    useAuth.mockImplementation(() => ({
      currentUser: true,
      loading: true,
    }));

    render(<AuthRoute>Test</AuthRoute>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
