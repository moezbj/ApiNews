import React from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const NewsPage = ({props, children, uri}) => {
  const {main, title, img, link} = styles;
  return (
    <View style={main}>
      <Text style={title}>{props}</Text>
      <Image style={img} source={{uri: uri}} />
      <Text style={link}>{children}</Text>
    </View>
  );
};

const styles = {
  main: {
    flexDirection: 'column',
    padding: 5,
    margin: 3,
    borderColor: 'green',
    borderWidth: 1
  },
  title: {
    alignSelf: 'center',
    fontSize: 18
  },
  img: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  link: {
    fontSize: 15,
    alignSelf: 'center'
  }
};

NewsPage.propTypes = {
  props: PropTypes.string,
  children: PropTypes.array,
  uri: PropTypes.string
};

export {NewsPage};
