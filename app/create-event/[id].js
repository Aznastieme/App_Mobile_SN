import {Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {useSearchParams} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomInput, CustomButton} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [time, setTime] = useState(new Date());
  const [timeString, setTimeString] = useState('');
  const [dateApi, setDateApi] = useState('');
  const [timeApi, setTimeApi] = useState('');

  const [show, setShow] = useState(false);
  const [timeShow, setTimeShow] = useState(false);

  

  const params = useSearchParams();
  const url = 'https://snapi.musardo.fr/events';
  const dat = {
    participants_number: '0',
    category: `${category}`,
    description: `${description}`,
    image_url: '',
    name: `${name}`,
    date: `${dateApi}T${timeApi}Z`,
    address: {
      street: `${street}`,
      city: `${city}`,
      country: `${country}`,
      zip: `${zip}`,
    },
    mainCategoryId: `1`,
  };
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${params.id}`,
  };

  const onCreatePressed = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dat),
      });
      const responseData = await response.json();

      console.log(responseData)

      //router.replace('../home');
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const toggleTimePicker = () => {
    setTimeShow(!timeShow);
  };

  const onTime = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setTime(currentDate);

      toggleTimePicker();
      setTimeApi(
        `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      );
      setTimeString(`${currentDate.getHours()}:${currentDate.getMinutes()}`);

      //2023-06-06T13:30:00.000Z format voulu
    } else toggleTimePicker();
  };

  const onChange = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      const days = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      toggleDatePicker();
      setDateApi(`${year}-${month}-${days}`);
      if (days < 10) {
        if (currentDate.getMonth() < 10) {
          setDateString(`0${days}-0${month}-${year}`);
          setDateApi(`0${year}-0${month}-${days}`);
          return;
        }
        setDateString(`0${days}-${month}-${year}`);
        setDateApi(`0${year}-${month}-${days}`);
      } else if (currentDate.getMonth() < 10) {
        setDateString(`${days}-0${month}-${year}`);
        setDateApi(`${year}-0${month}-${days}`);
      } else {
        setDateString(`${days}-${month}-${year}`);
        setDateApi(`${year}-${month}-${days}`);
      }

      //2023-06-06T13:30:00.000Z format voulu
    } else toggleDatePicker();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomInput placeholder="Name" value={"name"} setValue={setName} />
        <CustomInput
          placeholder="Category"
          value={"category"}
          setValue={setCategory}
        />
        {/* <CustomInput placeholder="Date" value={date} setValue={setDate} /> */}
        <CustomInput
          placeholder="Description"
          value={"description"}
          setValue={setDescription}
        />
        <CustomInput placeholder="Street" value={"street"} setValue={setStreet} />
        <CustomInput placeholder="City" value={"city"} setValue={setCity} />
        <CustomInput
          placeholder="Country"
          value={"country"}
          setValue={setCountry}
        />
        <CustomInput placeholder="Zip" value={"zip"} setValue={setZip} />
        <Pressable onPress={toggleDatePicker}>
          <CustomInput
            placeholder="Date"
            value={dateString}
            setValue={setDateString}
            editable={false}
          />
        </Pressable>
        <Pressable onPress={toggleTimePicker}>
          <CustomInput
            placeholder="Time"
            value={timeString}
            setValue={setTimeString}
            editable={false}
          />
        </Pressable>

        {show && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
        {timeShow && (
          <DateTimePicker
            mode="time"
            display="spinner"
            value={time}
            onChange={onTime}
          />
        )}
      </ScrollView>

      <Pressable onPress={onCreatePressed} style={{
        width: '100%',
        padding:15,
        alignItems: 'center',
        borderRadius: 40,

    backgroundColor: '#002B5B',
    marginVertical: 15,
      }}>
            <Text style={{
    fontWeight: 'bold',
    color: 'white'}}> {'Create'} </Text>
        </Pressable>
    </SafeAreaView>
  );
};

export default CreateEvent;
