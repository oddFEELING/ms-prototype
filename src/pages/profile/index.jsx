import React, { useEffect, useState, useContext, useRef } from 'react';
import styles from './style.module.scss';
import { Grid } from '@mui/material';
import axios from 'axios';
import GLobalContext from '../../contexts/AppContext/Context';

const Profile = () => {
  const formRef = useRef();
  // get global context
  const { globalState, actions } = useContext(GLobalContext);
  // staff object state
  const [StaffObj, setStaffObj] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    roles: [],
    country: '',
  });

  // staff object state setter
  const handlechange = (prop) => (event) => {
    setStaffObj({
      ...StaffObj,
      [prop]: event.target.value,
    });
    if (prop === 'role')
      return setStaffObj({
        ...StaffObj,
        roles: [...StaffObj.roles, event.target.value],
      });
  };

  // send user object
  const handleSubmit = async (event) => {
    event.preventDefault();

    // form validation
    if (StaffObj.email.length === '') return alert('email cannot be empty');
    if (StaffObj.password.length <= 3) return alert('password too short!'); // submit entry
    try {
      await axios.post('https://ms-proto.herokuapp.com/user', StaffObj);
    } catch (error) {
      throw new Error(error);
    }

    // update user list
    try {
      await axios
        .get('https://ms-proto.herokuapp.com/user')
        .then((res) => actions.setUserList(res.data))
        .then(() => alert(`🎉Staff Added!`))
        .catch((error) => console.log(`Error --> ${error}`));
    } catch (error) {
      throw new Error(error);
    } finally {
      formRef.current.reset();
    }
  };

  // get currrent user
  useEffect(() => {
    (async function () {
      try {
        await axios
          .get('https://ms-proto.herokuapp.com/user', {})
          .then((res) => {});
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      {/* ----- banner section ----- */}
      <section className={styles.banner__container}>
        <img
          src='https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
          alt=''
          className={styles.banner__img}
        />
      </section>
      s
      <section className={styles.content__area}>
        <Grid
          container
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          spacing={3}
        >
          <Grid item xs={12} md={12} lg={6}>
            {/* ----- profile card ----- */}
            <section className={styles.profile__card}>
              <div
                style={{
                  display: 'flex',
                  gap: '2vw',
                  padding: '2.5% 1%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderBottom: 'thin solid #23282B',
                }}
              >
                <img
                  src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                  alt=''
                  className={styles.profile__img}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                  }}
                >
                  <h1>{globalState.currentUser.name}</h1>
                  <p>{globalState.currentUser.roles}</p>
                </div>
              </div>
              <div className={styles.profile__content}>
                <p>
                  <b>FullName: </b> {globalState.currentUser.name}
                </p>
                <p>
                  <b>Email: </b> {globalState.currentUser.email}
                </p>
                <p>
                  <b>Role: </b> {globalState.currentUser.roles}
                </p>
                <p>
                  <b>Country: </b> {globalState.currentUser.country}
                </p>
              </div>
            </section>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            {globalState.currentUser.roles.indexOf('Admin') ? (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '400px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h1>Only Admins can add Staff</h1>
              </div>
            ) : (
              <form className={styles.profile__card} ref={formRef}>
                <h1>Add new staff</h1>
                <Grid
                  container
                  sx={{
                    width: '100%',
                  }}
                  spacing={3}
                >
                  {/* ----- name fiels ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='text'
                      required
                      placeholder='staff name'
                      onChange={handlechange('name')}
                    />
                  </Grid>

                  {/* ----- username field ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='text'
                      required
                      placeholder='username'
                      onChange={handlechange('username')}
                    />
                  </Grid>

                  {/* ----- email field ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='email'
                      required
                      placeholder='example@domain.com'
                      onChange={handlechange('email')}
                    />
                  </Grid>

                  {/* ----- password field ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='password'
                      required
                      placeholder='choose password'
                      onChange={handlechange('password')}
                    />
                  </Grid>

                  {/* ----- role field ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='text'
                      required
                      placeholder='country'
                      onChange={handlechange('country')}
                    />
                  </Grid>

                  {/* ----- country field ----- */}
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      type='text'
                      required
                      placeholder='Staff role'
                      onChange={handlechange('roles')}
                    />
                  </Grid>

                  {/* ----- submit button----- */}
                  <Grid item xs={12} md={12} lg={12}>
                    <button type='submit' onClick={handleSubmit}>
                      Add Staff
                    </button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Profile;
