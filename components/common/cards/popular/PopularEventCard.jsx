import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './populareventcard.style'
import { checkImageURL } from '../../../../utils'

const PopularEventCard = ({ item, selectedEvent, handleCardPress}) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedEvent, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedEvent, item)}>
      <Image
          source={{ uri: checkImageURL(item.image_url)
            ? item.image_url
            : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
          />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item.category}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.eventName(selectedEvent, item)} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularEventCard