import React, {useCallback, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TouchableHighlight,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import useBellyApi from './useBelyApi';
import {ToastContext, ToastContextType} from './Toast';
import IconTrash from './IconTrash';
import IconCopy from './IconCopy';

let funColorIndex = 0;
const funColors = [
  '#AADEE3',
  '#FCE7B5',
  '#FAE0CB',
  '#A9F7FF',
  '#FAEBC9',
  '#FFDE78',
];

function assignFunColor() {
  const next = funColors[funColorIndex];
  funColorIndex += 1;
  if (funColorIndex > funColors.length - 1) {
    funColorIndex = 0;
  }
  return next;
}

const buttonStyle: ViewStyle = {
  width: 30,
  height: 30,
  padding: 4,
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 12,
    borderWidth: 8,
    borderColor: '#00AAD2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  shortUrlSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  clipboardButton: {
    ...buttonStyle,
    backgroundColor: '#FF4D4F',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  trashButton: {
    width: 25,
    height: 25,
  },
  longUrlSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  longUrl: {
    marginLeft: 10,
    flexShrink: 1,
  },
  buttonGhost: buttonStyle,
  shortenedUrl: {
    fontSize: 25,
    textAlign: 'center',
    flexShrink: 1,
  },
  latest: {
    position: 'absolute',
    top: -3,
    left: -3,
    fontSize: 12,
    color: 'white',
    backgroundColor: '#00AAD2',
    padding: 3,
    borderRadius: 3,
    overflow: 'hidden',
  },
});
/* eslint-disable react-native/no-unused-styles */

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
  const funColorContainerStyle = useRef([
    styles.container,
    {
      backgroundColor: assignFunColor(),
      borderWidth: 0,
      padding: 20,
    },
  ]);
  const setToast = React.useContext(ToastContext) as ToastContextType;
  const {removeItem} = useBellyApi();
  const onPressRemove = useCallback(async () => {
    removeItem(slug);
  }, [removeItem, slug]);
  const onPressClipboard = () => {
    Clipboard.setString(shortUrl);
    setToast({text: `copied: ${shortUrl}`});
  };
  return (
    <View
      style={highlighted ? styles.container : funColorContainerStyle.current}
      key={shortUrl}
      testID="ShortenedUrlItem"
    >
      <View style={styles.shortUrlSection}>
        <View style={styles.buttonGhost} />
        <Text style={styles.shortenedUrl}>{shortUrl}</Text>
        <TouchableHighlight
          style={styles.clipboardButton}
          onPress={onPressClipboard}
          activeOpacity={1}
          underlayColor="#FF2729"
        >
          <IconCopy width="100%" height="100%" fill="#FFFFFF" />
        </TouchableHighlight>
      </View>
      <View style={styles.longUrlSection}>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={onPressRemove}
          activeOpacity={0.7}
        >
          <IconTrash width="100%" height="100%" fill="#FF4D4F" />
        </TouchableOpacity>
        <Text style={styles.longUrl}>From: {longUrl}</Text>
      </View>
      {highlighted && <Text style={styles.latest}>Latest:</Text>}
    </View>
  );
};

export default ShortenedUrlItem;
