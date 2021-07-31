import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import useBellyApi from './useBelyApi';
import ShortenedUrlItem from './ShortenedUrlItem';

interface ShortenedUrlsData {
  short_url: string;
  url: string;
  slug: string;
  added: number;
}
interface ShortenedUrls {
  data: ShortenedUrlsData[];
  initialized: boolean;
}
interface BellyApiObj {
  isLoading: boolean;
  refreshShortenedUrl: () => void;
  shortenedUrls: ShortenedUrls;
}

const UrlShortenerHistory = () => {
  const {shortenedUrls, refreshShortenedUrl}: BellyApiObj = useBellyApi();
  useEffect(() => {
    refreshShortenedUrl();
  }, [refreshShortenedUrl]);
  return (
    <>
      {shortenedUrls.data
        .slice()
        .reverse()
        .map(
          (
            {short_url: shortUrl, url: longUrl, slug, added}: ShortenedUrlsData,
            index: number
          ) => {
            return (
              <ShortenedUrlItem
                key={shortUrl}
                shortUrl={shortUrl}
                longUrl={longUrl}
                slug={slug}
                highlighted={index === 0 && !!added}
              />
            );
          }
        )}
      {!shortenedUrls.initialized && <ActivityIndicator color="green" />}
    </>
  );
};
export default UrlShortenerHistory;
