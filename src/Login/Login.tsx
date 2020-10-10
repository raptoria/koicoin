import {
  PageHeader,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  Alert,
} from 'antd';
import React, { useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/store';
import { LoginFields, Pages, FieldData, LoginFieldKeys } from '../store/types';
import styles from './login.module.scss';

const Login: React.FC = () => {
  const {
    state: {
      ledger: { fields },
    },
    actions,
  } = useContext(StoreContext);

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
      //actions.login({ fields });
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
      <Form
        fields={getFieldData}
        onFinish={onFinish}
        onValuesChange={(changedValues, values) => {
          onChange(values);
        }}
      >
        <Form.Item label="address" name="address">
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={!fields.address}
          data-testid="signinButton"
        >
          Sign in
        </Button>
      </Form>
      Login Please <Link to={Pages.dashboard}>Login</Link>
    </div>
  );
};

export default Login;
