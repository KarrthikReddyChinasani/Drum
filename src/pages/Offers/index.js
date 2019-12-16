/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Screen,
  Text,
  Button,
  Title,
  ListView,
  Tile,
  Subtitle,
  Divider,
  Image,
  Caption,
} from '@shoutem/ui';
import HeaderComponent from '../../components/atoms/Header';
import PopUp from '../../components/atoms/popup';
import {Dimensions} from 'react-native';
import SuccessPopUp from '../../components/atoms/success-pop-up';

const screenWidth = Math.round(Dimensions.get('window').width);

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [
        {
          name: 'My Offer 1',
          offer: '20%',
          startDate: '12 Nov 2019',
          endDate: '12 Nov 2020',
          drummerComission: '20 $',
          image: {
            url: `https://picsum.photos/${screenWidth}/360`,
          },
        },
        {
          name: 'My Offer 2',
          offer: '40%',
          startDate: '7 June 2020',
          endDate: '7 July 2020',
          drummerComission: '30 $',
          image: {
            url: `https://picsum.photos/${screenWidth}/360`,
          },
        },
        {
          name: 'My Offer 3',
          offer: '50%',
          startDate: '12 Nov 2019',
          endDate: '12 Nov 2020',
          drummerComission: '15 $',
          image: {
            url: `https://picsum.photos/${screenWidth}/360`,
          },
        },
        {
          name: 'My Offer 4',
          offer: '60%',
          startDate: '16 Dec 2019',
          endDate: '15 Nov 2020',
          drummerComission: '20%',
          image: {
            url: `https://picsum.photos/${screenWidth}/360`,
          },
        },
      ],
      isShowModal: false,
      isSucceessShowModal: false,
    };
  }

  renderRow(offer) {
    if (!offer) {
      return null;
    }

    return (
      <View>
        <Tile>
          <Image
            styleName="large-banner"
            source={{
              uri: offer.image.url,
            }}
          />
          <View styleName="content" style={{padding: 16}}>
            <Title>{offer.name}</Title>
            <View styleName="horizontal space-between">
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Caption>Offered From :</Caption>
                <Subtitle> {offer.startDate}</Subtitle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Caption>Offered Till :</Caption>
                <Subtitle> {offer.endDate}</Subtitle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Caption>Drummer Commission: </Caption>
                <Subtitle> {offer.drummerComission}</Subtitle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3,
                    textAlign: 'center',
                    padding: 8,
                  }}>
                  <Text>Buyer Views</Text>
                  <Subtitle style={{color: '#46b6a6'}}>
                    {Math.floor(Math.random() * 100 + 1)}
                  </Subtitle>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3,
                    textAlign: 'center',
                    padding: 8,
                  }}>
                  <Text>Saved</Text>
                  <Subtitle style={{color: '#46b6a6'}}>
                    {Math.floor(Math.random() * 100 + 1)}
                  </Subtitle>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3,
                    textAlign: 'center',
                    padding: 8,
                  }}>
                  <Text>Reedeemed</Text>
                  <Subtitle style={{color: '#46b6a6'}}>
                    {Math.floor(Math.random() * 100 + 1)}
                  </Subtitle>
                </View>
              </View>
            </View>
          </View>
        </Tile>
        <Divider styleName="line" />
      </View>
    );
  }

  closeModel = () => {
    this.setState({
      isShowModal: false,
    });
  };

  publishOffer = offerData => {
    const {
      drummerComission,
      endDate,
      offerName,
      offerPercent,
      startDate,
    } = offerData;
    const offerToPublish = {
      name: offerName,
      offer: offerPercent,
      startDate,
      endDate,
      drummerComission,
      image: {
        url: `https://picsum.photos/${screenWidth}/360`,
      },
    };
    const newOffers = [offerToPublish, ...this.state.offers];
    this.setState({
      offers: newOffers,
    });
    this.closeModel();
    this.setState({
      isSucceessShowModal: true,
    });
  };

  closeSuccessPopup = () => {
    this.setState({
      isSucceessShowModal: false,
    });
  };

  render() {
    const {handleMenu} = this.props;
    const {offers, isShowModal, isSucceessShowModal} = this.state;
    return (
      <Screen>
        <HeaderComponent handleMenu={handleMenu} />
        <SafeAreaView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Title
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                  marginTop: 8,
                  color: '#46b6a6',
                }}>
                Offers
              </Title>
              <Button
                style={{flex: 1}}
                onPress={() => this.setState({isShowModal: true})}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  Create Offer
                </Text>
              </Button>
            </View>
          </View>
          <ListView
            style={styles.scrollView}
            data={offers}
            renderRow={this.renderRow}
          />
          <PopUp
            modalVisible={isShowModal}
            setModalVisible={this.closeModel}
            publishOffer={this.publishOffer}
          />
          <SuccessPopUp
            modalVisible={isSucceessShowModal}
            closePopup={this.closeSuccessPopup}
          />
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
  },
  scrollView: {
    padding: 16,
    marginBottom: 200,
  },
};

export default Offers;
