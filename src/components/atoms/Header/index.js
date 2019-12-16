import React, {Component} from 'react';
import {Image} from 'react-native';
import {NavigationBar, Icon} from '@shoutem/ui';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationBar
        styleName="inline"
        leftComponent={
          <Icon onPress={() => this.props.handleMenu()} name="sidebar" />
        }
        centerComponent={
          <Image
            style={styles.icon}
            source={{
              uri:
                'https://d33wubrfki0l68.cloudfront.net/24b03885cc0807d0b4724aa3bf968821ff2128e2/886af/images/drum-logo.png',
            }}
          />
        }
        share={{
          link: 'http://shoutem.github.io',
          text: 'This is the best',
          title: 'Super cool UI Toolkit',
        }}
      />
    );
  }
}

const styles = {
  icon: {
    width: 200,
    height: 50,
  },
};

export default HeaderComponent;
