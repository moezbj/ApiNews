import React from 'react';
import {TextInput, View, Text} from 'react-native';
import PropTypes from 'prop-types';

const Input = ({label, value, onChangeText, placeholder, placeholderTextColor}) => {
  const {inputStyle, labelStyle, containerStyle} = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        underlineColorAndroid="transparent"
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    flex: 3
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    color: '#fff',
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string
};

export {Input};
