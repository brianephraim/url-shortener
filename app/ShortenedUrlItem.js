import React, {useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import useBellyApi from './useBelyApi';

const styles = StyleSheet.create({
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
  removeButton: {
    width: 30,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const ShortenedUrlItem = ({
  shortUrl,
  longUrl,
  slug,
  onRemove: removeBySlugFromLocal,
}) => {
  const setSlugToRemoveRemote = useBellyApi('remove')[1];
  const onPressRemove = useCallback(async () => {
    await setSlugToRemoveRemote(slug);
    removeBySlugFromLocal(slug);
  }, [removeBySlugFromLocal, setSlugToRemoveRemote, slug]);
  return (
    <View style={styles.allGeneratedUrlsItem} key={shortUrl}>
      <Text style={styles.allGeneratedUrlsShortUrl}>SHORT: {shortUrl}</Text>
      <Text style={styles.allGeneratedUrlsLongUrl}>LONG: {longUrl}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={onPressRemove}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShortenedUrlItem;
