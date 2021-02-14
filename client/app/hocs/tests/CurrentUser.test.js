import React from "react";
import { mount } from "enzyme";
import { fromJS } from "immutable";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CurrentUser from "../CurrentUser";

const mockStore = configureStore([thunk]);

describe("CurrentUser", () => {
  const TestComponent = (props) => <p>test</p>;
  const WrappedComponent = CurrentUser(TestComponent);
  const initialState = {
    accounts: fromJS({
      currentUser: {
        id: 1,
      },
      currentProfile: {
        id: 2,
        name: "Bob",
        avatar: "avatar.png",
      },
    }),
  };

  it("injects current user prop into composed component", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    );

    const testComponentProps = wrapper.find(TestComponent).props();
    const currentUser = initialState.accounts.get("currentUser");
    expect(testComponentProps.currentUser).toEqual(currentUser);
  });
});
