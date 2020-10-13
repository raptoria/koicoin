import { Card, PageHeader } from 'antd';
import React, { Fragment, useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './dashboard.module.scss';
import logo from '../assets/images/logo.png';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { fields },
    },
    actions,
  } = useContext(StoreContext);

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title=""
        subTitle="Jobcoin sender"
        avatar={{ src: logo }}
        extra={[
          <div key="userInfo">
            <Avatar key="avatar" size="small" icon={<UserOutlined />} />
            <span>{fields.address}</span>
            <Link to={Pages.login} key="login">
              Sign out
            </Link>
          </div>,
        ]}
      />
      <div className="firstColumn">
        <Card title="Jobcoin Balance" bordered={false}>
          24242525252
        </Card>
        <Card title="Send Jobcoin" bordered={false}>
          24242525252
        </Card>
      </div>
      <div className="secondColumn">
        <Card title="Jobcoin History Graph" bordered={false}>
          D3
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
