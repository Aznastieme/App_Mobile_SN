import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyeventcard.style'
import { checkImageURL } from '../../../../utils'

const NearbyEventCard = ({ event, handleNavigate}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
      <Image
          source={{ uri: checkImageURL(event?.image_url)
            ? event.image_url
            : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
          />
      </TouchableOpacity>


      <View style={styles.textContainer}> 
        <Text style={styles.eventName} numberOfLines={1}>
          {event.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyEventCard