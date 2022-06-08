/* eslint-disable no-restricted-globals */
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getUser } from "./get-user";
import { mocked } from "ts-jest/utils";
//we mock our api call function here to have a faster test.
jest.mock("./get-user");
const mockGetUser = mocked(getUser, true);
//true means if we were returning instead of a promise, we were returning an object, make amock

describe("When everything is OK", () => {
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled()); //when page render we waitfor api call
  });

  test("should render the App component without crashing", () => {
    //render(<App />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  test("should select the children that is being passed to do CustomInput component", () => {
    screen.getAllByText("Input:"); //implicit assertion, also we can put regular expression /Input/
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
    screen.getAllByRole("textbox");
    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument(); //we can also make try/catch for wrong situation
    //expect(screen.getAllByRole("textbox")[1]).toBeInTheDocument(); //for explicit multiple element
    expect(screen.getAllByRole("textbox").length).toEqual(1); //we have two input element, we are testing it
  });

  test("should select a label element by its text", () => {
    screen.getByLabelText("Input:");
    expect(screen.getByLabelText("Input:")).toBeInTheDocument(); //RTL accepts label as one, we do not need to make it multiple testing
  });

  test("should select a input element by its placeholder text", () => {
    screen.getAllByPlaceholderText("Example");
    expect(screen.getAllByPlaceholderText("Example")).toBeInTheDocument();
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

describe("when the component fetches the user successfully", () => {
  beforeEach(() => {
    mockGetUser.mockClear(); //we clear all information stored in the mock
  });

  test("should call getUser once", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });

  test("should render the username passed", async () => {
    const name = "John"; //created name
    mockGetUser.mockImplementationOnce(() =>
      Promise.resolve({ id: "1", name })
    );
    render(<App />);
    expect(screen.queryByText(/Username/)).toBeNull();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
    expect(await screen.findByText(/name/)).toBeInTheDocument();
  });

  //or

  // test("should render the username passed", async () => {
  //   const name = 'John';  //created name
  //   mockGetUser.mockResolvedValueOnce({id: '1', name});
  //   render(<App />);
  //   expect(screen.queryByText(/Username/)).toBeNull();
  //   expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  //   expect(await screen.findByText(/name/)).toBeInTheDocument();
  // });
});

describe("When the user enters some text in the input element", () => {
  test("should display the text in the screen", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled()); //after enter text in the input, rerendering and we implemented this test before
    // eslint-disable-next-line jest/valid-expect
    expect(screen.getByText(/You types: .../))
    //target logic is like event.target.value for handleChange function
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "David" },
    });
    expect(screen.getByText(/You types: David/)).toBeInTheDocument();
    //expect(screen.getByText(/You types: David/));
  });
});
