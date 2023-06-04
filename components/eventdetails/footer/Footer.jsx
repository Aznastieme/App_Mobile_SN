import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Image, Alert} from "react-native";

import styles from "./footer.style";
import {icons} from "../../../constants";
import fetchUsers from "../../../hook/fetchUsers";
import fetchEvents from "../../../hook/fetchEvents";
import { useRouter } from "expo-router";

const Footer = ({token, id, authId}) => {
  const [applied, setApplied] = useState(false);
  const [author, setAuthor] = useState(false);

  const router = useRouter();

  const url_apply = `https://snapi.musardo.fr/events/${id}/apply`;
  const url_unapply = `https://snapi.musardo.fr/events/${id}/unapply`;
  const url_delete = `https://snapi.musardo.fr/events/${id}`
  const { dataUser, refetch } = fetchUsers(`?id=${authId}&include_organizedEvents=true&include_candidateEvents=true`);
  const { data } = fetchEvents(`?eventId=${id}&include_organizer=true`);

  

  const alert = () =>
    Alert.alert('Alert Title', 'Token expired. Please logout and login again', [
      {text: 'OK'},
    ]);

  const fetchParticipantEvents = async () => {
    
    if (dataUser && dataUser.user ) {
        const participantEvents = dataUser.user.candidateEvents;
        var test = 0;
        participantEvents.forEach(function(item) {
          if(item.id == id) { setApplied(true); test = test + 1 }
        });
        if(test == 0) setApplied(false)
      };
      if (data && data.events) {
        const organizedEvents = data.events;
         if(organizedEvents.organizerId == authId) setAuthor(true)
         else setAuthor(false)
      };
  };

  useEffect(() => {
    fetchParticipantEvents();
  })


  const dat = {};
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: ` Bearer ${token}`
  };

  const onApplyPressed = async () => {
    try {
      const response = await fetch(url_apply, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dat)
      });
      const responsedataUser = await response.json();
      refetch()
      if(responsedataUser.code == 401) alert()
      console.log(responsedataUser);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnapplyPressed = async () => {
    try {
      const response = await fetch(url_unapply, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dat)
      });
      const responsedataUser = await response.json();
      refetch()
      console.log(responsedataUser);
    } catch (error) {
      console.log(error);
    } 
  };

  const onDeletePressed = async () => {
    try {
      const response = await fetch(url_delete, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(dat)
      });
      const responsedataUser = await response.json();
      console.log(responsedataUser);
      router.replace('/home/yourEvents')
      
    } catch (error) {
      console.log(error);
    } 
  }

  return (<View style={styles.container}>
    {author?
    <TouchableOpacity style={styles.likeBtn}  onPress={onDeletePressed}>
    <Image source={icons.bin} resizeMode="contain" syles={{}}/>
  </TouchableOpacity>
  : <TouchableOpacity style={styles.likeBtn}>
  <Image source={icons.heartOutline} resizeMode="contain" style={styles.likeBtnImage} />
</TouchableOpacity>
    }
    
    {applied ? 
    <TouchableOpacity style={styles.applyBtn} onPress={onUnapplyPressed}>
      <Text style={styles.applyBtnText}>Cancel Application</Text>
    </TouchableOpacity> 
    : <TouchableOpacity style={styles.applyBtn} onPress={onApplyPressed}>
      <Text style={styles.applyBtnText}>Apply for event</Text>
    </TouchableOpacity>
    }
    
  </View>);
};

export default Footer;