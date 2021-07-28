import React from 'react';
import {ActivityIndicator} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

const emptyArray = [];
const UrlShortenerHistory = () => {
  const [{data: shortenedUrlHistory = emptyArray}, removeItemBySlug] =
    useBellyApi('history');
  if (!shortenedUrlHistory.length) {
    return <ActivityIndicator color="green" />;
  }
  return (
    <>
      {shortenedUrlHistory.map(({short_url: shortUrl, url: longUrl, slug}) => {
        return (
          <ShortenedUrlItem
            key={shortUrl}
            shortUrl={shortUrl}
            longUrl={longUrl}
            slug={slug}
            onRemove={removeItemBySlug}
          />
        );
      })}
    </>
  );
};

export default UrlShortenerHistory;
