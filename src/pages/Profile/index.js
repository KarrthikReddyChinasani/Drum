import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import HeaderComponent from '../../components/atoms/Header';
import {Screen, Heading, Icon, Text, Card, Subtitle, Image} from '@shoutem/ui';
import StarRating from 'react-native-star-rating';
import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {handleMenu} = this.props;
    return (
      <Screen>
        <HeaderComponent handleMenu={handleMenu} />
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Heading style={styles.imageTitle}>Midtown arts Salon</Heading>
              <View>
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
              <View style={styles.description}>
                <Card style={styles.descriptionCard}>
                  <View styleName="content">
                    <Heading>Description</Heading>
                    <Subtitle>
                      {'\n'}
                      From 1 salon to over 600 salons across India, all it took
                      was one woman’s passion. This drove Naturals to become
                      India’s No.1 hair and beauty salon. {'\n\n'}At Naturals,
                      we believe in financial independence for women and have
                      empowered 300+ women to become entrepreneurs in the past
                      16 years. Our dream is to create a housewife-free India,
                      where women are encouraged to earn their living by
                      pursuing their passion. By 2020, Naturals aims to create
                      1000 salons, empower 1000 women entrepreneurs and create
                      50,000 jobs, because there is no better style statement
                      than standing on your own feet.
                      {'\n'}
                    </Subtitle>
                  </View>
                </Card>
              </View>
              <View style={styles.locationContainer}>
                <Heading style={styles.locationHeading}>Location</Heading>
                <Card style={styles.locationCard}>
                  <Image
                    style={styles.locationImage}
                    styleName="medium-wide"
                    source={{
                      uri: 'https://staticmapmaker.com/img/google@2x.png',
                    }}
                  />
                  <View styleName="content" style={styles.locationContent}>
                    <Heading>1500, Bryant Street San Francisco, CA</Heading>
                  </View>
                </Card>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Screen>
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

export default Profile;
