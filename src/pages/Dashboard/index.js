import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Screen, Heading, Card, Subtitle, Caption, Text} from '@shoutem/ui';

import {LineChart, BarChart} from 'react-native-chart-kit';
const screenWidth = Math.round(Dimensions.get('window').width);

import {View, SafeAreaView, ScrollView} from 'react-native';
import HeaderComponent from '../../components/atoms/Header';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'age',
    };
  }
  render() {
    const {selected} = this.state;
    const {handleMenu} = this.props;
    return (
      <Screen>
        <HeaderComponent handleMenu={handleMenu} />
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Heading style={styles.imageTitle}>Dashboard</Heading>
              <Card style={styles.card}>
                <View styleName="content">
                  <Heading>Shared by Drummer</Heading>
                  <Caption>Total Shared</Caption>
                  <Subtitle>179</Subtitle>
                  <LineChart
                    style={styles.chart}
                    data={data}
                    width={screenWidth - 64}
                    height={200}
                    chartConfig={chartConfig}
                    withShadow={false}
                    fromZero={true}
                    withHorizontalLabels={false}
                  />
                </View>
              </Card>
              <Card style={styles.card}>
                <View styleName="content">
                  <Heading>Demographics</Heading>
                  <View style={styles.switch}>
                    <View style={styles.switchOptionsDefault}>
                      <Text
                        style={
                          selected === 'age' ? styles.selectedOption : null
                        }
                        onPress={() => this.setState({selected: 'age'})}>
                        Age
                      </Text>
                    </View>
                    <View style={styles.switchOptionsDefault}>
                      <Text
                        onPress={() => this.setState({selected: 'gender'})}
                        style={
                          selected === 'gender' ? styles.selectedOption : null
                        }>
                        Gender
                      </Text>
                    </View>
                  </View>
                  <Caption>Total Shared</Caption>
                  <Subtitle>179</Subtitle>
                  {selected === 'age' && (
                    <BarChart
                      style={styles.chart}
                      data={demographic}
                      width={screenWidth - 64}
                      height={200}
                      chartConfig={chartConfig}
                      withShadow={false}
                      fromZero={true}
                    />
                  )}
                  {selected === 'gender' && (
                    <BarChart
                      style={styles.chart}
                      data={genderData}
                      width={screenWidth - 64}
                      height={200}
                      chartConfig={chartConfig}
                      withShadow={false}
                      fromZero={true}
                    />
                  )}
                </View>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Screen>
    );
  }
}

const demographic = {
  labels: ['20', '24', '25', '23'],
  datasets: [
    {
      data: [20, 45, 28, 80],
    },
  ],
};

const genderData = {
  labels: ['male', 'female', 'other'],
  datasets: [
    {
      data: [100, 100, 100],
    },
  ],
};

const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [80, 90, 60, 100, 110, 70, 120],
      color: () => '#56b4a6', // optional
      strokeWidth: 2, // optional
    },
  ],
};

const styles = {
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 70,
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 24,
    width: null,
    padding: 16,
    elevation: 2,
    borderRadius: 10,
  },
  chart: {
    marginBottom: 20,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  switchOptionsDefault: {
    width: 50,
    height: 50,
  },
  selectedOption: {
    color: '#53b5a8',
    fontWeight: 'bold',
  },
};

export default Dashboard;
