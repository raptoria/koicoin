import {
  Alert,
  Card,
  PageHeader,
  Spin,
  Form,
  Button,
  Input,
  Empty,
} from 'antd';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { Pages, SendJobcoinFields } from '../store/types';
import styles from './dashboard.module.scss';
import logo from '../assets/images/logo.png';
import Avatar from 'antd/lib/avatar/avatar';
import {
  UserOutlined,
  ArrowRightOutlined,
  BankOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { SankeyGraph } from './graph/sankey';
import { getSankeyData } from './graph/helpers';

const Dashboard: React.FC = () => {
  const {
    state: {
      ledger: { address, transactions, balance, error, loading },
    },
    actions,
  } = useContext(StoreContext);

  useEffect(() => {
    actions.getTransactionsForAddress({ address: address });
  }, []);

  const logout = useCallback(() => {
    console.log('logging out');
    actions.logout();
  }, [actions]);

  const onFinish = useCallback(
    (fields: SendJobcoinFields) => {
      const { toAddress, amount } = fields;
      actions.sendCoins({ fromAddress: address!, toAddress, amount });
    },
    [actions]
  );

  console.log('address', address);

  const getMemoizedSankeyData = useMemo(
    () => getSankeyData(transactions, address),
    [transactions]
  );

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
        <Card title="Jobcoin Balance" bordered={false}>
          {loading ? <Spin /> : balance}
        </Card>
        <Card title="Send Jobcoin" bordered={false}>
          <Form onFinish={onFinish}>
            <Form.Item
              name="toAddress"
              rules={[
                {
                  required: true,
                  message: 'Please input a destination',
                },
              ]}
            >
              <Input
                prefix={<BankOutlined className="inputIcon" />}
                placeholder="Destination Address"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: 'Please input amount',
                },
              ]}
            >
              <Input
                prefix={<SendOutlined className="inputIcon" />}
                placeholder="Amount to Send"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              data-testid="sendJobcoinButton"
            >
              Send Jobcoins
            </Button>
          </Form>
        </Card>
      </div>
      <div className="secondColumn">
        <Card title="Jobcoin History Graph" bordered={false}>
          {transactions ? (
            <SankeyGraph data={getMemoizedSankeyData} />
          ) : (
            <Empty />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
