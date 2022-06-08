import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import userEvent from "@testing-library/user-event";
import CustomInput from "./CustomInput";

describe("When everything is OK", () => {
  test("should call the onChange callback handler when using the fireEvent function", () => {
    const onChange = jest.fn(); //we use a mock function. we define onChange function as a mock
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "David" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    //when we write something we use a few characters and all character call change handler but we define it calling 1 time
    //it is because of fireEvent that is liek copying all of this text and pasting it here.
  });

  test("should call the onChange callback handler when using the userEvent API", async () => {
    const onChange = jest.fn();
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    );

    await userEvent.type(screen.getByRole("textbox"), "David");
    expect(onChange).toHaveBeenCalledTimes(5); //Not like fireEvent, it will call a few times.(David is 5 characters word, so 5 times)
  });
});
