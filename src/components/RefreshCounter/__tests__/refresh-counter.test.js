import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import RefreshCounter from "../refresh-counter";

jest.mock('next/router', () => require('next-router-mock'));

describe("RefreshCounter", () => {
  it("should render a counter", () => {
    render(<RefreshCounter />);

    expect(screen.getByText(/refresh in/i)).toBeInTheDocument();
    expect(screen.getByText(/59/i)).toBeInTheDocument();
  });
});
