import { getErrorMessage } from "..";

it("returns an error message when it's an error", () => {
    const myError = new Error("it's an error");
    const myErrorMessage = getErrorMessage(myError);
    expect(myErrorMessage).toEqual("it's an error")
})

it("returns a string message when it's not an error", () => {
    const myError = "it's an error";
    const myErrorMessage = getErrorMessage(myError);
    expect(myErrorMessage).toEqual("it's an error")
})