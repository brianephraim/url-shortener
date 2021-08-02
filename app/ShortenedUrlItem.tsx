import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import useBellyApi from './useBelyApi';
import {ToastContext, ToastContextType} from './Toast';

interface Style {
  container: ViewStyle;
  allGeneratedUrlsShortUrl: TextStyle;
  allGeneratedUrlsLongUrl: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  textSection: ViewStyle;
}

const stylesRaw: Style = {
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
  textSection: {},
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
interface Props {
  shortUrl: string;
  longUrl: string;
  slug: string;
  highlighted?: boolean;
}

const ShortenedUrlItem: React.FC<Props> = ({
  shortUrl,
  longUrl,
  slug,
  highlighted,
}) => {
  const setToast = React.useContext(ToastContext) as ToastContextType;
  const {removeItem} = useBellyApi();
  const onPressRemove = useCallback(async () => {
    removeItem(slug);
  }, [removeItem, slug]);
  const containerStyle = highlighted ? highlightedStyles : styles;
  const onPressClipboard = () => {
    Clipboard.setString(shortUrl);
    setToast({text: `copied: ${shortUrl}`});
  };
  return (
    <View
      style={containerStyle.container}
      key={shortUrl}
      testID="ShortenedUrlItem"
    >
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
