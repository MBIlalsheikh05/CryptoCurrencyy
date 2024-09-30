import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders={
    'x-rapidapi-key': 'f78d5cc1c3msh27679750f30f821p179a65jsn792e0aaa00ed',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}
const baseUrl='https://coinranking1.p.rapidapi.com';
const createRequest=(url)=>({url,headers:cryptoApiHeaders})
export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({ 
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`),
        }),
        getExchanges:builder.query({
            query:()=>createRequest(`/exchanges`),
        }),
        getCryptoDetails:builder.query({
            query:(coinID)=>createRequest(`/coin/${coinID}`),
        }),
        getCryptoHistory:builder.query({
            query:({coinID,timePeriod})=>createRequest(`/coin/${coinID}/hitory/${timePeriod}`),
        })
    })
});
export const{
    useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery
}=cryptoApi;