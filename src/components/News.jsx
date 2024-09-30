import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data, isFetching, error } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  // Debugging the API response to check if data is coming through
  console.log(data);

  if (error) return <p>Error fetching news: {JSON.stringify(error.data) || 'Unknown error'}</p>;
  if (isFetching) return <Loader/>;
  
  // Update with correct field names from the API response
  const newsItems = data?.data || [];

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
          </Select>
        </Col>
      )}
      {newsItems.length > 0 ? (
        newsItems.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news.link} target="_blank" rel="noreferrer">
                <div className="news-content">
                  <Title className="news-title" level={4}>{news.title}</Title>
                  {/* <p>{news.snippet.length > 100 ? `${news.snippet.substring(0, 100)}...` : news.snippet}</p> */}
                  <div className="provider-container">
                    <Text className="provider-name">{news.source_name || 'Unknown Source'}</Text>
                    <Text>{moment(news.published_datetime_utc).fromNow()}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))
      ) : (
        <p>No news available</p>
      )}
    </Row>
  );
};

export default News;
