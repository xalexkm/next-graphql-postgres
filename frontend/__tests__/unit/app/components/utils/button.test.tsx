import {Button} from "../../../../../src/app/components/utils/button";
import {render, fireEvent, screen} from "@testing-library/react";

import "@testing-library/jest-dom";
import {userEvent} from "@testing-library/user-event";

test("render button with name and click", async () => {
    // Arrange
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>Button</Button>);
    // Act
    await screen.findByRole("button");
    await userEvent.click(screen.getByText("Button"));
    await userEvent.hover(screen.getByText("Button"));
    // Assert
    expect(clickFn).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toHaveTextContent("Button");
});
