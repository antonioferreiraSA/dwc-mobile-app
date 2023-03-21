import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import ContentLoader, { Rect } from 'react-content-loader/native';
import logEvent from '../utils/logEvent';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { fetchChannelSection, fetchPlaylistsWrapper } from '../data/youtube';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import isTheWeekend from '../utils/isTheWeekend';
import { Text, Subtitle, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import LiveCard from '../components/LiveCard';

const screenWidth = Dimensions.get('window').width;

const CurrentSeries = () => {
  const { isLoading: isLoadingCurrentSeries, data: currentSeries } = useQuery(
    'current-series',
    async () => {
      // this is the Current Series page
      const wordpressPage = await axios.get('https://echo.church/teaching');

      // the page then redirects to the actual series page, then we can grab the slug
      const currentSeriesSlug = (
        /echo.church\/(.+)/.exec(wordpressPage.url)?.[1] || ''
      ).replace('/', '');

      const { data: currentSeriesData } = await axios(
        `https://echo.church/wp-json/wp/v2/pages?slug=${currentSeriesSlug}&timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const series = currentSeriesData?.[0] || {};

      // ! make sure the Featured Image is set under Elementor General Settings https://echo.church/wp-admin/
      const getSeriesImageUrl =
        series?._links?.['wp:featuredmedia']?.[0]?.href || '';

      if (!getSeriesImageUrl) {
        return {
          image: null,
          link: 'https://echo.church/teaching',
          title: series?.title?.rendered || 'Current Series',
        };
      }

      // get the attachments, which includes the banner image
      const { data: attachmentData } = await axios(
        `${getSeriesImageUrl}?timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const seriesImage =
        attachmentData?.media_details.sizes.medium_large.source_url ||
        undefined;

      return {
        image: seriesImage,
        link: 'https://echo.church/teaching',
        title: series.title.rendered,
      };
    }
  );

  if (isLoadingCurrentSeries) {
    return (
      <>
        <Subtitle style={styles.sectionHeaderText}>CURRENT SERIES</Subtitle>
        <View style={{ marginHorizontal: 16 }}>
          <ContentLoader
            viewBox="0 0 300 200"
            backgroundColor={Colors.darkGray}
            foregroundColor={Colors.darkerGray}
            preserveAspectRatio="none"
            style={{
              height: 200,
              marginBottom: 8,
              borderRadius: 8,
              backgroundColor: Colors.darkestGray,
              overflow: 'hidden',
            }}
          >
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height="200" />
          </ContentLoader>
        </View>
      </>
    );
  }

  if (currentSeries) {
    const openCurrentSeries = () => {
      WebBrowser.openBrowserAsync(currentSeries.link, {
        toolbarColor: Colors.darkestGray,
      }).catch((err) => {
        logEvent('ERROR with WebBrowser', { error: err });
        WebBrowser.dismissBrowser();
      });
    };

    return (
      <>
        <Subtitle style={styles.sectionHeaderText}>CURRENT SERIES</Subtitle>
        <TouchableOpacity
          onPress={openCurrentSeries}
          style={{ marginHorizontal: 16 }}
        >
          <View>
            {currentSeries.image ? (
              <Image
                source={{ uri: currentSeries.image }}
                style={{
                  width: '100%',
                  height: 200,
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
            ) : null}
            <Button
              onPress={openCurrentSeries}
              style={{ marginVertical: 8, ButtonAlign: 'center' }}
              title={currentSeries.title}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return null;
};

const useNavigateToItem = () => {
  const navigation = useNavigation();
  const navigateToItem = (item) => {
    const { id, title, description, thumbnails: { maxres = {} } = {} } = item;

    logEvent('TAP Past Series', { series_name: title });
    navigation.navigate('Playlist', {
      playlistID: id,
      playlistTitle: title,
      playlistDescription: description,
      playlistURI: maxres.url,
    });
  };

  return { navigateToItem };
};

const YouTubeDataView = ({ item = {}, style, thumbnailStyle } = {}) => {
  const { title, thumbnails: { maxres = {} } = {} } = item;
  const { navigateToItem } = useNavigateToItem();

  return (
    <TouchableOpacity
      onPress={() => {
        navigateToItem(item);
      }}
    >
      <View style={style}>
        {maxres.url ? (
          <Image
            source={{ uri: maxres.url }}
            style={thumbnailStyle}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={{
              color: Colors.darkestGray,
              margin: 8,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const PastSeriesSection = ({ sectionData = [] }) => {
  if (!sectionData || !sectionData.length) {
    return null;
  }

  return (
    <>
      <Subtitle style={styles.sectionHeaderText}>PAST SERIES</Subtitle>
      <View style={styles.pastSeriesList}>
        {sectionData.map((item) => {
          if (item) {
            return (
              <YouTubeDataView
                key={item.title}
                item={item}
                thumbnailStyle={styles.youtubeThumbnailImageSmall}
                style={styles.smallCard}
              />
            );
          }
          return null;
        })}
      </View>
    </>
  );
};

const MediaScreen = () => {
  useHandleTabChange('Media');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState([]);

  async function getPlaylists() {
    const channelSection = await fetchChannelSection().catch((err) => {
      setError(true);
      logEvent('ERROR fetching channel section', { error: err });
    });
    const playlists =
      (await fetchPlaylistsWrapper(channelSection).catch((err) => {
        setError(true);
        logEvent('ERROR fetching playlists', { error: err });
      })) || [];

    setLoading(false);
    setData(playlists);
  }

  useEffect(() => {
    getPlaylists();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { flex: 1, paddingTop: insets.top }]}>
        <Text XXL bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text XXL bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <View style={styles.error}>
          <Subtitle center>
            Oh no! There was an error connecting to YouTube 😞
          </Subtitle>
          <Heading center>
            {`Make sure you're connected to the internet`}
          </Heading>
          <Button
            title={'Retry'}
            style={styles.notesButton}
            onPress={() => {
              setError(false);
              setLoading(true);
              getPlaylists();
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      ref={ref}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <Text XXL bold style={styles.headerTitle}>
        MEDIA
      </Text>

      {isTheWeekend && (
        <>
          <TouchableHighlight
            onPress={() => {
              logEvent('TAP Watch Live');
              WebBrowser.openBrowserAsync('https://echo.church/online/', {
                toolbarColor: Colors.darkestGray,
              }).catch((err) => {
                logEvent('ERROR with WebBrowser', { error: err });
                WebBrowser.dismissBrowser();
              });
            }}
          >
            <LiveCard style={styles.largeCard} />
          </TouchableHighlight>
        </>
      )}

      <CurrentSeries />

      <Button
        icon={
          <MaterialIcons name={'speaker-notes'} size={24} color={Colors.gray} />
        }
        title="Message Notes"
        style={styles.notesButton}
        onPress={() => {
          logEvent('TAP Message Notes');
          Linking.openURL('https://echo.church/messagenotes');
        }}
      />

      <Image
        accessibilityLabel="Echo Leadership Podcast"
        source={require('../assets/images/leadership-pod.jpg')}
        style={{
          aspectRatio: 1,
          width: screenWidth,
          height: undefined,
          marginBottom: 16,
        }}
        resizeMode="cover"
      />
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {
            logEvent('TAP Apple Podcasts');
            Linking.openURL(
              'https://podcasts.apple.com/us/podcast/echo-leadership/id1513292472'
            );
          }}
        >
          <Image source={require('../assets/images/apple-podcasts.png')} />
        </TouchableHighlight>
        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {
            logEvent('TAP Spotify Podcasts');
            Linking.openURL(
              'https://open.spotify.com/show/4Y8Z9Xwsf0EQHXO04YY7Gh'
            );
          }}
        >
          <Image source={require('../assets/images/spotify.png')} />
        </TouchableHighlight>
        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {
            logEvent('TAP Google Podcasts');
            Linking.openURL(
              'https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkcy5zb3VuZGNsb3VkLmNvbS91c2Vycy9zb3VuZGNsb3VkOnVzZXJzOjgyMjc5MjczMy9zb3VuZHMucnNz'
            );
          }}
        >
          <Image source={require('../assets/images/google-podcasts.png')} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            logEvent('TAP Youtube for Podcast');
            Linking.openURL(
              'https://www.youtube.com/channel/UCdIqxycEt_xu1ASUIplf6Ww'
            );
          }}
        >
          <Image source={require('../assets/images/youtube.png')} />
        </TouchableHighlight>
      </View>

      <PastSeriesSection sectionData={data} />

      <Subtitle style={styles.sectionHeaderText}>RESOURCES</Subtitle>
      <TouchableHighlight
        style={{ marginBottom: insets.bottom + 16 }}
        onPress={() => {
          logEvent('TAP Rightnow Media');
          Linking.openURL(
            'https://www.rightnowmedia.org/Account/Invite/EchoChurch'
          );
        }}
      >
        <Image
          source={require('../assets/images/rightnow_media.jpg')}
          style={[
            styles.youtubeThumbnailImageLarge,
            { height: screenWidth / 2, marginLeft: 16, marginBottom: 16 },
          ]}
          resizeMode="cover"
        />
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
    color: Colors.red,
  },
  sectionHeaderText: {
    marginLeft: 16,
  },
  largeCard: {
    width: screenWidth - 32,
    height: (screenWidth - 32) / 2,
    marginLeft: 16,
    borderRadius: 8,
  },
  pastSeriesList: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallCard: {
    width: (screenWidth - 48) / 2,
    height: (2 * (screenWidth - 48)) / 7,
    marginBottom: 32,
    marginLeft: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesButton: {
    margin: 16,
    marginBottom: 30,
    width: screenWidth - 32,
  },
  youtubeThumbnailImageSmall: {
    flex: 1,
    backgroundColor: Colors.white,
    height: undefined,
    width: (screenWidth - 48) / 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  youtubeThumbnailImageLarge: {
    flex: 1,
    borderRadius: 8,
    height: undefined,
    width: screenWidth - 32,
    overflow: 'hidden',
  },
});

export default MediaScreen;
