import React, {useState, useCallback} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import useBellyApi from './useBelyApi';
import Toast from './Toast';
import UrlShortenerHistory from './UrlShortenerHistory';

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
  textInput: {
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 10,
    margin: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  outputHalf: {
    backgroundColor: '#bbb',
    height: `${bottomGoldenRatioHeightPercent}%`,
  },
  allGeneratedUrlsContainer: {
    backgroundColor: '#999',
  },
  allGeneratedUrlsItem: {
    backgroundColor: '#888',
    margin: 6,
  },
  allGeneratedUrlsShortUrl: {
    backgroundColor: '#777',
  },
  allGeneratedUrlsLongUrl: {
    backgroundColor: '#666',
  },
});

const DismissKeyboard = ({children, style}) => (
  <TouchableOpacity activeOpacity={1} style={style} onPress={Keyboard.dismiss}>
    {children}
  </TouchableOpacity>
);
const onStartShouldSetResponder = () => true;
const UrlShortenerScreen = () => {
  const [inputText, setInputText] = useState('');
  const [
    {data: newShortenedUrlData, isLoading, errorType, timestamp},
    setUrlToShorten,
  ] = useBellyApi('shorten');
  const onPressSubmitButton = useCallback(() => {
    setUrlToShorten(inputText);
  }, [setUrlToShorten, inputText]);
  const buttonText = isLoading ? 'loading...' : 'Shorten';
  let errorText;
  switch (errorType) {
    case 'cancel':
      break;
    case 'fetch':
      break;
    case 'invalid':
      errorText = 'Unable to shorten that link. It is not a valid url.';
      break;
    default:
      errorText = '';
  }
  return (
    <DismissKeyboard style={styles.container}>
      <Toast timestamp={timestamp}>{errorText}</Toast>
      <View style={styles.inputHalf}>
        <Text style={styles.logo}>URL Shortener</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Shorten your link"
          placeholderTextColor="#999"
          onChangeText={setInputText}
          returnKeyType="go"
          onSubmitEditing={onPressSubmitButton}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onPressSubmitButton}
        >
          <Text style={styles.submitButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView alwaysBounceVertical={false} style={styles.outputHalf}>
        <View
          style={styles.allGeneratedUrlsContainer}
          onStartShouldSetResponder={onStartShouldSetResponder}
        >
          {newShortenedUrlData.short_url && (
            <View style={styles.allGeneratedUrlsItem}>
              <Text style={styles.allGeneratedUrlsShortUrl}>
                SHORT: {newShortenedUrlData.short_url}
              </Text>
              <Text style={styles.allGeneratedUrlsLongUrl}>
                LONG: {newShortenedUrlData.url}
              </Text>
            </View>
          )}
          <UrlShortenerHistory />
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default UrlShortenerScreen;
