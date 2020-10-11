import {
  PageHeader,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  Alert,
  Card,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { LoginFields, Pages, FieldData, LoginFieldKeys } from '../store/types';
import styles from './login.module.scss';

import logo from '../assets/images/logo.png';

const Login: React.FC = () => {
  const {
    state: {
      ledger: { fields },
    },
    actions,
  } = useContext(StoreContext);

  let history = useHistory();

  const getFieldData = useMemo((): FieldData[] => {
    const fieldsData: FieldData[] = [];
    if (!fields) {
      return fieldsData;
    }

    for (const [key, value] of Object.entries(fields)) {
      fieldsData.push({
        name: [key],
        value,
        touched: false,
        validating: false,
        errors: fields.errors[key as LoginFieldKeys] || [],
      });
    }
    return fieldsData;
  }, [fields]);

  const onFinish = useCallback(
    (fields: LoginFields) => {
      history.push(Pages.dashboard);
    },
    [actions]
  );

  const onChange = useCallback(
    (fields: LoginFields) => {
      actions.updateLedger({ fields });
    },
    [actions]
  );

  console.log(fields);

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
        <Form
          fields={getFieldData}
          onFinish={onFinish}
          onValuesChange={(changedValues, values) => {
            onChange(values);
          }}
        >
          <Form.Item name="address">
            <Input
              size="large"
              prefix={<HomeOutlined className="address" />}
              placeholder="Jobcoin Address"
            />
          </Form.Item>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            disabled={!fields.address}
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
