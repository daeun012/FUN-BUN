import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '400px',
    padding: theme.spacing(3),
  },
  createButton: {
    float: 'right',
    marginTop: theme.spacing(1),
  },
});

class CreateChatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      desc: '',
      titleError: '',
      titleValid: false,
    };
    this.Auth = new AuthService();
  }

  toggleModal = () => {
    this.setState({
      open: !this.state.open,
      title: '',
      desc: '',
      titleError: '',
      titleValid: false,
    });
  };

  handleChange = (e) => {
    const isTitle = e.target.name === 'title';
    const isDesc = e.target.name === 'desc';
    if (isTitle) {
      this.setState({ title: e.target.value });
    }

    if (isDesc) {
      this.setState({ desc: e.target.value });
    }
  };

  validateTitle = () => {
    let titleError = '';
    if (this.state.title.length <= 2) {
      titleError = '3글자 이상 입력해주세요';
    }

    if (titleError) {
      this.setState({ titleValid: false });
    } else if (this.state.title !== '') {
      this.setState({ titleValid: true });
    }
    this.setState({ titleError });
  };

  handleCreate = async (e) => {
    e.preventDefault();

    let { title, desc } = this.state;

    this.props.createChat(title, desc);
    this.toggleModal();
  };

  render() {
    const { classes } = this.props;
    const { open, title, titleError, titleValid, desc } = this.state;
    return (
      <React.Fragment>
        <div onClick={this.toggleModal}>
          <IconButton edge="end" color="primary">
            <AddIcon />
          </IconButton>
        </div>
        <Modal
          className={classes.modal}
          open={open}
          onClose={this.toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper className={classes.paper}>
              <Typography style={{ fontWeight: 'bold', color: '#545d8e' }} variant="h5" id="modal-title">
                Create New Chat
              </Typography>
              <Box my={1}>
                <TextField
                  variant="outlined"
                  name="title"
                  required
                  fullWidth
                  label="Title"
                  margin="normal"
                  value={title}
                  onChange={this.handleChange}
                  onKeyUp={this.validateTitle}
                  error={titleError === '' ? false : true}
                  helperText={titleError}
                />
                <TextField variant="outlined" name="desc" required fullWidth label="Description" margin="normal" value={desc} onChange={this.handleChange} />
              </Box>
              <Button className={classes.createButton} variant="outlined" color="primary" onClick={this.handleCreate} disabled={!titleValid}>
                CREATE
              </Button>
            </Paper>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}
CreateChatButton.propTypes = {
  createChat: PropTypes.func.isRequired,
};
export default withSnackbar(withStyles(styles)(CreateChatButton));
