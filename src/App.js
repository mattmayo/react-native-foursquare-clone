import 'react-native-gesture-handler';
import React from 'react';
import {LocationDetailsView} from './LocationDetailsView';
import {SearchLocationsView} from './SearchLocationsView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SEARCH_LOCATIONS_VIEW, LOCATION_DETAILS_VIEW} from './constants';

/*
  Next steps
  1. [DONE] Add FlatList and place venues in list, starting with name
  2. [DONE] Build ListItems including address
  3. [DONE] Plug in searchText and locationText to API call
  4. [DONE] Style
  5. [DONE] Display error message (Alert?)
  6. [DONE] Install on iPhone
  7. [DONE] Navigate to (empty) venue page
  8. Fill out venue page
*/

const Stack = createStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          component={SearchLocationsView}
          name={SEARCH_LOCATIONS_VIEW}
        />
        <Stack.Screen
          component={LocationDetailsView}
          name={LOCATION_DETAILS_VIEW}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
