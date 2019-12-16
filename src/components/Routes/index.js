import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Profile from '../../pages/Profile';
import Campaigns from '../../pages/Campaigns';
import Dashboard from '../../pages/Dashboard';
import UserMenu from '../side-bar/userMenu';
import Offers from '../../pages/Offers';

const App = StackNavigator(
  {
    Profile: {screen: Profile},
    Campaigns: {screen: Campaigns},
    UserMenu: {screen: UserMenu},
    Dashboard: {screen: Dashboard},
    Offers: {screen: Offers},
  },
  {
    initialRouteName: 'UserMenu',
    headerMode: 'none',
  },
);

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <App />;
  }
}

export default Routes;
