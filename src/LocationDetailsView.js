import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HEADER_COLOR} from './constants';

// Replace with your client_id and client_secret // TODO abstract in non checked-in file
const FS_CREDS = 'client_id=123' + '&client_secret=456';
const DEFAULT_CITY = 'New York, NY';

const styles = StyleSheet.create({
  statusBarIos: {
    backgroundColor: HEADER_COLOR,
    height: 50,
  },
  container: {
    backgroundColor: 'snow',
  },
  header: {
    backgroundColor: HEADER_COLOR,
    paddingTop: 0,
  },
  headerImage: {
    backgroundColor: HEADER_COLOR,
    height: 64,
    resizeMode: 'cover',
  },
  inputView: {
    backgroundColor: HEADER_COLOR,
    padding: 8,
  },
  input: {
    backgroundColor: 'white',
    borderColor: HEADER_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    height: 32,
    margin: 4,
    padding: 4,
  },
});

const onSubmit = (_, searchText, locationText, setVenues) => {
  const searchTextSent = searchText ? searchText : 'food';
  const locationTextSent = locationText ? locationText : DEFAULT_CITY;
  const searchURL = `https://api.foursquare.com/v2/venues/search?${FS_CREDS}&near=${locationTextSent}&query=${searchTextSent}&v=20201016`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data.response || !data.response.venues) {
        if (data.meta.errorDetail) {
          console.error();
          Alert.alert('Something went wrong', data.meta.errorDetail);
        }
        setVenues([]);
        return;
      }
      const venues = data.response.venues.map((venue) => {
        const category = venue.categories.pop();
        const defaultIconObject = {prefix: '', suffix: ''};
        const categoryIcon = category ? category.icon : defaultIconObject;
        const categoryName = category ? category.name : 'Sweet Spot';

        return {
          key: venue.id,
          name: venue.name,
          address: venue.location.address,
          city: venue.location.city,
          category: categoryName,
          icon: categoryIcon ? categoryIcon : defaultIconObject,
        };
      });
      setVenues(venues);
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Something went wrong', error.message);
      setVenues([]);
    });
};

const statusBar = () => {
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.statusBarIos}>
        <StatusBar translucent={true} />
      </View>
    );
  }

  return <StatusBar backgroundColor={HEADER_COLOR} />;
};

export const LocationDetailsView = ({navigation}) => {
  useEffect(() => {
    console.log('component did mount');
  }, []);

  return (
    <>
      {statusBar()}
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Hello</Text>
        </View>
      </SafeAreaView>
    </>
  );
};
