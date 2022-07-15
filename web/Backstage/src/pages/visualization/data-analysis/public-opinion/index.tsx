import React, { useState, useEffect, useMemo } from 'react';
import PublicOpinionCard, { PublicOpinionCardProps } from './card';
import axios from 'axios';
import { Grid } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '../locale';

const { Row, Col } = Grid;

const cardInfo = [
  {
    key: 'visitor',
    type: 'line',
  },
  {
    key: 'content',
    type: 'interval',
  },
  {
    key: 'comment',
    type: 'line',
  },
  {
    key: 'share',
    type: 'interval',
  },
];

function PublicOpinion() {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicOpinionCardProps[]>(
    cardInfo.map((item) => ({
      ...item,
      chartType: item.type as 'line' | 'pie' | 'interval',
      title: t[`dataAnalysis.publicOpinion.${item.key}`],
    }))
  );

  const getData = async () => {
    const requestList = cardInfo.map(async (info) => {
      const { data } = await axios
        .get(`/api/data-analysis/overview?type=${info.type}`)
        .catch(() => ({ data: {} }));
      return {
        ...data,
        key: info.key,
        chartType: info.type,
      };
    });
    const result = await Promise.all(requestList).finally(() =>
      setLoading(false)
    );
    // setData(result);
    setData([
      {
        ...result[0],
        count: 995,
        title: '今日访问人数'
      },
      {
        ...result[1],
        count: 13744,
        title: '藏书总数'
      },
      {
        ...result[2],
        count: 277358,
        title: '用户总数'
      },
      {
        ...result[3],
        count: 67441,
        title: '评论总数'
      }
    ])
  };

  useEffect(() => {
    getData();
  }, []);

  const formatData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      title: t[`dataAnalysis.publicOpinion.${item.key}`],
    }));
  }, [t, data]);
  console.log(formatData)

  return (
    <div>
      <Row gutter={20}>
        {formatData.map((item, index) => (
          <Col span={6} key={index}>
            <PublicOpinionCard
              {...item}
              compareTime={t['dataAnalysis.yesterday']}
              loading={loading}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PublicOpinion;
