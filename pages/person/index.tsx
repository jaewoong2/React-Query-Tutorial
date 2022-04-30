import { IPerson } from '@src/lib/Interfaces/IPerson';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

type PersonProps = {} & NextPage;

const fetchPerson = async (): Promise<IPerson> => {
  try {
    const res = await fetch('/api/person');
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response not ok!');
  } catch (err) {
    throw new Error('Error !');
  }
};

const Person: PersonProps = () => {
  // react-query cahce 관련 링크 https://velog.io/@yrnana/React-Query에서-staleTime과-cacheTime의-차이
  // useQuery<dataType, ErrorType, queryFuntionType (not declare => same dataType), QueryKeyType (not delcare => QueryKeyType)>

  // default stale time 5s => 5초마다 re-fetch
  const { data, error, status, isLoading, isError } = useQuery<IPerson, Error>(
    'person',
    fetchPerson
  );

  if (isLoading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  if (isError) {
    return <p>Boom! boy: Error is -- {error?.message}</p>;
  }

  return (
    <>
      <div>{data?.id}</div>
      <div>{data?.name}</div>
      <div>{data?.age}</div>
    </>
  );
};

export default Person;
