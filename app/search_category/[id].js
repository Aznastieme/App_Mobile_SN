import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import {Text, SafeAreaView} from 'react-native';
import axios from 'axios';

import {ScreenHeaderBtn, NearbyEventCard} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import styles from '../../styles/search';
import fetchEvents from '../../hook/fetchEvents';

const EventSearch = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const {data} = fetchEvents(`/search?MainCategoryId=${params.id}`, {});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={data.events}
        renderItem={({item}) => (
          <NearbyEventCard
            event={item}
            handleNavigate={() =>
              router.push(
                `/event-details/${item.id}&include_organizer=true&include_notes=true`,
              )
            }
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: SIZES.medium, rowGap: SIZES.medium}}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default EventSearch;
