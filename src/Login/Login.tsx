import { Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { LoginFields, Pages } from '../store/types';
import styles from './login.module.scss';
import logo from '../assets/images/logo.png';

const Login: React.FC = () => {
  const { actions } = useContext(StoreContext);

  let history = useHistory();

  const onFinish = useCallback(
    (fields: LoginFields) => {
      actions.updateLedger({ address: fields.address });
      history.push(Pages.dashboard);
    },
    [actions]
  );

  return (
    <div className={styles.login}>
      <div className="form">
        <img src={logo} className="logo" />
        <h1>
          job<span>coin</span>
        </h1>
        <hr />
        <h3>
          Welcome! Sign in With Your <br /> Jobcoin Address
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
              placeholder="Jobcoin Address"
            />
          </Form.Item>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            data-testid="signinButton"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
