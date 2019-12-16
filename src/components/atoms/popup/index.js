/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {TextInput, Button, Icon} from '@shoutem/ui';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerName: '',
      offerPercent: '',
      startDate: '',
      endDate: '',
      drummerComission: '',
    };
  }

  handleTextChange(type, event) {
    this.setState({[type]: event});
  }

  render() {
    const {modalVisible, setModalVisible, publishOffer} = this.props;
    return (
      <Modal hideModalContentWhileAnimating={true} isVisible={modalVisible}>
        <View style={{backgroundColor: '#FFFFFF', padding: 32}}>
          <View>
            <View style={styles.navBarLeftButton}>
              <Icon
                name="close"
                style={{color: '#46b6a6'}}
                onPress={() => {
                  setModalVisible();
                }}
              />
            </View>
            <TextInput
              placeholder={'Offer Name'}
              autoFocus
              onChangeText={e => this.handleTextChange('offerName', e)}
            />
            <TextInput
              placeholder={'Offer Percentange'}
              onChangeText={e => this.handleTextChange('offerPercent', e)}
            />
            <TextInput
              placeholder={'Offer Starting date'}
              onChangeText={e => this.handleTextChange('startDate', e)}
            />
            <TextInput
              placeholder={'Offer Ending date'}
              onChangeText={e => this.handleTextChange('endDate', e)}
            />
            <TextInput
              placeholder={'Commission to drummer'}
              onChangeText={e => this.handleTextChange('drummerComission', e)}
            />
            <Button
              style={{padding: 16, backgroundColor: '#46b6a6', borderWidth: 0}}
              styleName="secondary"
              onPress={() => publishOffer(this.state)}>
              <Text style={{color: '#FFFFFF'}}>PUBLISH</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  navBarLeftButton: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
};

export default PopUp;
