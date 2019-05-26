import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("renders landing page", () => {
    const page = renderer.create(<LandingPage />).toJSON();
    expect(page).toMatchSnapshot();
  });

  it("renders register page", () => {
    const page = renderer.create(<Register />).toJSON();
    expect(page).toMatchSnapshot();
  });

  it("renders login page", () => {
    const page = renderer.create(<Login />).toJSON();
    expect(page).toMatchSnapshot();
  });
});
