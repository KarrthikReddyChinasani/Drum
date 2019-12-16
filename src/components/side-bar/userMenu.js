/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import {USER_MENU_SCREENS, USER_MENU_SCREENS_ITEMS} from './constants';
import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/Profile';
import SideBar from './sidebar';
import {CustomStatusBar} from '../atoms/status-bar';
import Offers from '../../pages/Offers';

const menuItems = (handleMenu, navigation) => {
  return USER_MENU_SCREENS.map((item, index) => {
    return {
      style: USER_MENU_SCREENS_ITEMS[index].style,
      title: USER_MENU_SCREENS_ITEMS[index].title,
      icon: (
        <Icon
          name={USER_MENU_SCREENS_ITEMS[index].icon}
          size={24}
          color="#46b6a6"
        />
      ),
      renderScene: (
        <LoadChild
          navigation={navigation}
          type={item}
          handleMenu={handleMenu}
        />
      ),
    };
  });
};

const LoadChild = ({type, handleMenu, navigation}) => {
  switch (type) {
    case 'dashboard':
      return <Dashboard navigation={navigation} handleMenu={handleMenu} />;
    case 'offers':
      return <Offers navigation={navigation} handleMenu={handleMenu} />;
    case 'profile':
      return <Profile navigation={navigation} handleMenu={handleMenu} />;
    default:
      return <Profile navigation={navigation} handleMenu={handleMenu} />;
  }
};

export default class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <CustomStatusBar color="#FFF" />
        <SideBar
          active={this.state.menuOpen}
          onMenuPress={this.handleMenu.bind(this)}
          backgroundColor={'#FFF'}
          menuTextStyles={{
            color: '#000',
          }}
          handleBackPress={true}
          menuItems={menuItems(
            this.handleMenu.bind(this),
            this.props.navigation,
          )}
        />
      </View>
    );
  }
  handleMenu() {
    const {menuOpen} = this.state;
    this.setState({
      menuOpen: !menuOpen,
    });
  }
}
