import React, { useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './login.module.scss';

const Login: React.FC = () => {
  const {
    state: {
      ledger: { address, error },
    },
    actions,
  } = useContext(StoreContext);

  return (
    <div className={styles.login}>
      Login Please <Link to={Pages.dashboard}>Login</Link>
    </div>
  );
};

export default Login;
