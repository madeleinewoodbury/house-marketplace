import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={handleChange}
              className='nameInput'
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange}
              className='emailInput'
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleChange}
                className='passwordInput'
              />

              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth */}

          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
