import Home from "@/src/app/page";
import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("click on button to redirect to dashboard", async () => {
  // Arrange
  render(<Home />);
  // Act
  await userEvent.click(screen.getByText("Try it out"));
  // Assert
  expect(mockPush).toHaveBeenCalledWith("/dashboard");
});

test("render title, subtitle", async () => {
  // Arrange
  render(<Home />);
  // Act
  await screen.findByText("DAYBREAK");
  await screen.findByText("Something, something, planner!");
  // Assert
  expect(screen.getByText("DAYBREAK")).toBeInTheDocument();
  expect(
    screen.getByText("Something, something, planner!"),
  ).toBeInTheDocument();
});
