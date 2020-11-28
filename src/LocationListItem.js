import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const IMAGE_SIZE = 64;
const IMAGE_COLOR = 'dodgerblue';

const styles = StyleSheet.create({
  icon: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: IMAGE_COLOR,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  container: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  description: {
    paddingLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  address: {
    fontSize: 14,
  },
  city: {
    fontSize: 14,
  },
  category: {},
});

export const LocationListItem = (props) => {
  const uri = props.item.icon.prefix + IMAGE_SIZE + props.item.icon.suffix;

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      onPress={() => {
        props.navigation.navigate('details');
      }}
      underlayColor="snow">
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri}} />
        <View style={styles.description}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
            {props.item.name}
          </Text>
          <Text style={styles.address}>{props.item.address}</Text>
          <Text style={styles.city}>{props.item.city}</Text>
        </View>
        <View style={styles.category}>
          <Text>{props.item.category}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
