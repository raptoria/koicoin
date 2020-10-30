import { Alert, Card, PageHeader, Spin, Empty, Switch } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages } from '../store/types';
import styles from './dashboard.module.scss';
import logo from '../assets/images/logo.png';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SankeyGraph } from '../Graph/Sankey';
import { getSankeyData } from '../Graph/helpers';
import SendCoinForm from '../Form/Sendcoin';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { address, transactions, balance, error, loading },
      theme: { dark },
    },
    actions,
  } = useContext(StoreContext);

  useEffect(() => {
    actions.getTransactionsForAddress({ address: address });
  }, []);

  const logout = useCallback(() => {
    actions.logout();
  }, [actions]);

  const getMemoizedSankeyData = useMemo(() => {
    let data = null;
    if (transactions && transactions.length > 0) {
      data = getSankeyData(transactions, address);
    }

    return data;
  }, [transactions]);

  const onThemeChange = (checked: boolean) => {
    actions.updateTheme({ dark: checked });
  };

  return (
    <div className={styles.dashboard}>
      <header>
        <PageHeader
          title=""
          subTitle="Koicoin sender"
          avatar={{ src: logo }}
          extra={[
            <Switch
              key="themeSwitch"
              defaultChecked
              onChange={onThemeChange}
            />,
            <div key="userActions">
              <Avatar
                key="userIcon"
                className="extraAvatar"
                size="small"
                icon={<UserOutlined />}
              />
              <span>{address}</span>
              <Avatar
                key="logoutIcon"
                size="small"
                className="extraAvatar"
                icon={<ArrowRightOutlined />}
              />
              <Link to={Pages.login} key="login" onClick={logout}>
                Sign out
              </Link>
            </div>,
          ]}
        />
        {error ? (
          <Alert type="error" showIcon={true} message={error} closeText="Ok" />
        ) : null}
      </header>

      <div className="firstColumn">
        <Card title="Koicoin Balance" bordered={false}>
          {loading ? <Spin /> : balance}
        </Card>
        <Card title="Send Koicoin" bordered={false}>
          <SendCoinForm />
        </Card>
      </div>
      <div className="secondColumn">
        <Card
          title="Koicoin History Graph"
          bordered={false}
          className="graphCard"
        >
          {loading ? <Spin className="loadingIndicator" /> : null}
          {getMemoizedSankeyData ? (
            <SankeyGraph data={getMemoizedSankeyData} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
