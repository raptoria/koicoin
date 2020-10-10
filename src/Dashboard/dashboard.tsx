import React, { useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './dashboard.module.scss';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { address, error },
    },
    actions,
  } = useContext(StoreContext);

  return (
    <div className={styles.login}>
      Dashboard <Link to={Pages.login}>Sign out</Link>
    </div>
  );
};

export default Dashboard;
