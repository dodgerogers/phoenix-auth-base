import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { fromJS } from "immutable";
import moment from "moment";
import * as SessionTimer from "../../services/SessionTimer";
import SessionRefreshTimer from "../SessionRefreshTimer";

describe("SessionRefreshTimer", () => {
  const accessToken = {
    accessToken: "token",
    createdAt: moment(),
    expiresIn: 1000,
  };

  const initialState = {
    authentication: fromJS({ accessToken }),
  };
  const mockReducer = (state = initialState) => state;

  it("dispatches REFRESH_TOKEN_REQUEST when accessToken is present in state tree", () => {
    SessionTimer.refreshIn = jest.fn(() => 0);

    return expectSaga(SessionRefreshTimer)
      .withReducer(mockReducer)
      .put({ type: "REFRESH_TOKEN_REQUEST" })
      .dispatch({ type: "STORE_TOKEN_SUCCESS" })
      .run({ silenceTimeout: true });
  });

  it("does not call REFRESH_TOKEN_REQUEST when SIGN_OUT_SUCCESS is dispatched", () => {
    SessionTimer.refreshIn = jest.fn(() => 1000);

    return expectSaga(SessionRefreshTimer)
      .withReducer(mockReducer)
      .put({ type: "REFRESH_TOKEN_REQUEST_CANCELLED" })
      .dispatch({ type: "STORE_TOKEN_SUCCESS" })
      .dispatch({ type: "SIGN_OUT_SUCCESS" })
      .run({ silenceTimeout: true });
  });

  it("dispatches REFRESH_TOKEN_FAILURE when SessionTimer throws an error", () => {
    SessionTimer.refreshIn = jest.fn(() => {
      throw "error";
    });

    return expectSaga(SessionRefreshTimer)
      .withReducer(mockReducer)
      .put({ type: "REFRESH_TOKEN_FAILURE" })
      .dispatch({ type: "STORE_TOKEN_SUCCESS" })
      .run({ silenceTimeout: true });
  });
});
