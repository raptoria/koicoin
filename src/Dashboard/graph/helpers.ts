import { Data, SankeyDataLink, SankeyDataNode } from '@nivo/sankey';
import { Transaction } from '../../store/types';

interface AddressNetAmounts {
  [key: string]: number;
}

/**
 * Uses the transaction and current address to compute net
 * transactions, so no circular references will ever be sent to Sankey graph
 * @param transactions
 * @param currentAddress
 */
const nettedTransactions: (
  transactions: Transaction[],
  currentAddress: string
) => SankeyDataLink[] = (transactions, currentAddress) => {
  let fromCurrentAddress: AddressNetAmounts = {};
  let toCurrentAddress: AddressNetAmounts = {};
  let nettedTransactions = [];

  for (let t of transactions) {
    if (!t.hasOwnProperty('fromAddress')) {
      t.fromAddress = 'UI';
    }
    if (t.fromAddress === currentAddress) {
      const currentTotal: number = fromCurrentAddress[t.toAddress] || 0;
      fromCurrentAddress[t.toAddress] = currentTotal + parseInt(t.amount);
    }
    if (t.toAddress === currentAddress) {
      const currentTotal: number = toCurrentAddress[t.fromAddress] || 0;
      toCurrentAddress[t.fromAddress] = currentTotal + parseInt(t.amount);
    }
  }

  for (let [key, value] of Object.entries(fromCurrentAddress)) {
    const toAddressValue = toCurrentAddress[key];
    let nettedValue = value;

    if (toAddressValue) {
      nettedValue = value - toAddressValue;
    }
    if (nettedValue > 0) {
      nettedTransactions.push({
        target: key,
        source: currentAddress,
        value: nettedValue,
      });
    } else if (nettedValue < 0) {
      nettedTransactions.push({
        target: currentAddress,
        source: key,
        value: Math.abs(nettedValue),
      });
    }
  }

  for (let [key, value] of Object.entries(toCurrentAddress)) {
    if (!fromCurrentAddress[key] && value !== 0) {
      nettedTransactions.push({
        target: currentAddress!,
        source: key!,
        value: value!,
      });
    }
  }
  console.log('netted transactions', nettedTransactions);
  return nettedTransactions;
};

/**
 * transforms transactions into a data object the SankeyGraph understands
 * @param transactions
 * @param address
 */
export const getSankeyData: (
  t: Transaction[] | null | undefined,
  address: string | null | undefined
) => Data['data'] | null = (transactions, address) => {
  let uniqueAddresses = new Set();
  let nodes: SankeyDataNode[] = [];

  const nettedData = nettedTransactions(transactions!, address!);

  if (nettedData.length === 0) {
    return null;
  }

  for (let t of nettedData) {
    uniqueAddresses.add(t.source);
    uniqueAddresses.add(t.target);
  }

  for (let a of Array.from(uniqueAddresses)) {
    nodes.push({
      id: a as string,
    });
  }

  return {
    nodes,
    links: nettedData,
  };
};
