import Header from "@/src/app/components/header/header";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
});

test("render title", async () => {
  // Arrange
  render(<Header />);
  // Act
  await screen.findByText("DAYBREAK");
  // Assert
  expect(screen.getByText("DAYBREAK")).toBeInTheDocument();
});
