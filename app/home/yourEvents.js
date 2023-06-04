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
import { RefreshControl } from 'react-native';

const YourEvents = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {authId} = useAuth();
  const {authToken} = useAuth();
  

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false)
  }

  const data = [
    {key: '1', component: <UserParticipating id={authId} token={authToken}/>},
    {key: '2', component: <UserEvents id={authId} token={authToken}/>},
  ];

  const renderItem = ({item}) => (
    <View style={{flex: 1, padding: SIZES.medium}}>{item.component}</View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

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
