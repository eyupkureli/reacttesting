import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getUser} from './get-user';
//we mock our api call function here to have a faster test.
jest.mock("./get-user");

describe("When everything is OK", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
  });

  test("should render the App component without crashing", () => {
    //render(<App />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  test("should select the children that is being passed to do CustomInput component", () => {
    screen.getByText("Input:"); //implicit assertion, also we can put regular expression /Input/
    // expect(screen.getByText("Input:")).toBeInTheDocument(); //explicit assertion
    // let error;
    // try {
    //   screen.getByText("Input"); //inverse situation
    // } catch (err) {
    //   error = err;
    // }
    // expect(error).toBeDefined();
  });

  test("should select the input element by its role", () => {
    screen.getByRole("textbox");
    expect(screen.getByRole("textbox")).toBeInTheDocument(); //we can also make try/catch for wrong situation
  });

  test("should select a label element by its text", () => {
    screen.getByLabelText("Input:");
    expect(screen.getByLabelText("Input:")).toBeInTheDocument();
  });

  test("should select a input element by its placeholder text", () => {
    screen.getByPlaceholderText("Example");
    expect(screen.getByPlaceholderText("Example")).toBeInTheDocument();
  });
//queryBy.. does not throw error, just throw error if we use correct one for toBeNull
  test("should select the input element by its role with queryByRole", () => {
    screen.queryByRole("textbox");
    expect(screen.queryByRole("whatever")).toBeNull(); //we can use toBeNull for wrong case instead of try/catch,if we put "textbox" for toBeNull it throw error and fail
  });

  // test("should not find the role whatever in our component, () => {
  //   expect(screen.queryByRole("whatever")).toBeNull();
  // });
});
