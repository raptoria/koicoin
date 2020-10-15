import { Data, SankeyDataLink, SankeyDataNode } from '@nivo/sankey';
import { Transaction } from '../../store/types';

interface AddressNetAmounts {
  [key: string]: number;
}

const nettedTransactions: (
  transactions: Transaction[],
  currentAddress: string | undefined | null
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
        target: key!,
        source: currentAddress!,
        value: nettedValue!,
      });
    } else if (nettedValue < 0) {
      nettedTransactions.push({
        target: currentAddress!,
        source: key!,
        value: nettedValue!,
      });
    }
  }

  for (let [key, value] of Object.entries(toCurrentAddress)) {
    if (!fromCurrentAddress[key]) {
      nettedTransactions.push({
        target: currentAddress!,
        source: key!,
        value: value!,
      });
    }
  }

  return nettedTransactions;
};

export const getSankeyData: (
  t: Transaction[] | null | undefined,
  address: string | null | undefined
) => Data['data'] = (transactions, address) => {
  let uniqueAddresses = new Set();
  let nodes: SankeyDataNode[] = [];
  let links: SankeyDataLink[] = [];

  if (!transactions) {
    return {
      nodes,
      links,
    };
  }

  const nettedData = nettedTransactions(transactions, address);

  for (let t of nettedData) {
    uniqueAddresses.add(t.source);
    uniqueAddresses.add(t.target);
  }

  for (let a of Array.from(uniqueAddresses)) {
    nodes.push({
      id: a as string,
    });
  }
  console.log('nodes are', nodes);
  return {
    nodes,
    links: nettedData,
  };
};
