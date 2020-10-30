import React, { useCallback, useContext } from 'react';
import { Button, Input, Form } from 'antd';
import { SendKoicoinFields } from '../store/types';
import { BankOutlined, SendOutlined } from '@ant-design/icons';
import { StoreContext } from '../store/store';

const SendCoinForm: React.FC = () => {
  const {
    state: {
      ledger: { address },
    },
    actions,
  } = useContext(StoreContext);
  const onFinish = useCallback(
    (fields: SendKoicoinFields) => {
      const { toAddress, amount } = fields;
      actions.sendCoins({ fromAddress: address!, toAddress, amount });
    },
    [actions]
  );

  return (
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

      <Button type="primary" htmlType="submit" data-testid="sendKoicoinButton">
        Send Koicoins
      </Button>
    </Form>
  );
};

export default SendCoinForm;
