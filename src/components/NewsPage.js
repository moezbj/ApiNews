import React from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';

const NewsPage = ({props, children, url}) => {
  const {main, title, img, link} = styles;
  return (
    <View style={main}>
      <View style={title}>{props}</View>
      <Image style={img} source={{uri: url}} />
      <View style={link}>{children}</View>
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
    alignSelf: 'center'
  },
  img: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderColor: 'green',
    borderWidth: 1
  },
  link: {
    alignSelf: 'center'
  }
};

NewsPage.propTypes = {
  props: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.array
};

export {NewsPage};
