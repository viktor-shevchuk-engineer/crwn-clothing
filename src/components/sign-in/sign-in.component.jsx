import { Component } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import { auth, provider } from '../../firebase/firebase.utils.js';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignInContainer, ButtonsContainer } from './sign-in.styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    signInWithEmailAndPassword(auth, email, password)
      .catch(console.log)
      .finally(() => this.setState({ email: '', password: '' }));
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSignInWithGoogle = () =>
    signInWithPopup(auth, provider).catch(console.log);

  render() {
    const {
      handleSubmit,
      handleChange,
      handleSignInWithGoogle,
      state: { email, password },
    } = this;

    return (
      <SignInContainer>
        <h2>I already have an account.</h2>
        <span>Sign in with your email and password.</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            id="email"
            value={email}
            required
            handleChange={handleChange}
            label="email"
          />
          <FormInput
            type="password"
            name="password"
            id="password"
            value={password}
            required
            handleChange={handleChange}
            label="password"
          />

          <ButtonsContainer>
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={handleSignInWithGoogle}
              isGoogleSignIn
            >
              Sign In with Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;