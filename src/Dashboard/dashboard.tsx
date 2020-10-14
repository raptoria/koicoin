import { Alert, Card, PageHeader } from 'antd';
import React, { Fragment, useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './dashboard.module.scss';
import logo from '../assets/images/logo.png';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { fields, transactions, balance, error },
    },
    actions,
  } = useContext(StoreContext);

  useEffect(() => {
      actions.getTransactionsForAddress({ address: fields?.address })
  }, []);


  console.log('balance', balance);

  return (
    <div className={styles.dashboard}>
      <header>
      <PageHeader
        title=""
        subTitle="Jobcoin sender"
        avatar={{ src: logo }}
        extra={[
          <div key="userActions">
            <Avatar
              key="userIcon"
              className="extraAvatar"
              size="small"
              icon={<UserOutlined />}
            />
            <span>{fields?.address}</span>
            <Avatar
              key="logoutIcon"
              size="small"
              className="extraAvatar"
              icon={<ArrowRightOutlined />}
            />
            <Link to={Pages.login} key="login">
              Sign out
            </Link>
          </div>,
        ]}
      />
      {error ? (
        <Alert
          type="error"
          showIcon={true}
          message={error}
          closeText="Ok"
        />
      ) : null}
      </header>

      <div className="firstColumn" >
        <Card title="Jobcoin Balance" bordered={false}>
          {balance}
        </Card>
        <Card title="Send Jobcoin" bordered={false}>
          24242525252
        </Card>
      </div>
      <div className="secondColumn" >
        <Card title="Jobcoin History Graph" bordered={false}>
          D3
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
