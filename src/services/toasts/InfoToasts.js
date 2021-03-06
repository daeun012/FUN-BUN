import Materialize from 'materialize-css';
import './Toasts.css';

export default {
  custom: {
    info: (message, length) => {
      Materialize.toast({
        html: message,
        displayLength: length,
        classes: 'rounded info-toasts',
      });
    },
  },
};
