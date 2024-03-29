import { expectSaga } from "redux-saga-test-plan";
import { call, put, take } from "redux-saga/effects";
import * as matchers from "redux-saga-test-plan/matchers";
import { fromJS } from "immutable";
import MockAdapter from "axios-mock-adapter";
import HTTP from "../../../lib/utils/HTTP";
import * as AccountSources from "../../sources";
import FetchCurrentUserInformation from "../FetchCurrentUserInformation";

import rootReducer from "../../../reducer";

describe("FetchCurrentUserInformation", () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(HTTP);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it("dispatches expected actions when all API calls are successful", async () => {
    const mockUser = { id: 42 };
    const mockProfile = { id: 1, name: "name" };
    const mockProfilesResponse = { profiles: [mockProfile] };
    mockAxios.onGet("api/current_user").reply(200, mockUser);
    mockAxios
      .onGet("api/current_user/profiles")
      .reply(200, mockProfilesResponse);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AccountSources.currentUser), mockUser])
      .provide([call(AccountSources.currentUserProfiles), mockProfilesResponse])
      .put({ type: "GET_CURRENT_USER_SUCCESS", user: mockUser })
      .put({
        type: "GET_CURRENT_USER_PROFILES_SUCCESS",
        profiles: [mockProfile],
      })
      .put({ type: "SET_CURRENT_USER_PROFILE", profileId: mockProfile.id })
      .dispatch({ type: "GET_CURRENT_ACCOUNT_REQUEST" })
      .run({ silenceTimeout: true });
  });

  it("dispatches GET_CURRENT_USER_FAILURE when AuthenticationSources.currentUser fails", () => {
    const mockUser = { id: 42, name: "Tucker" };
    const mockProfileResponse = { error: "Something went wrong" };
    mockAxios.onGet("api/current_user").reply(200, mockUser);
    mockAxios
      .onGet("api/current_user/profiles")
      .reply(400, mockProfileResponse);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AccountSources.currentUser), mockUser])
      .provide([call(AccountSources.currentUserProfiles), mockProfileResponse])
      .put({ type: "GET_CURRENT_USER_FAILURE" })
      .put({ type: "GET_CURRENT_USER_PROFILES_FAILURE" })
      .dispatch({ type: "GET_CURRENT_ACCOUNT_REQUEST" })
      .run({ silenceTimeout: true });
  });

  it("dispatches GET_CURRENT_USER_PROFILES_FAILURE when AuthenticationSources.currentUserProfiles fails", () => {
    const mockUser = { id: 42, name: "Tucker" };
    const mockProfileResponse = { error: "Something went wrong" };
    mockAxios.onGet("api/current_user").reply(400, mockUser);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AccountSources.currentUser), mockUser])
      .provide([call(AccountSources.currentUserProfiles), mockProfileResponse])
      .put({ type: "GET_CURRENT_USER_FAILURE" })
      .put({ type: "GET_CURRENT_USER_PROFILES_FAILURE" })
      .dispatch({ type: "GET_CURRENT_ACCOUNT_REQUEST" })
      .run({ silenceTimeout: true });
  });
});
