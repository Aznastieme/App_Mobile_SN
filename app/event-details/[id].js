import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
    Company,
    EventAbout,
    EventFooter,
    EventTabs,
    ScreenHeaderBtn,
    Specifics,
  } from "../../components";
  import { COLORS, icons, SIZES } from "../../constants";
  import fetchEvents from "../../hook/fetchEvents";
import { useAuth } from "../../context/AuthContext";

const tabs = [ "Description", "Detail"];

const EventDetails = () => {

  

  
  const {authId} = useAuth();
  const {authToken} = useAuth();

  const params = useSearchParams();
  const router = useRouter();

  const split = params.id.split("&")
  const id = split[0]

  const { data, isLoading, error, refetch } = fetchEvents(`/?eventId=${params.id}`, {
    
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    const dateTime = data.events.date.split("T")
    const date = dateTime[0].split("-")
    const hour = dateTime[1].slice(0, dateTime[1].length-8)

    switch (activeTab) {
      case "Detail":
                return (
                <Specifics 
                    title="Detail"
                    points={[
                      data.events.participants_number > 1? data.events.participants_number+ " people participating": data.events.participants_number+" person participating",
                      data.events.Address.street + ", " + data.events.Address.city + ", " + data.events.Address.country + ", " + data.events.Address.zip,
                      date[2] + "/" + date[1] + "/" + date[0],
                      hour
                    ]?? ['N/A']}    
                />
                );
            case "Description" :
                return (
                <EventAbout
                    info={data.events.description ?? "No data provided"} 
                />
                );

      default:
        return null;
    }
  };

  return (
    
    
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
          paddingBottom: 50
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                icon={data.events.image_url}
                title={data.events.name}
                rating={data.events.score_avg.score_avg}
                host={data.events.organizer.username}
                location={data.events.Address.city}
              />

              <EventTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <EventFooter id={id} token={authToken} />
      </>
    </SafeAreaView>
  );
};

export default EventDetails;
