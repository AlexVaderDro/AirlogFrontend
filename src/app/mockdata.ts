import {Log} from './models/log';

export const MOCK_SOURCE_LIST: string[] = [
  'Data Receiver 3.5.1',
  'Payment Supporter 1.0.2',
  'Access Defender 4.0'
];

export const MOCK_DATA: Log[] = [
  {source: MOCK_SOURCE_LIST[0], id: 1, dateTime: '1500000000001', message: 'it\'s OK'},
  {source: MOCK_SOURCE_LIST[1], id: 2, dateTime: '1500000000002', message: 'it isn\'t OK'},
  {source: MOCK_SOURCE_LIST[2], id: 3, dateTime: '1500000000003', message: 'it\'s OK'},
  {source: MOCK_SOURCE_LIST[0], id: 4, dateTime: '1500000000004', message: 'it isn\'t OK'},
  {source: MOCK_SOURCE_LIST[1], id: 5, dateTime: '1500000000005', message: 'it\'s OK'},
  {source: MOCK_SOURCE_LIST[2], id: 6, dateTime: '1500000000006', message: 'it isn\'t OK'}
];
