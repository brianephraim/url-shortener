import React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 40,
  },
});

const AppEntry = () => <Text style={styles.text}>URL Shortener</Text>;

export default AppEntry;
