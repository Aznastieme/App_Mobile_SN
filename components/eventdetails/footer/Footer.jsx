import React from "react";
import {View, Text, TouchableOpacity, Image, Linking} from "react-native";

import styles from "./footer.style";
import {icons} from "../../../constants";
import fetchEvents from "../../../hook/fetchEvents";

const Footer = ({token, id}) => {
  const url = `https://snapi.musardo.fr/events/${id}/apply`;
  const dat = {};
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: ` Bearer ${token}`
  };

  const onApplyPressed = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dat)
      });
      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.log(error);
    } finally {}
  };

  return (<View style={styles.container}>
    <TouchableOpacity style={styles.likeBtn}>
      <Image source={icons.heartOutline} resizeMode="contain" style={styles.likeBtnImage}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.applyBtn} onPress={onApplyPressed}>
      <Text style={styles.applyBtnText}>Apply for event</Text>
    </TouchableOpacity>
  </View>);
};

export default Footer;