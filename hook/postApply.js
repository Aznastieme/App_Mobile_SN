import {View, Text} from 'react-native';
import React from 'react';

const postApply = async (token, id) => {

  const url = `https://snapi.musardo.fr/events/${id}/apply`;
  const dat = {};
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: ` Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(dat),
  });

  const data = await response.json

  return data;
};

export default postApply;
