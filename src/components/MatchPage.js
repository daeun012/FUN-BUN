import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const styles = (theme) => ({
  messagesWrapper: {
    overflowY: 'scroll',
    height: 'calc(100% - 75px)',
    paddingTop: theme.spacing(3),
    paddingBottom: '50px',
  },
  messageInputWrapper: {
    backgroundColor: theme.palette.action.selected,
  },
  messageForm: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  messageInput: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginLeft: 0,
  },
  inputInput: {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
  },
});

class MatchPage extends Component {
  state = {
    value: '',
  };

  handleValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    if (value !== '') {
      this.props.sendMatchMsg(value);
    }
    this.setState({
      value: '',
    });
  };

  componentDidMount() {
    this.scrollDownHistory();
  }
  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
    }
  }
  render() {
    const { classes, messages, user } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <div
          className={classes.messagesWrapper}
          ref={(wrapper) => {
            this.messagesWrapper = wrapper;
          }}
        >
          {messages.map((message) => {
            return <ChatMessage key={message._id} user={user} {...message} />;
          })}
        </div>
        <div className={classes.messageInputWrapper}>
          <form className={classes.messageForm} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <div className={classes.messageInput}>
                  <InputBase
                    fullWidth
                    value={this.state.value}
                    onChange={this.handleValueChange}
                    placeholder="Write your message"
                    classes={{
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Grid>
              <Grid item xs={3}>
                <Button fullWidth variant="contained" color="primary" endIcon={<SendIcon />} size="large" type="submit">
                  send
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

MatchPage.propTypes = {
  activeChat: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.array,
    createdAt: PropTypes.string,
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      sender: PropTypes.instanceOf(Object).isRequired,
      chatId: PropTypes.string.isRequired,
      statusMessage: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MatchPage);
