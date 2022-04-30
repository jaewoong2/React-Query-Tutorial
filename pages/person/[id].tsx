import { IPerson } from '@src/lib/Interfaces/IPerson';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

type PersonProps = {} & NextPage;

const getPersonById = async (
  id: string | string[] | undefined
): Promise<IPerson> => {
  try {
    if (typeof id === 'string') {
      const res = await fetch(`/api/person/${id}`);
      return res.json();
    }
    throw new Error('invalid id');
  } catch (err) {
    throw new Error('Error !');
  }
};

const Person: PersonProps = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, error, isLoading, isError } = useQuery<IPerson, Error, IPerson>(
    ['person', id],
    () => getPersonById(id),
    { enabled: !!id }
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
