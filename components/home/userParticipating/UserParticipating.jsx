import { View, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './userparticipating.style';
import { COLORS } from '../../../constants';
import NearbyEventCard from '../../common/cards/nearby/NearbyEventCard';
import fetchEvents from '../../../hook/fetchEvents'
import PopularEventCard from '../../common/cards/popular/PopularEventCard';
import { useState } from 'react';

const UserParticipating = ({id}) => {
  const router = useRouter();
  const { data, isLoading, error } = fetchEvents("", {

  });

  const myEvents = [];
  if (data && data.events) {
    data.events.forEach(function(item) {
      if (item.organizerId == id) {
        myEvents.push(item);
      }
    });
  }

  const [selectedEvent, setselectedEvent] = useState();

  const handleCardPress = (item) => {
    router.push(`/event-details/${item.id}&include_organizer=true&include_notes=true`);
    setselectedEvent(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>What's next ?</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text> Something went wrong</Text>
        ) : (
          <FlatList
            data={myEvents}
            renderItem={({ item }) => (
              <PopularEventCard
                item={item}
                selectedEvent={selectedEvent}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          )}
      </View>
    </View>
  )
}


export default UserParticipating