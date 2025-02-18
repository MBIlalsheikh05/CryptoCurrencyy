import React, { useState,useEffect } from 'react'
import millify from 'millify'
import { Row,Col,Card,Input } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../Services/cryptoApi'
import Loader from './Loader'
const Cryptocurrencies = ({simplified}) => {
  const count=simplified?10:100;
  const {data:cryptosList,isFetching}=useGetCryptosQuery(count);
  const [cryptos,setCryptos]=useState([]);
  const[Searchterm,setSearchterm]=useState('');
  useEffect(()=>{
    setCryptos(cryptosList?.data?.coins);
    const filtereddata=cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(Searchterm.toLowerCase()));
    setCryptos(filtereddata);
  }, [cryptosList,Searchterm]);
  if (isFetching) return <Loader/>;
  return(
    <>
    {!simplified &&(
    <div className='search-crypto'>
    <Input placeholder='Search Cryptocurrency' onChange={(e)=>setSearchterm(e.target.value)}/>
  </div>
   ) }
    <Row gutter={[32,32]} className='crypto-card-container'>
     {cryptos?.map((currency)=>(
      <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
        <Link to={`/crypto/${currency.id}`}></Link>
        <Card 
        title={`${currency.rank}.${currency.name}`}
        extra={<img className='crypto-image' src={currency.iconUrl}></img>}
        hoverable
        >
          <p>Price: {millify(currency.price)}</p>
          <p>Market Cap: {millify(currency.marketCap)}</p>
          <p>Daily Change: {millify(currency.change)}</p>
        </Card>
      </Col>
     ))}

    </Row>
    </>
  )
}

export default Cryptocurrencies
