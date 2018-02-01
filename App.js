import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  scrollY = new Animated.Value(height);

  componentDidMount() {
    this.animatedScrollView._component.scrollTo({
      x: 0,
      y: height,
      animated: false,
    });
  }

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
            style={[
              styles.sunMoon,
              {
                backgroundColor: 'orange',
                transform: [
                  {
                    translateY: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [height, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.sunMoon,
              {
                backgroundColor: 'gray',
                top: -width / 2,
                transform: [
                  {
                    translateY: this.scrollY.interpolate({
                      inputRange: [0, height],
                      outputRange: [0, -height],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
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
    color: 'white',
  },
  sunMoonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunMoon: {
    width: width / 2,
    height: width / 2,
    borderRadius: width / 2 / 2,
  },
});
