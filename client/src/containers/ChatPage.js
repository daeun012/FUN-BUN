import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllChat, getMyChat } from '../actions/chat-actions';
import ChatPage from '../components/ChatPage';

const mapStateToProps = (state) => {
  return {
    chat: {
      allChat: state.chat.allChat,
      myChat: state.chat.myChat,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChat: () => {
      return dispatch(getAllChat());
    },
    getMyChat: (uid) => {
      return dispatch(getMyChat(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
