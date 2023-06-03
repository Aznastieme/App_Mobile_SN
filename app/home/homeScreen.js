import {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../../constants';
import {
  NearbyEvents,
  PopularEvents,
  ScreenHeaderBtn,
  Welcome,
} from '../../components';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    {
      key: '1',
      component: (
        <Welcome
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
            if (searchTerm) {
              router.push(`/search_name/${searchTerm}`);
            }
          }}
        />
      ),
    },
    {key: '2', component: <PopularEvents />},
    {key: '3', component: <NearbyEvents />},
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

export default Home;
