import { View, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyevents.style';
import { COLORS } from '../../../constants';
import NearbyEventCard from '../../common/cards/nearby/NearbyEventCard';
import fetchEvents from '../../../hook/fetchEvents'

const NearbyEvents = () => {
  const router = useRouter();
  const { data, isLoading, error } = fetchEvents("", {

  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All events</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text> Something went wrong</Text>
        ) : (
          <FlatList
            data={data.events}
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


export default NearbyEvents