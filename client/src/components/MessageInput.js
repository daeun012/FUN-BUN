import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  messageInputWrapper: {
    backgroundColor: theme.palette.action.selected,
  },
  joinButton: {
    padding: theme.spacing(2),
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

class MessageInput extends Component {
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
      this.props.sendMessage(value);
    }
    this.setState({
      value: '',
    });
  };

  render() {
    const { classes, showJoinButton, onJoinButtonClick } = this.props;
    return (
      <div className={classes.messageInputWrapper}>
        {showJoinButton ? (
          <Button fullWidth color="primary" size="large" onClick={onJoinButtonClick}>
            Join
          </Button>
        ) : (
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
        )}{' '}
      </div>
    );
  }
}
MessageInput.propTypes = {
  showJoinButton: PropTypes.bool.isRequired,
  onJoinButtonClick: PropTypes.func.isRequired,
};
export default withStyles(styles)(MessageInput);
