import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {LocationListItem} from './LocationListItem';
import {HEADER_COLOR} from './constants';

const FS_CREDS =
  'client_id=J2FBN0W3VVDRNSQCEAIFRSTAOFOWBY0ZSX2MHKUM2MN51LHN' +
  '&client_secret=LATTEUVAC1KXAIAIDKJ3ZNXAKMKVMIC5HR3STL1SO0TRDNFM';
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

export const SearchLocationsView = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('');
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    onSubmit(undefined, '', '', setVenues);
  }, []);

  return (
    <>
      {statusBar()}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{
              uri:
                'https://uc683a376891a592f331ff7f6d12.previews.dropboxusercontent.com/p/thumb/AA-FvRqzk2hX5muuUVnnF3JN4Nj_J92OhhRTrdABQI-Me0DFL5rdJWm44O-04tHFoI4jHIXUONC2-6EW2axOzgwQ3yDWnAaLAqhZbiq6y1oxM6r0eY5wtXoRsjK_D_ObA6oLdK_H_y6NHW1z6_ewWyCYVZA7zfajw9tKJXGRWwqPOz3ysONrurCyG-eZ-zeNfYncypwQVu67a4hV6YTvMLIAKoJx3to7IM4PfAapKybc5UB3uvbjJ3wJjXAfxBrCKZ2iQfFWRN_d51knTwC8PnDRXx2HcHswSzPx02u3U-Z7cDiR0-IQDIAbZrjV-9QOjHd6EEsWF6-WRvny3_-CWZat6zTKGGnA4QmkE9CH0b51Hg/p.png?fv_content=true&size_mode=5',
            }}
          />
          <View style={styles.inputView}>
            <TextInput
              placeholder="Type something to search for like coffee or pizza"
              placeholderTextColor="darkgray"
              onChangeText={(text) => setSearchText(text)}
              returnKeyType="search"
              style={styles.input}
              onSubmitEditing={(event) =>
                onSubmit(event, searchText, locationText, setVenues)
              }
            />
            <TextInput
              placeholder={DEFAULT_CITY}
              placeholderTextColor="darkgray"
              onChangeText={(text) => setLocationText(text)}
              returnKeyType="search"
              style={styles.input}
              onSubmitEditing={(event) =>
                onSubmit(event, searchText, locationText, setVenues)
              }
            />
          </View>
        </View>
        <FlatList
          data={venues}
          renderItem={({item}) => (
            <LocationListItem item={item} navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </>
  );
};
