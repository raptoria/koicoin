import { Alert, Card, PageHeader, Spin, Form, Button, Input } from 'antd';
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
import { Data, SankeyDataNode, SankeyProps } from '@nivo/sankey';

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

  const getSankeyData: Data['data'] = useMemo(() => {
    /*    const nodes = 
    return {
      nodes,
      links
    } */
    return {
      nodes: [
        {
          id: 'John',
          color: 'hsl(235, 70%, 50%)',
        },
        {
          id: 'Raoul',
          color: 'hsl(260, 70%, 50%)',
        },
        {
          id: 'Jane',
          color: 'hsl(94, 70%, 50%)',
        },
        {
          id: 'Marcel',
          color: 'hsl(10, 70%, 50%)',
        },
        {
          id: 'Ibrahim',
          color: 'hsl(283, 70%, 50%)',
        },
        {
          id: 'Junko',
          color: 'hsl(310, 70%, 50%)',
        },
      ],
      links: [
        {
          source: 'Marcel',
          target: 'John',
          value: 169,
        },
        {
          source: 'Marcel',
          target: 'Raoul',
          value: 28,
        },
        {
          source: 'Marcel',
          target: 'Junko',
          value: 164,
        },
        {
          source: 'Marcel',
          target: 'Jane',
          value: 120,
        },
        {
          source: 'Jane',
          target: 'Ibrahim',
          value: 119,
        },
        {
          source: 'Jane',
          target: 'John',
          value: 54,
        },
        {
          source: 'Junko',
          target: 'Ibrahim',
          value: 21,
        },
        {
          source: 'Junko',
          target: 'Jane',
          value: 80,
        },
        {
          source: 'Junko',
          target: 'Raoul',
          value: 21,
        },
        {
          source: 'John',
          target: 'Ibrahim',
          value: 122,
        },
        {
          source: 'John',
          target: 'Raoul',
          value: 179,
        },
      ],
    };
  }, [transactions]);

  console.log('address', address);

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
          <SankeyGraph data={getSankeyData} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
