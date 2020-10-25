import { Transaction } from '../../store/types';
import { getSankeyData } from '../helpers';

describe('sankey helpers', () => {
  describe('links and nodes', () => {
    it('overall netting works', () => {
      const transactions: Transaction[] = [
        {
          timestamp: '2020-10-15T17:18:18.665Z',
          fromAddress: 'Clove',
          toAddress: 'Jimmy',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Banana',
          amount: '0.2',
        },
        {
          timestamp: '2020-10-15T17:46:19.999Z',
          fromAddress: 'Clove',
          toAddress: 'Jimmy',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T18:08:37.063Z',
          fromAddress: 'Brian',
          toAddress: 'Jimmy',
          amount: '1',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Banana',
          toAddress: 'Jimmy',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T23:48:00.281Z',
          fromAddress: 'Jimmy',
          toAddress: 'Brian',
          amount: '1',
        },
        {
          timestamp: '2020-10-25T15:15:37.339Z',
          fromAddress: 'Jimmy',
          toAddress: 'Clove',
          amount: '1',
        },
      ];
      const nettedTransactions = getSankeyData(transactions, 'Jimmy');

      expect(nettedTransactions?.links).toEqual([
        {
          target: 'Jimmy',
          source: 'Banana',
          value: 1.8,
        },
        {
          target: 'Jimmy',
          source: 'Clove',
          value: 3,
        },
      ]);

      expect(nettedTransactions?.nodes).toEqual([
        {
          id: 'Banana',
        },
        {
          id: 'Jimmy',
        },
        {
          id: 'Clove',
        },
      ]);
    });

    it('should return null if transactions cancel out ', () => {
      const transactions: Transaction[] = [
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Banana',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Banana',
          toAddress: 'Jimmy',
          amount: '2',
        },
      ];
      const nettedTransactions = getSankeyData(transactions, 'Jimmy');

      expect(nettedTransactions).toBe(null);
    });

    it('should return the correct result', () => {
      const transactions: Transaction[] = [
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Banana',
          amount: '0.7',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Banana',
          toAddress: 'Jimmy',
          amount: '2',
        },
      ];
      const nettedTransactions = getSankeyData(transactions, 'Jimmy');

      expect(nettedTransactions?.links).toEqual([
        {
          target: 'Jimmy',
          source: 'Banana',
          value: 1.3,
        },
      ]);

      expect(nettedTransactions?.nodes).toEqual([
        {
          id: 'Banana',
        },
        {
          id: 'Jimmy',
        },
      ]);
    });

    it('should return the correct result', () => {
      const transactions: Transaction[] = [
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Banana',
          amount: '0.7',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Banana',
          toAddress: 'Jimmy',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Clove',
          toAddress: 'Jimmy',
          amount: '1.5',
        },
      ];
      const nettedTransactions = getSankeyData(transactions, 'Jimmy');

      expect(nettedTransactions?.links).toEqual([
        {
          target: 'Jimmy',
          source: 'Banana',
          value: 1.3,
        },
        {
          target: 'Jimmy',
          source: 'Clove',
          value: 1.5,
        },
      ]);
    });
    it('should return the correct result', () => {
      const transactions: Transaction[] = [
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Nutmeg',
          amount: '11.3',
        },
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Nutmeg',
          toAddress: 'Jimmy',
          amount: '11.3',
        },
        {
          timestamp: '2020-10-15T17:29:42.941Z',
          fromAddress: 'Jimmy',
          toAddress: 'Banana',
          amount: '0.7',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Banana',
          toAddress: 'Jimmy',
          amount: '2',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'Clove',
          toAddress: 'Jimmy',
          amount: '1.5',
        },
        {
          timestamp: '2020-10-15T18:17:52.470Z',
          fromAddress: 'UI',
          toAddress: 'Jimmy',
          amount: '20',
        },
      ];
      const nettedTransactions = getSankeyData(transactions, 'Jimmy');

      expect(nettedTransactions?.links).toEqual([
        {
          target: 'Jimmy',
          source: 'Banana',
          value: 1.3,
        },
        {
          target: 'Jimmy',
          source: 'Clove',
          value: 1.5,
        },
        {
          target: 'Jimmy',
          source: 'UI',
          value: 20,
        },
      ]);

      expect(nettedTransactions?.nodes).toEqual([
        {
          id: 'Banana',
        },
        {
          id: 'Jimmy',
        },
        {
          id: 'Clove',
        },
        {
          id: 'UI',
        },
      ]);
    });
  });
  it('should return the correct result', () => {
    const transactions: Transaction[] = [
      {
        timestamp: '2020-10-15T17:29:42.941Z',
        fromAddress: 'Jimmy',
        toAddress: 'Nutmeg',
        amount: '11.3',
      },
      {
        timestamp: '2020-10-15T17:29:42.941Z',
        fromAddress: 'Nutmeg',
        toAddress: 'Jimmy',
        amount: '11.3',
      },
      {
        timestamp: '2020-10-15T17:29:42.941Z',
        fromAddress: 'Jimmy',
        toAddress: 'Banana',
        amount: '1',
      },
      {
        timestamp: '2020-10-15T18:17:52.470Z',
        fromAddress: 'Banana',
        toAddress: 'Jimmy',
        amount: '0.1',
      },
    ];
    const nettedTransactions = getSankeyData(transactions, 'Jimmy');

    expect(nettedTransactions?.links).toEqual([
      {
        target: 'Banana',
        source: 'Jimmy',
        value: 0.9,
      },
    ]);

    expect(nettedTransactions?.nodes).toEqual([
      {
        id: 'Jimmy',
      },
      {
        id: 'Banana',
      },
    ]);
  });
});
