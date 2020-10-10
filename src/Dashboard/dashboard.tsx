import React, { useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './dashboard.module.scss';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { fields },
    },
    actions,
  } = useContext(StoreContext);

  return (
    <div className={styles.login}>
      Dashboard <Link to={Pages.login}>Sign out</Link>
      {JSON.stringify(fields)}
    </div>
  );
};

export default Dashboard;
