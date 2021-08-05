import React from 'react';
import PropTypes from 'prop-types';
import WelcomePage from './WelcomePage';
import MatchManualPage from './MatchManualPage';
import ActiveChatPage from './ActiveChatPage';
import MatchPage from './MatchPage';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  chatLayout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
  },
});
const Chat = ({ classes, joinChat, sendChatMsg, randomMatch, sendMatchMsg, activeChat, activeMessages, matchMessages, user }) => (
  <main className={classes.chatLayout}>
    <Route exact path="/" component={WelcomePage} />
    <Route exact path="/match" render={() => <MatchManualPage randomMatch={() => randomMatch(user.grade, user.dept)} />} />
    <Route path="/chat/:chatId" render={() => <ActiveChatPage joinChat={() => joinChat(activeChat._id)} sendChatMsg={sendChatMsg} user={user} activeChat={activeChat} messages={activeMessages} />} />
    <Route path="/match/:matchId" render={() => <MatchPage sendMatchMsg={sendMatchMsg} user={user} messages={matchMessages} />} />
  </main>
);

Chat.propTypes = {
  joinChat: PropTypes.func.isRequired,
  sendChatMsg: PropTypes.func.isRequired,
  randomMatch: PropTypes.func.isRequired,
  sendMatchMsg: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    members: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  activeMessages: PropTypes.array.isRequired,
  matchMessages: PropTypes.array.isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Chat);
