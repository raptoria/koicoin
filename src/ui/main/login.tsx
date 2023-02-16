import { Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';
import { StoreContext } from '../store/store';
import { LoginFields, Pages } from '../store/types';
import styles from '@/styles/login.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const { actions } = useContext(StoreContext);
  const router = useRouter();
  const onFinish = useCallback(
    (fields: LoginFields) => {
      actions.updateLedger({ address: fields.address });
      router.push('/dashboard');
    },
    [actions, router]
  );

  return (
    <div className={styles.login}>
      <div className="form">
        <Image
          src="/assets/images/logo.png"
          unoptimized
          alt="Koincoin"
          width="100"
          height="100"
        />
        <h1>
          koi<span>coin</span>
        </h1>
        <hr />
        <h3>
          Welcome! Sign in With Your <br /> Koicoin Address
        </h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="address"
            rules={[
              { required: true, message: 'Please input a valid address' },
            ]}
          >
            <Input
              size="large"
              prefix={<HomeOutlined className="inputIcon" />}
              placeholder="Enter Koicoin Address"
            />
          </Form.Item>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            data-testid="signin"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
