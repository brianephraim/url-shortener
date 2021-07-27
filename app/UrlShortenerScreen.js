import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';

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
  newShortenedUrl: {
    backgroundColor: '#aaa',
    color: 'black',
    fontSize: 20,
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

const mockBelyApiResponses = {
  newShortenedUrl: {
    short_url: 'https://gb.com/yllebdlog',
    slug: 'yllebdlog',
    url: 'https://www.goldbelly.com',
  },
  allGeneratedUrls: [
    {
      short_url: 'https://gb.com/elgoog',
      slug: 'elgoog',
      url: 'https://www.google.com',
    },
    {
      short_url: 'https://gb.com/elppa',
      slug: 'elppa',
      url: 'https://www.apple.com',
    },
    {
      short_url: 'https://gb.com/koobecaf',
      slug: 'koobecaf',
      url: 'https://www.facebook.com',
    },
  ],
};


const demoScroll = false;

const DismissKeyboard = ({children, style}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={style}
    onPress={Keyboard.dismiss}
  >
    {children}
  </TouchableOpacity>
);

const UrlShortenerScreen = () => {
  return (
    <DismissKeyboard style={styles.container}>
      <View style={styles.inputHalf}>
        <Text style={styles.logo}>URL Shortener</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Shorten your link"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Shorten</Text>
        </TouchableOpacity>
      </View>
      <ScrollView alwaysBounceVertical={false} style={styles.outputHalf}>
        <Text style={styles.newShortenedUrl}>
          new: {mockBelyApiResponses.newShortenedUrl.url}
        </Text>
        <View style={styles.allGeneratedUrlsContainer}>
          {mockBelyApiResponses.allGeneratedUrls.map(
            ({short_url: shortUrl, url: longUrl}) => {
              return (
                <View style={styles.allGeneratedUrlsItem} key={shortUrl}>
                  <Text style={styles.allGeneratedUrlsShortUrl}>
                    SHORT: {shortUrl}
                  </Text>
                  <Text style={styles.allGeneratedUrlsLongUrl}>
                    LONG: {longUrl}
                  </Text>
                </View>
              );
            }
          )}
          {
            /* eslint-disable */
            demoScroll && [1,2,3,4,5].map(item => (<View key={`${item}`} style={{height: 100,width:20,backgroundColor:'red',margin:3,}} />))
            /* eslint-enable */
          }
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default UrlShortenerScreen;
