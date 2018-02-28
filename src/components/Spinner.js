import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

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
Spinner.propTypes = {
  loading: PropTypes.bool
};
export default Spinner;
