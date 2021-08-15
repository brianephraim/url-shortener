import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 40,
  },
  emptyText: {
    color: '#000',
    textAlign: 'center',
    margin: 40,
  },
});
const UrlShortenerHistory = () => {
  const {shortenedUrls, refreshShortenedUrl} = useBellyApi();
  useEffect(() => {
    refreshShortenedUrl();
  }, [refreshShortenedUrl]);
  return (
    <>
      {shortenedUrls.data
        .slice()
        .reverse()
        .map(({short_url: shortUrl, url: longUrl, slug, added}, index) => {
          return (
            <ShortenedUrlItem
              key={shortUrl}
              shortUrl={shortUrl}
              longUrl={longUrl}
              slug={slug}
              highlighted={index === 0 && !!added}
            />
          );
        })}
      {!shortenedUrls.initialized && (
        <ActivityIndicator color="#FF2729" style={styles.activityIndicator} />
      )}
      {shortenedUrls.initialized && !shortenedUrls.data.length && (
        <Text style={styles.emptyText}>Shorten some URLs!</Text>
      )}
    </>
  );
};
export default UrlShortenerHistory;
