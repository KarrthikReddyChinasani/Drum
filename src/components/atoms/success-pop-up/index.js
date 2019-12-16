/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Icon, Title, Subtitle, Card, Image, Button} from '@shoutem/ui';
import StarRating from 'react-native-star-rating';

import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class SuccessPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {modalVisible, closePopup} = this.props;
    return (
      <Modal hideModalContentWhileAnimating={true} isVisible={modalVisible}>
        <View style={{backgroundColor: '#FFFFFF', padding: 32}}>
          <View>
            <Icon name="checkbox-on" style={{color: '#46b6a6'}} />
            <Title style={{fontSize: 24, fontweight: 'bold'}}>
              Offer Published
            </Title>
            <Subtitle style={{fontSize: 20, fontweight: 'bold'}}>
              Your offer is live now
            </Subtitle>
            <Card style={styles.descriptionCard}>
              <Image
                styleName="medium-wide"
                styles={{width: '100%'}}
                source={{
                  uri: `https://picsum.photos/${screenWidth}/360`,
                }}
              />
              <View styleName="content">
                <View style={styles.ratingbar}>
                  <View>
                    <Icon name="facebook" style={styles.icon} />
                  </View>
                  <View>
                    <Text style={styles.ratingText}>4.6</Text>
                  </View>
                  <View style={styles.ratingStars}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={4.6}
                      starSize={16}
                      fullStarColor={'#fabc13'}
                    />
                  </View>
                  <View>
                    <Text> (230) </Text>
                  </View>
                </View>
              </View>
            </Card>
            <Button
              style={{
                padding: 16,
                backgroundColor: '#46b6a6',
                borderWidth: 0,
                marginTop: 16,
              }}
              styleName="secondary"
              onPress={() => closePopup()}>
              <Text style={{color: '#FFFFFF'}}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 70,
  },
  ratingbar: {
    marginTop: 12,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#3B5998',
    fontSize: 32,
  },
  ratingText: {
    fontSize: 20,
    paddingLeft: 8,
  },
  ratingStars: {
    paddingLeft: 8,
  },
  description: {
    width: '100%',
    marginTop: 32,
  },
  descriptionCard: {
    width: null,
    padding: 16,
    elevation: 2,
    borderRadius: 10,
  },
  locationContainer: {
    marginTop: 32,
  },
  locationCard: {
    width: null,
    elevation: 2,
  },
  locationImage: {
    width: '100%',
    height: 0.6 * (screenWidth - 32),
  },
  locationContent: {
    padding: 16,
  },
  locationHeading: {
    marginBottom: 16,
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default SuccessPopUp;
