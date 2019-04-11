import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient, Svg } from 'expo';

const { width, height } = Dimensions.get('window');
const TOP_OFFSET_FOR_IPHONE_10 = 0;

export default class App extends React.Component {
  state = {
    minutesWidth: 0,
    minutesHeight: 0,
  };

  scrollY = new Animated.Value(height);

  componentDidMount() {
    StatusBar.setHidden(true);

    this.animatedScrollView._component.scrollTo({
      x: 0,
      y: height,
      animated: false,
    });
  }

  measureMinutesHeight = ({ nativeEvent }) => {
    this.setState({
      minutesWidth: nativeEvent.layout.width,
      minutesHeight: nativeEvent.layout.height,
    });
  };

  render() {
    return (
      <View>
        <View style={{ top: TOP_OFFSET_FOR_IPHONE_10 }}>
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
              },
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
                      outputRange: [-TOP_OFFSET_FOR_IPHONE_10, -height * 9], // Use 9 to account for initial height which is height * 1
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

          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                opacity: this.scrollY.interpolate({
                  inputRange: [0, height * 0.3, height],
                  outputRange: [0.75, 0, 0],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Image
                style={{ top: -TOP_OFFSET_FOR_IPHONE_10 }}
                source={require('./stars.png')}
              />
            </Animated.View>
          </View>

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
                    backgroundColor: '#F78831',
                    shadowColor: '#FFAD14',
                    shadowRadius: 24,
                    shadowOpacity: 0.75,
                  },
                ]}
              />
              <Svg
                style={{ position: 'absolute' }}
                width={width * 0.5}
                height={width * 0.5}
              >
                <Svg.Defs>
                  <Svg.RadialGradient
                    id="sun-a"
                    cy="51.108%"
                    r="51.845%"
                    fx="50%"
                    fy="51.108%"
                  >
                    <Svg.Stop offset="0" stopColor="#F0CB00" />
                    <Svg.Stop offset="1" stopColor="#FA8D36" />
                  </Svg.RadialGradient>
                </Svg.Defs>
                <Svg.Circle
                  cx={width * 0.5 / 2}
                  cy={width * 0.5 / 2}
                  r={width * 0.5 / 2}
                  fill="url(#sun-a)"
                  fillRule="evenodd"
                />
              </Svg>
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
                    backgroundColor: '#58585D',
                    shadowColor: '#6F7179',
                    shadowRadius: 24,
                    shadowOpacity: 0.5,
                  },
                ]}
              />
              <Svg
                style={{ position: 'absolute' }}
                width={width * 0.5}
                height={width * 0.5}
              >
                <Svg.Defs>
                  <Svg.RadialGradient
                    id="sun-a"
                    cy="51.108%"
                    r="51.845%"
                    fx="50%"
                    fy="51.108%"
                  >
                    <Svg.Stop offset="0" stopColor="#A3A3A3" />
                    <Svg.Stop offset="1" stopColor="#58585D" />
                  </Svg.RadialGradient>
                </Svg.Defs>
                <Svg.Circle
                  cx={width * 0.5 / 2}
                  cy={width * 0.5 / 2}
                  r={width * 0.5 / 2}
                  fill="url(#sun-a)"
                  fillRule="evenodd"
                />
              </Svg>
            </Animated.View>

            <View
              style={{
                overflow: 'hidden',
                height: this.state.minutesHeight,
                flexDirection: 'row',
                position: 'absolute',
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: this.state.minutesWidth,
                  height: this.state.minutesHeight,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateY: this.scrollY.interpolate({
                            inputRange: [0, height],
                            outputRange: [-this.state.minutesHeight * 1, 0],
                          }),
                        },
                      ],
                    }}
                  >
                    <View style={styles.clockTextContainer}>
                      <Text style={styles.clockTextStyle}>5</Text>
                    </View>
                    <View style={styles.clockTextContainer}>
                      <Text style={styles.clockTextStyle}>6</Text>
                    </View>
                  </Animated.View>
                </View>
              </View>

              <View>
                <View style={styles.clockTextContainer}>
                  <Text style={styles.clockTextStyle}>:</Text>
                </View>
              </View>

              <View
                style={{
                  width: this.state.minutesWidth,
                  height: this.state.minutesHeight,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateY: this.scrollY.interpolate({
                            inputRange: [0, height],
                            outputRange: [-this.state.minutesHeight * 5+2, 0],
                          }),
                        },
                      ],
                    }}
                  >
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
                  </Animated.View>
                </View>
              </View>

              <View
                style={{
                  width: this.state.minutesWidth,
                  height: this.state.minutesHeight,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateY: this.scrollY.interpolate({
                            inputRange: [0, height],
                            outputRange: [
                              -this.state.minutesHeight * 59 + 19,
                              -this.state.minutesHeight,
                            ],
                          }),
                        },
                      ],
                    }}
                  >
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
                  </Animated.View>
                </View>
              </View>
            </View>
          </View>

          <SafeAreaView
            pointerEvents="none"
            style={{
              overflow: 'visible',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: height,
            }}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: height * 0.45,
                backgroundColor: '#232E37',
              }}
            />
            <View style={{ position: 'absolute', bottom: 48, left: 40 }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: '#505F68',
                }}
              >
                <Image
                  style={{ tintColor: 'white' }}
                  source={require('./clock.png')}
                />
              </View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.45,
                  left: 0,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.3, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="314" height="160">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#394A53" />
                      <Svg.Stop offset="100%" stopColor="#0C121B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="157 0 314 160 0 160"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -width * 0.45,
                  left: width * 0.3,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.3, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="18" height="34">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#2A822D" />
                      <Svg.Stop offset="100%" stopColor="#0F362B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="9 0 18 34 0 34"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.32,
                  left: -width * 0.4,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.5, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="314" height="160">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#55606A" />
                      <Svg.Stop offset="100%" stopColor="#1E272F" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="157 0 314 160 0 160"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.5,
                  left: height * 0.4,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.5, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="480" height="240">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#384853" />
                      <Svg.Stop offset="100%" stopColor="#11141C" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="240 0 480 240 0 240"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.5,
                  left: height * 0.2,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="480" height="240">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#FAFEFF" />
                      <Svg.Stop offset="100%" stopColor="#323B42" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="240 0 480 240 0 240"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -width * 0.45,
                  left: width * 0.75,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 1.7, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="119" height="100">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="trees-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#2A822D" />
                      <Svg.Stop offset="100%" stopColor="#0F362B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon fill="url(#trees-a)" points="13 22 26 76 0 76" />
                  <Svg.Polygon
                    fill="url(#trees-a)"
                    points="101.5 20 119 86 84 86"
                  />
                  <Svg.Polygon
                    fill="url(#trees-a)"
                    points="54 0 83 100 25 100"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.3,
                  left: width * 1.1,
                  transform: [
                    { scale: 1.2 },
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.8, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="314" height="160">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#55606A" />
                      <Svg.Stop offset="100%" stopColor="#1E272F" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="157 0 314 160 0 160"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -width * 0.475,
                  left: width * 1.75,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.25, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="29" height="23">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="trees-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#2A822D" />
                      <Svg.Stop offset="100%" stopColor="#0F362B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon fill="url(#trees-a)" points="6 0 12 23 0 23" />
                  <Svg.Polygon fill="url(#trees-a)" points="23 0 29 23 17 23" />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.45,
                  left: width * 2,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.3, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="314" height="160">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#55606A" />
                      <Svg.Stop offset="100%" stopColor="#11141C" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="157 0 314 160 0 160"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -width * 0.4,
                  left: width * 2.3,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="18" height="34">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#2A822D" />
                      <Svg.Stop offset="100%" stopColor="#0F362B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="9 0 18 34 0 34"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.5,
                  left: width * 3.6,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 3.2, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="480" height="240">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#FAFEFF" />
                      <Svg.Stop offset="100%" stopColor="#323B42" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="240 0 480 240 0 240"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -width * 0.4,
                  left: width * 3,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 2.5, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="119" height="100">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="trees-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#2A822D" />
                      <Svg.Stop offset="100%" stopColor="#0F362B" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon fill="url(#trees-a)" points="13 22 26 76 0 76" />
                  <Svg.Polygon
                    fill="url(#trees-a)"
                    points="101.5 20 119 86 84 86"
                  />
                  <Svg.Polygon
                    fill="url(#trees-a)"
                    points="54 0 83 100 25 100"
                  />
                </Svg>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -height * 0.3,
                  left: width * 2.8,
                  transform: [
                    {
                      translateX: this.scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [-width * 3.2, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              >
                <Svg width="314" height="160">
                  <Svg.Defs>
                    <Svg.LinearGradient
                      id="triangle-a"
                      x1="50%"
                      x2="50%"
                      y1="21.289%"
                      y2="100%"
                    >
                      <Svg.Stop offset="0%" stopColor="#55606A" />
                      <Svg.Stop offset="100%" stopColor="#1E272F" />
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Polygon
                    fill="url(#triangle-a)"
                    points="157 0 314 160 0 160"
                  />
                </Svg>
              </Animated.View>
            </View>

            <View style={{ position: 'absolute', bottom: 48, right: 40 }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: '#505F68',
                }}
              >
                <Image
                  style={{ tintColor: 'white' }}
                  source={require('./camera.png')}
                />
              </View>
            </View>
          </SafeAreaView>

          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                top: height * 0.325,
                left: -width * 0.15,
                width: 120,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 1.5, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.5,
                left: width * 0.6,
                width: 144,
                height: 16,
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.1,
                left: width * 0.8,
                width: 144,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 2.5, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.04,
                left: width * 1,
                width: 144,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.2,
                left: width * 1,
                width: 184,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.1,
                left: width * 2,
                width: 104,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 2.9, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.3,
                left: width * 2.3,
                width: 184,
                height: 18,
                borderRadius: 9,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3.2, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.25,
                left: width * 3.8,
                width: 184,
                height: 18,
                borderRadius: 9,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3.1, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                top: height * 0.1,
                left: width * 4,
                width: 184,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: [
                  {
                    translateX: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [-width * 3.1, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
          </View>

          <SafeAreaView pointerEvents="none" style={styles.goldenHourContainer}>
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
                        outputRange: [0, -31],
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
          </SafeAreaView>
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
    top: 0,
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
    top: width * 0.5,
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
  clockTextStyle: {
    fontSize: 64,
    fontWeight: '700',
    color: 'white',
  },
});
