import React, {useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import useBellyApi from './useBelyApi';
import {ToastContext} from './Toast';

const stylesRaw = {
  container: {
    backgroundColor: '#888',
    margin: 6,
    flexDirection: 'row',
  },
  allGeneratedUrlsShortUrl: {
    backgroundColor: '#777',
  },
  allGeneratedUrlsLongUrl: {
    backgroundColor: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const styles = StyleSheet.create(stylesRaw);
/* eslint-disable react-native/no-unused-styles */
const highlightedStyles = StyleSheet.create({
  ...stylesRaw,
  container: {
    ...stylesRaw.container,
    borderColor: 'yellow',
    borderWidth: 3,
  },
});
/* eslint-enable react-native/no-unused-styles */

const ShortenedUrlItem = ({shortUrl, longUrl, slug, highlighted}) => {
  const setToast = React.useContext(ToastContext);
  const {removeItem} = useBellyApi('remove');
  const onPressRemove = useCallback(async () => {
    removeItem(slug);
  }, [removeItem, slug]);
  const containerStyle = highlighted ? highlightedStyles : styles;
  const onPressClipboard = () => {
    Clipboard.setString(shortUrl);
    setToast({text: `copied: ${shortUrl}`});
  };
  return (
    <View style={containerStyle.container} key={shortUrl}>
      <View style={styles.textSection}>
        <Text style={styles.allGeneratedUrlsShortUrl}>SHORT: {shortUrl}</Text>
        <Text style={styles.allGeneratedUrlsLongUrl}>LONG: {longUrl}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPressClipboard}>
          <Text>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressRemove}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShortenedUrlItem;
