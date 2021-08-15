import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import UrlShortenerHistory from './UrlShortenerHistory';
import ShortenUrlForm from './ShortenUrlForm';
import useBellyApi from './useBelyApi';
import DismissKeyboard from './DismissKeyboard';
import Logo from './Logo';

// const bottomGoldenRatioHeightPercent = 61.8;
const bottomGoldenRatioHeightPercent = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputHalf: {
    justifyContent: 'flex-end',
    height: `${100 - bottomGoldenRatioHeightPercent}%`,
    margin: 20,
  },

  outputHalf: {
    backgroundColor: '#fff',
    height: `${bottomGoldenRatioHeightPercent}%`,
  },
  shortenedUrlsList: {
    // backgroundColor: '#999',
  },
  logoWrap: {
    flexShrink: 1,
    marginBottom: 25,
  },
});

const onStartShouldSetResponder = () => true;
const UrlShortenerScreen = () => {
  const scrollRef = useRef(null);
  const {shortenedUrls} = useBellyApi();
  const mostRecentlyAdded =
    shortenedUrls.data[shortenedUrls.data.length - 1] || {};
  const {added} = mostRecentlyAdded;

  useEffect(() => {
    added &&
      scrollRef.current &&
      scrollRef.current.scrollTo({
        y: 0,
        animated: true,
      });
  }, [added]);

  return (
    <DismissKeyboard style={styles.container}>
      <>
        <View style={styles.inputHalf}>
          <View style={styles.logoWrap}>
            <Logo width="100%" height="100%" />
          </View>
          <ShortenUrlForm />
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          style={styles.outputHalf}
          ref={scrollRef}
        >
          <View
            style={styles.shortenedUrlsList}
            onStartShouldSetResponder={onStartShouldSetResponder}
          >
            <UrlShortenerHistory />
          </View>
        </ScrollView>
      </>
    </DismissKeyboard>
  );
};

export default UrlShortenerScreen;
