import {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../../constants';
import {
  PopularEvents,
  ScreenHeaderBtn,
  UserEvents,
  Welcome,
  UserParticipating,
} from '../../components';
import { useAuth } from '../../context/AuthContext';

const YourEvents = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const {authId} = useAuth();
  const {authToken} = useAuth();

  const data = [
    {key: '1', component: <UserParticipating id={authId} token={authToken}/>},
    {key: '2', component: <UserEvents id={authId} token={authToken}/>},
  ];

  const renderItem = ({item}) => (
    <View style={{flex: 1, padding: SIZES.medium}}>{item.component}</View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default YourEvents;
