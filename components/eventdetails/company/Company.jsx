import React, { useState } from "react";
import { 
  View,
  Text, 
  Image,
  TouchableWithoutFeedback,
  Animated, } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
import { MaterialIcons } from '@expo/vector-icons';



const Company = ({ icon, title, rating, host, location }) => {

const starRatingOptions = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Image
          source={{
            uri: checkImageURL(icon)
              ? icon
              : "https://main.judgehype.com/images/froala/2020/05/1589455498_837161.png",
          }}
          style={styles.iconImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.InfoBox}>
        <Text style={styles.hostName}> {host} </Text>
        <View style={styles.stars}> 
        {starRatingOptions.map((option) => ( // TODO: Trouver pourquoi warning "Each child in a list should have a unique key"
                <MaterialIcons
                  key={option} // option différent à chaque fois
                  name={rating >= option ? 'star' : 'star-border'}
                  size={16}
                  style={rating >= option ? styles.starSelected : styles.starUnselected}
                />
          ))}
          </View>
          <Text> / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
