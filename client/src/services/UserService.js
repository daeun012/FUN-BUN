export default {
  user: {
    isMember: (user, activeChat) => {
      try {
        return activeChat.members.some((member) => member._id === user._id);
      } catch (err) {
        return false;
      }
    },

    isCreator: (user, activeChat) => {
      try {
        return activeChat.creator._id === user._id;
      } catch (err) {
        return false;
      }
    },
  },
};
