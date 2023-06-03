import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import fetchCategories from "../../../hook/fetchCategories";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeEventType, setActiveEventType] = useState();

  
  const eventTypes = []

  const { data, isLoading, error } = fetchCategories("", {
    
  });

  {isLoading ? (
    <Text/>
  ) : error ? (
    <Text> Something went wrong</Text>
  ) : (
    data.categories.forEach(function(item){
      var ind = item.id - 1
      eventTypes[ind] = (item.name);
    }));
}
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={eventTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeEventType, item)}
              onPress={() => {
                setActiveEventType(item);
                const id = eventTypes.indexOf(item) + 1
                router.push(`/search_category/${id}`);
              }}
            >
              <Text style={styles.tabText(activeEventType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Welcome;