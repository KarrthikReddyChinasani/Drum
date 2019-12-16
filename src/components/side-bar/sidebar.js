import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

const AnimatedMenu = ({
  stagArr,
  self,
  menuItems,
  animatedStagArr,
  menuTextStyles,
}) =>
  stagArr.map(index => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={self._handlePress.bind(self, index)}>
        <Animated.View
          style={{transform: [{translateX: animatedStagArr[index]}]}}>
          <View style={styles.menuItemContainer}>
            {menuItems[index].style === 'menu-item' && menuItems[index].icon}
            <Text
              style={[
                menuItems[index].style === 'menu-item'
                  ? styles.menuItem
                  : styles.subMenuItem,
                {...menuTextStyles},
              ]}>
              {menuItems[index].title}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  });

class SideBar extends Component {
  constructor(props) {
    super(props);
    this._hardwareBackHandler = this._hardwareBackHandler.bind(this);
    this.state = {
      activityLeftPos: new Animated.Value(0),
      scaleSize: new Animated.Value(1.0),
      rotate: new Animated.Value(0),
      animationDuration: 200,
      stagArr: [],
      animatedStagArr: [],
      menuItems: this.props.menuItems,
      activeMenu: 0,
    };
  }

  // staggered animation configuration for menu items
  componentDidMount() {
    let stagArrNew = [];
    for (let i = 0; i < this.state.menuItems.length; i++) {
      stagArrNew.push(i);
    }
    this.setState({stagArr: stagArrNew});

    let animatedStagArrNew = [];
    stagArrNew.forEach(value => {
      animatedStagArrNew[value] = new Animated.Value(0);
    });
    this.setState({animatedStagArr: animatedStagArrNew});
  }

  // any update to component will fire the animation
  componentDidUpdate() {
    this._animateStuffs();

    if (this.props.handleBackPress && this.props.active) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this._hardwareBackHandler,
      );
    }

    if (this.props.handleBackPress && !this.props.active) {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._hardwareBackHandler,
      );
    }
  }

  render() {
    const rotateVal = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '0deg'],
    });

    return (
      <View
        style={[
          styles.offCanvasContainer,
          {
            flex: 1,
            backgroundColor: this.props.backgroundColor,
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Animated.View style={styles.menuItemsContainer}>
            <AnimatedMenu
              stagArr={this.state.stagArr}
              self={this}
              animatedStagArr={this.state.animatedStagArr}
              menuItems={this.state.menuItems}
              menuTextStyles={this.props.menuTextStyles}
            />
          </Animated.View>
        </ScrollView>

        <Animated.View
          onStartShouldSetResponder={() => this.props.active}
          onResponderTerminationRequest={() => true}
          onResponderRelease={evt => this._gestureControl(evt)}
          style={[
            styles.activityContainer,
            {
              flex: 1,
              backgroundColor: this.props.backgroundColor,
              transform: [
                {translateX: this.state.activityLeftPos},
                {scale: this.state.scaleSize},
                {rotateY: rotateVal},
              ],
            },
          ]}>
          {this.state.menuItems[this.state.activeMenu].renderScene}
        </Animated.View>
      </View>
    );
  }

  // press on any menu item, render the respective scene
  _handlePress(index) {
    this.setState({activeMenu: index});
    this.props.onMenuPress();
  }

  _hardwareBackHandler() {
    this.props.onMenuPress();
    return true;
  }

  // control swipe left or right reveal for menu
  _gestureControl(evt) {
    const {locationX, pageX} = evt.nativeEvent;
    if (!this.props.active) {
      if (locationX < 40 && pageX > 100) {
        this.props.onMenuPress();
      }
    } else {
      if (pageX) {
        this.props.onMenuPress();
      }
    }
  }

  // animate stuffs with hard coded values for fine tuning
  _animateStuffs() {
    const activityLeftPos = this.props.active ? 150 : 0;
    const scaleSize = this.props.active ? 0.8 : 1;
    const rotate = this.props.active ? 1 : 0;
    const menuTranslateX = this.props.active ? 0 : -150;

    Animated.parallel([
      Animated.timing(this.state.activityLeftPos, {
        toValue: activityLeftPos,
        duration: this.state.animationDuration,
      }),
      Animated.timing(this.state.scaleSize, {
        toValue: scaleSize,
        duration: this.state.animationDuration,
      }),
      Animated.timing(this.state.rotate, {
        toValue: rotate,
        duration: this.state.animationDuration,
      }),
      Animated.stagger(
        50,
        this.state.stagArr.map(item => {
          if (this.props.active) {
            return Animated.timing(this.state.animatedStagArr[item], {
              toValue: menuTranslateX,
              duration: this.state.animationDuration,
              delay: 0,
            });
          } else {
            return Animated.timing(this.state.animatedStagArr[item], {
              toValue: menuTranslateX,
              duration: this.state.animationDuration,
              delay: 0,
            });
          }
        }),
      ),
    ]).start();
  }
}

// validate props
SideBar.propTypes = {
  active: PropTypes.bool.isRequired,
  onMenuPress: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string,
  menuTextStyles: PropTypes.object,
  handleBackPress: PropTypes.bool,
};

// set default props
SideBar.defaultProps = {
  backgroundColor: '#FFF',
  menuTextStyles: {color: 'white'},
  handleBackPress: true,
};

export default SideBar;

// structure stylesheet
const styles = StyleSheet.create({
  offCanvasContainer: {},
  menuItemsContainer: {
    paddingTop: 30,
  },
  menuItemContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    fontWeight: 'bold',
    paddingLeft: 12,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#000',
  },
  subMenuItem: {
    paddingLeft: 12,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#1A1824',
  },
  activityContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
