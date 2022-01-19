import React, { useContext } from 'react';
import MapProd from '../../components/map';
import styles from './style.module.scss';
import GLobalContext from '../../contexts/AppContext/Context';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const DashBoard = () => {
  // get context
  const { globalState } = useContext(GLobalContext);

  // // get users effect
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const Users = await axios.get('https://ms-proto.herokuapp.com/users')
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.container}>
      {/* ----- map section ----- */}
      <MapProd width='inherit' height='80vh' />

      {/* ----- content section ----- */}
      <section className={styles.content__area}>
        {/* ----- title div ----- */}
        <Grid
          container
          spacing={4}
          rowSpacing={8}
          sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: 'none',
            padding: '5% 0',
            minHeight: '400',
          }}
        >
          {/* ----- table one ----- */}
          <Grid item lg={6} md={12} xs={12}>
            <section className={styles.table}>
              <div className={styles.table__title} theme='dark'>
                <h3>Asset summary</h3>
                <h4>Summary of all available entries</h4>
              </div>

              <TableContainer sx={{ width: '95%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Condition</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {globalState.projects &&
                      globalState.projects.map((item, index) => {
                        return (
                          <TableRow key={index} sx={{ color: '#23282B' }}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              {item.maintenance[0].condition}
                            </TableCell>
                            <TableCell>
                              {item.maintenance[0].maintenanceStatus}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </Grid>

          {/* ----- table two ----- */}
          <Grid item lg={6} md={12} xs={12}>
            <section className={styles.table}>
              <div className={styles.table__title}>
                <h3>Staff Table</h3>
                <h4>Overview of all staff in organization</h4>
              </div>

              <TableContainer sx={{ width: '95%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Staff name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Country</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {globalState.users &&
                      globalState.users.map((data, index) => {
                        return (
                          data.username &&
                          data.email && (
                            <TableRow key={index} sx={{ color: '#23282B' }}>
                              <TableCell>{data.name}</TableCell>
                              <TableCell>{data.email}</TableCell>
                              <TableCell>{data.roles[0]}</TableCell>
                              <TableCell>{data.country}</TableCell>
                            </TableRow>
                          )
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default DashBoard;
