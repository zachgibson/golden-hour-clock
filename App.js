import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    minutesHeight: 0,
  };

  scrollY = new Animated.Value(height);

  componentDidMount() {
    this.animatedScrollView._component.scrollTo({
      x: 0,
      y: height,
      animated: false,
    });
  }

  measureMinutesHeight = ({ nativeEvent }) => {
    this.setState({
      minutesHeight: nativeEvent.layout.height,
    });
  };

  render() {
    return (
      <View>
        <Animated.ScrollView
          ref={ref => {
            this.animatedScrollView = ref;
          }}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
        >
          <View style={styles.slide} />
          <View style={styles.slide} />
        </Animated.ScrollView>

        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              height: height * 10,
              transform: [
                {
                  translateY: this.scrollY.interpolate({
                    inputRange: [0, height],
                    outputRange: [0, -height * 9], // Use 9 to account for initial height which is height * 1
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={['#1B2125', '#F0544A', '#F88400', '#D1D6DE']}
          />
        </Animated.View>

        <View pointerEvents="none" style={styles.sunMoonContainer}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  translateY: this.scrollY.interpolate({
                    inputRange: [0, height],
                    outputRange: [height, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <View
              style={[
                styles.sunMoon,
                {
                  backgroundColor: 'orange',
                },
              ]}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  translateY: this.scrollY.interpolate({
                    inputRange: [0, height],
                    outputRange: [0, -height],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <View
              style={[
                styles.sunMoon,
                {
                  backgroundColor: 'gray',
                },
              ]}
            />
          </Animated.View>
          <View
            style={{
              // overflow: 'hidden',
              height: 64,
              backgroundColor: 'pink',
              flexDirection: 'row',
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <View style={styles.clockTextContainer}>
                <Text style={styles.clockTextStyle}>5</Text>
              </View>
            </View>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [
                        -(this.state.minutesHeight * 5),
                        -(this.state.minutesHeight * 9),
                      ],
                    }),
                  },
                ],
              }}
            >
              <View style={{ height: 100 }}>
                <View style={styles.clockTextContainer}>
                  <Text
                    onLayout={this.measureMinutesHeight}
                    style={styles.clockTextStyle}
                  >
                    0
                  </Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [
                        -(this.state.minutesHeight * 30),
                        -(this.state.minutesHeight * 5),
                      ],
                    }),
                  },
                ],
              }}
            >
              <View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>0</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>0</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>0</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>0</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>0</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>1</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>2</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>3</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>4</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>5</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>6</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>7</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>8</Text>
                </View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>9</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.goldenHourContainer}>
          <Text style={styles.goldenHourText}>Golden Hour</Text>
          <View style={styles.goldenHourStatusContainer}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: '#31CD06',
                },
              ]}
            />
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: this.scrollY.interpolate({
                    inputRange: [0, height],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                  backgroundColor: '#EA4052',
                },
              ]}
            />
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [0, -34],
                    }),
                  },
                ],
              }}
            >
              <Text style={styles.goldenHourStatusText}>OVER</Text>
              <Text style={[styles.goldenHourStatusText, { right: -3 }]}>
                NOW
              </Text>
            </Animated.View>
          </View>
        </View>

        <View style={{ position: 'absolute' }}>
          <Text>
            {this.state.minutesHeight}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width,
    height,
  },
  goldenHourContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldenHourText: {
    marginRight: 8,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  goldenHourStatusContainer: {
    overflow: 'hidden',
    height: 40,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  goldenHourStatusText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  sunMoonContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunMoon: {
    width: width / 2,
    height: width / 2,
    borderRadius: width / 2 / 2,
  },
  clockTextContainer: {
    // width: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  clockTextStyle: {
    fontSize: 64,
    fontWeight: '700',
    color: 'white',
  },
});
