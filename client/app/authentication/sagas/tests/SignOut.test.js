import { expectSaga } from "redux-saga-test-plan";
import { call, put, take } from "redux-saga/effects";
import * as matchers from "redux-saga-test-plan/matchers";
import * as TokenStorage from "../../services/TokenStorage";
import * as AuthenticationSources from "../../sources";
import SignOut from "../SignOut";

describe("SignOut", () => {
  it("dispatches SIGN_OUT_SUCCESS when services is successful", () => {
    TokenStorage.remove = jest.fn(() => Promise.resolve(null));
    AuthenticationSources.signOut = jest.fn(() => Promise.resolve({}));

    return expectSaga(SignOut)
      .provide([call(TokenStorage.remove)])
      .put({ type: "REMOVE_TOKEN_REQUEST" })
      .put({
        id: undefined,
        type: "CREATE_NOTIFICATION",
        notification: {
          level: "success",
          message: "Signed out successfully!",
        },
      })
      .dispatch({ type: "SIGN_OUT_REQUEST" })
      .run({ silenceTimeout: true });
  });

  it("dispatches REMOVE_TOKEN_REQUEST, and REMOVE_CURRENT_ACCOUNT_REQUEST when AuthenticationSources.signOut fails", () => {
    TokenStorage.remove = jest.fn(() => Promise.resolve("cookie purged"));
    const mockResponse = { response: { data: { error: "Error" } } };
    AuthenticationSources.signOut = jest.fn(() => Promise.reject(mockResponse));

    return expectSaga(SignOut)
      .provide([call(TokenStorage.remove)])
      .provide([call(AuthenticationSources.signOut)])
      .dispatch({ type: "REMOVE_TOKEN_REQUEST" })
      .dispatch({ type: "REMOVE_CURRENT_ACCOUNT_REQUEST" })
      .run({ silenceTimeout: true });
  });

  it("dispatches REMOVE_TOKEN_REQUEST, and REMOVE_CURRENT_ACCOUNT_REQUEST when TokenStorage.remove fails", () => {
    TokenStorage.remove = jest.fn(() => Promise.reject("Error"));

    return expectSaga(SignOut)
      .provide([call(TokenStorage.remove)])
      .dispatch({ type: "REMOVE_TOKEN_REQUEST" })
      .dispatch({ type: "REMOVE_CURRENT_ACCOUNT_REQUEST" })
      .run({ silenceTimeout: true });
  });
});
