import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1', '#8e44ad'];

function ColorForm(str) {
  try {
    const index = str
      .toString()
      .split('')
      .map((char) => char.charCodeAt())
      .reduce((sum, num) => sum + num, 0);

    const colorIndex = index % colors.length;
    return colors[colorIndex];
  } catch (e) {
    console.error(e);
    return '#6699CC';
  }
}

const UserAvatar = ({ color, size, name }) => {
  const innerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: ColorForm(color),
  };
  return <Avatar style={innerStyle}>{name.slice(1, 3)}</Avatar>;
};

export default UserAvatar;
