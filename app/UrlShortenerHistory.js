import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

const UrlShortenerHistory = () => {
  const {shortenedUrls, refreshShortenedUrl} = useBellyApi('history');
  useEffect(refreshShortenedUrl, [refreshShortenedUrl]);
  if (!shortenedUrls.initialized) {
    return <ActivityIndicator color="green" />;
  }
  return (
    <>
      {shortenedUrls.data
        .slice()
        .reverse()
        .map(({short_url: shortUrl, url: longUrl, slug}) => {
          return (
            <ShortenedUrlItem
              key={shortUrl}
              shortUrl={shortUrl}
              longUrl={longUrl}
              slug={slug}
            />
          );
        })}
    </>
  );
};
export default UrlShortenerHistory;
