import { expectSaga } from "redux-saga-test-plan";
import { fromJS } from "immutable";
import { call, put, take } from "redux-saga/effects";
import * as matchers from "redux-saga-test-plan/matchers";
import ConfirmationSuccess from "../ConfirmationSuccess";
import { actionTypes } from "../../constants";

describe("ConfirmationSuccess", () => {
  it("dispatches show modals and notification", () => {
    const accessToken = "token";

    return expectSaga(ConfirmationSuccess)
      .put({ type: "STORE_TOKEN_REQUEST", accessToken })
      .put({ type: "GET_CURRENT_ACCOUNT_REQUEST" })
      .put({ type: "HIDE_MODAL", data: { id: "CONFIRMATION_MODAL" } })
      .dispatch({
        type: actionTypes.CONFIRMATION_SUCCESS,
        accessToken,
      })
      .put({
        id: undefined,
        type: "CREATE_NOTIFICATION",
        notification: {
          level: "success",
          message: "Account successfully confirmed! You are now logged in",
        },
      })
      .run({ silenceTimeout: true });
  });
});
