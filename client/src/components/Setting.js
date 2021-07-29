import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Setting extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = (e) => {
    this.setState({ anchorEl: null });
  };
  handleLogoutClick = () => {
    this.handleClose();
    this.props.onLogout();
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton aria-controls="simple-menu" color="inherit" aria-haspopup="true" onClick={this.handleClick}>
          <SettingsIcon />
        </IconButton>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} keepMounted onClose={this.handleClose}>
          <MenuItem onClick={this.handleLeaveClick} onClose={this.handleClose}>
            프로필 편집
          </MenuItem>
          <MenuItem onClick={this.handleLogoutClick} onClose={this.handleClose}>
            로그아웃
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

Setting.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Setting;
