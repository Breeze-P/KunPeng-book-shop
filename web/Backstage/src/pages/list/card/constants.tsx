import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';
import styles from './style/index.module.less';

const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t['searchTable.columns.id'],
      dataIndex: 'bookid',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['searchTable.columns.name'],
      dataIndex: 'name',
      render: (value) => <Text>{value}</Text>,
    },
    {
      title: t['searchTable.columns.contentType'],
      dataIndex: 'author1',
      render: (value) => (
        <Text>{value}</Text>
      ),
    },
    {
      title: t['searchTable.columns.filterType'],
      dataIndex: 'price',
      render(value) {
        return <Text>{value+'$'}</Text>
      },
    },
    {
      title: t['searchTable.columns.status'],
      dataIndex: 'score',
      render(value) {
        return <Text>{value}</Text>
      },
    },
    {
      title: t['searchTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <div>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}
          >
            {t['searchTable.columns.operations.view']}
          </Button>
        </div>
      ),
    },
  ];
}

export default () => ContentIcon;
