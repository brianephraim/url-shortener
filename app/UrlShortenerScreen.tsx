import React, {useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import Toast from './Toast';
import UrlShortenerHistory from './UrlShortenerHistory';
import ShortenUrlForm from './ShortenUrlForm';
import useBellyApi from './useBelyApi';

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

const DismissKeyboard = ({children, style}) => (
  <TouchableOpacity activeOpacity={1} style={style} onPress={Keyboard.dismiss}>
    {children}
  </TouchableOpacity>
);
const onStartShouldSetResponder = () => true;
const UrlShortenerScreen = () => {
  const scrollRef = useRef();
  const {shortenedUrls} = useBellyApi();
  const mostRecentlyAdded =
    shortenedUrls.data[shortenedUrls.data.length - 1] || {};
  const {added} = mostRecentlyAdded;

  useEffect(() => {
    added &&
      scrollRef.current.scrollTo({
        y: 0,
        animated: true,
      });
  }, [added]);

  return (
    <DismissKeyboard style={styles.container}>
      <Toast>
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
      </Toast>
    </DismissKeyboard>
  );
};

export default UrlShortenerScreen;
