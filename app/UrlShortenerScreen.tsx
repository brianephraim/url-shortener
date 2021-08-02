import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import UrlShortenerHistory from './UrlShortenerHistory';
import ShortenUrlForm from './ShortenUrlForm';
import useBellyApi from './useBelyApi';
import DismissKeyboard from './DismissKeyboard';

const bottomGoldenRatioHeightPercent = 61.8;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
  },
  inputHalf: {
    backgroundColor: '#ccc',
    justifyContent: 'flex-end',
    height: `${100 - bottomGoldenRatioHeightPercent}%`,
  },
  logo: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
  },
  outputHalf: {
    backgroundColor: '#bbb',
    height: `${bottomGoldenRatioHeightPercent}%`,
  },
  allGeneratedUrlsContainer: {
    backgroundColor: '#999',
  },
});

const onStartShouldSetResponder = () => true;
const UrlShortenerScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
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
          <Text style={styles.logo}>URL Shortener</Text>
          <ShortenUrlForm />
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          style={styles.outputHalf}
          ref={scrollRef}
        >
          <View
            style={styles.allGeneratedUrlsContainer}
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
