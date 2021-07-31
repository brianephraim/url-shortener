import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

const UrlShortenerHistory = () => {
  const {shortenedUrls, refreshShortenedUrl} = useBellyApi('history');
  useEffect(refreshShortenedUrl, [refreshShortenedUrl]);
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
              highlighted={index === 0 && added}
            />
          );
        })}
      {!shortenedUrls.initialized && <ActivityIndicator color="green" />}
    </>
  );
};
export default UrlShortenerHistory;
