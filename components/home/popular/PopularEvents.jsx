import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularevents.style";
import { COLORS, SIZES } from "../../../constants";
import PopularEventCard from "../../common/cards/popular/PopularEventCard";
import fetchEvents from "../../../hook/fetchEvents";

const PopularEvents = () => {
  const router = useRouter();
  const { data, isLoading, error } = fetchEvents("/upcoming", {
    
  });

  const [selectedEvent, setselectedEvent] = useState();

  const handleCardPress = (item) => {
    router.push(`/event-details/${item.id}&include_organizer=true&include_notes=true`);
    setselectedEvent(item.id);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming events</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data.events}
            renderItem={({ item }) => (
              <PopularEventCard
                item={item}
                selectedEvent={selectedEvent}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          
        )}
      </View>
    </View>
  );
};

export default PopularEvents;