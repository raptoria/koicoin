import { Alert, Card, Spin, Empty, PageHeader } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { StoreContext } from '@/ui/store/store';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SankeyGraph } from '@/ui/graph/Sankey';
import { getSankeyData } from '@/ui/graph/helpers';
import SendCoinForm from '@/ui/form/Sendcoin';
import Link from 'next/link';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: max-content 40rem;
  grid-template-columns: 20rem 1fr;
  background: var(--quaternary-background);

  @media all and (max-width: 768px) {
    grid-template-rows: min-content min-content 500px;
    grid-template-columns: 100%;

    .secondColumn {
      margin-right: 0;
    }

    header {
      grid-column: span 1;
    }
  }
`;

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

  return (
    <StyledContainer>
      <header>
        <PageHeader
          title=""
          subTitle="Koicoin Dashboard"
          avatar={{ src: '/assets/images/logo.png' }}
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
              <Link href="/" onClick={logout}>
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
    </StyledContainer>
  );
};

export default Dashboard;
