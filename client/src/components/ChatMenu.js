import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class ChatMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = (e) => {
    this.setState({ anchorEl: null });
  };
  handleLeaveClick = () => {
    this.handleClose();
    this.props.leaveChat();
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton aria-controls="simple-menu" color="inherit" aria-haspopup="true" onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} keepMounted onClose={this.handleClose}>
          <MenuItem onClick={this.handleLeaveClick} onClose={this.handleClose}>
            채팅방 나가기
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

ChatMenu.propTypes = {
  leaveChat: PropTypes.func.isRequired,
};

export default ChatMenu;
