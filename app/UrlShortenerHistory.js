import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

const emptyArray = [];
const UrlShortenerHistory = ({lastShortenedUrl}) => {
  const [{data: shortenedUrlHistory = emptyArray}, removeItemBySlug, addItem] =
    useBellyApi('history');
  useEffect(() => {
    if (lastShortenedUrl.slug) {
      addItem(lastShortenedUrl);
    }
  }, [lastShortenedUrl, addItem]);

  if (!shortenedUrlHistory.length) {
    return <ActivityIndicator color="green" />;
  }

  return (
    <>
      {shortenedUrlHistory
        .reverse()
        .map(({short_url: shortUrl, url: longUrl, slug}) => {
          return (
            <ShortenedUrlItem
              key={shortUrl}
              shortUrl={shortUrl}
              longUrl={longUrl}
              slug={slug}
              removeItemBySlug={removeItemBySlug}
            />
          );
        })}
    </>
  );
};

export default UrlShortenerHistory;
