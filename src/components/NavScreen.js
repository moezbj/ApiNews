import WebPage from "./WebPage";
import HomePage from "./HomePage";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

const NavScreen = StackNavigator({
  Home: { screen: HomePage },
  WebPage: { screen: WebPage }
});
export default NavScreen;
