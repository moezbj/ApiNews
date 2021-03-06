import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Spinner = () => (
  <View style={styles.loading}>
    <ActivityIndicator animating size="large" />
  </View>
);

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  }
});

export default Spinner;
