import io from 'socekt.io-client';

export function socektsConnect() {
  return (dispatch) => {
    dispatch({ type: types.GET_ALL_CHAT });
    return axios
      .get('/chat/allchat')
      .then((res) => {
        dispatch({ type: types.GET_ALL_CHAT_SUCCESS, payload: { allChat: res.data['allChat'] } });
      })
      .catch((err) => {
        dispatch({ type: types.GET_ALL_CHAT_FAILURE, payload: { error: err.response.data['error'] } });
      });
  };
}
