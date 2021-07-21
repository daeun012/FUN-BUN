import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class ChatMessageList extends Component {
  render() {
    const { match, user } = this.props;

    if (!match.params.chatId) {
      return 'not selected';
    } else if (user.isMember || user.isCreator) {
      return 'join sucess ';
    } else {
      return 'please join';
    }
  }
}

export default withRouter(ChatMessageList);
