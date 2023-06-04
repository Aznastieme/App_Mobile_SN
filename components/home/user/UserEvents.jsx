import { View, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './userevents.style';
import { COLORS } from '../../../constants';
import NearbyEventCard from '../../common/cards/nearby/NearbyEventCard';
import fetchEvents from '../../../hook/fetchEvents'

const UserEvents = ({id, token}) => {
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

  const onPress = () => {
    router.push(`/create-event/${token}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your events</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.headerBtn}>Create event</Text>
        </TouchableOpacity>
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
              <NearbyEventCard
                event={item}
                handleNavigate={() => router.push(`/event-details/${item.id}&include_organizer=true&include_notes=true`)}
              />
            )}
            keyExtractor={item => item.id}
            vertical
          />
          )}
      </View>
    </View>
  )
}


export default UserEvents