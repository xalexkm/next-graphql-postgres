import { Tasks } from "@/src/app/components/tasks/tasks";
import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import exp from "constants";

beforeEach(() => {
  jest.clearAllMocks();
});

test("render input", async () => {
  // Arrange
  render(<Tasks />);
  // Act
  await screen.findByRole("input");
  await userEvent.click(screen.getByRole("input"));
  await userEvent.type(screen.getByRole("input"), "Testing typing");

  // Assert
  expect(screen.getByRole("input")).toHaveTextContent("Testing typing");
});

// test("link to homepage", async () => {
//   // Arrange
//   render(<Tasks />);
//   // Act
//   await userEvent.click(screen.getByText("DAYBREAK"));
//   // Assert
// });
