export default {
  user: {
    userId: (value) => {
      const userIdRegex = /^[a-zA-Z0-9]{5,20}$/;

      if (value === '') {
        return {
          userIdError: '필수 정보입니다.',
          userIdValid: false,
        };
      } else if (/\s/.test(value)) {
        return {
          userIdError: '공백은 사용할 수 없습니다.',
          userIdValid: false,
        };
      } else if (!value.match(userIdRegex)) {
        return {
          userIdError: '5~20자의 영문 대 소문자와 숫자만 사용 가능합니다.',
          userIdValid: false,
        };
      }
      return {
        userIdError: '',
        userIdValid: true,
      };
    },

    password: (value) => {
      const passwordRegex = /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

      if (value === '') {
        return {
          passwordError: '필수 정보입니다.',
          passwordValid: false,
        };
      } else if (/\s/.test(value)) {
        return {
          passwordError: '공백은 사용할 수 없습니다.',
          passwordValid: false,
        };
      } else if (!value.match(passwordRegex)) {
        return {
          passwordError: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
          passwordValid: false,
        };
      }
      return {
        passwordError: '',
        passwordValid: true,
      };
    },

    username: (value) => {
      const usernameRegex = /^[가-힣]{2,4}$/;

      if (value === '') {
        return {
          usernameError: '필수 정보입니다.',
          usernameValid: false,
        };
      } else if (!value.match(usernameRegex)) {
        return {
          usernameError: '이름을 정확히 입력해주세요.',
          usernameValid: false,
        };
      }
      return {
        usernameError: '',
        usernameValid: true,
      };
    },

    email: (value) => {
      const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if (value === '') {
        return {
          emailError: '필수 정보입니다.',
          emailValid: false,
        };
      } else if (/\s/.test(value)) {
        return {
          emailError: '이메일을 정확히 입력해주세요',
          emailValid: false,
        };
      } else if (!value.match(emailRegex)) {
        return {
          emailError: '이메일을 정확히 입력해주세요',
          emailValid: false,
        };
      }
      return {
        emailError: '',
        emailValid: true,
      };
    },

    studentId: (value) => {
      const studentRegex = /^[0-9]{8}$/;

      if (value === '') {
        return {
          studentIdError: '필수 정보입니다.',
          studentIdValid: false,
        };
      } else if (/\s/.test(value)) {
        return {
          studentIdError: '학번을 정확히 입력해주세요',
          studentIdValid: false,
        };
      } else if (!value.match(studentRegex)) {
        return {
          studentIdError: '학번을 정확히 입력해주세요',
          studentIdValid: false,
        };
      }
      return {
        studentIdError: '',
        studentIdValid: true,
      };
    },
  },
};
