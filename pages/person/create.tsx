import { IPerson } from '@src/lib/Interfaces/IPerson';
import { NextPage } from 'next';
import React, { useState } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import { fetchPerson } from './index';

type CreatePersonProps = {} & NextPage<IPerson>;

interface IContext {
  id: string;
}

const createPerson = async ({ id, name, age }: IPerson): Promise<IPerson> => {
  try {
    const res: Response = await fetch('/api/person/create', {
      method: 'POST',
      body: JSON.stringify({ id, name, age }),
    });

    if (res.ok) {
      return res.json();
    }
    throw new Error('Error Create Person Page');
  } catch (err) {
    throw new Error('Error Create Person Err');
  }
};

const CreatePersonPage: CreatePersonProps = ({}) => {
  const [enabled, setEnabled] = useState(true);
  const { data: queryData } = useQuery<IPerson, Error>('person', fetchPerson, {
    enabled,
  });

  const queryClient = useQueryClient();

  // useMutation(key, queryfetchFunction, context(== lifecycle) )
  // mutation 은 uniqueKey를 따로 설정 하지 않아도 ㄱㅊ
  const mutation: UseMutationResult<IPerson, Error, IPerson> = useMutation<
    IPerson,
    Error,
    IPerson,
    IContext | undefined
  >(
    'createPerson',
    async ({ id, name, age }) => createPerson({ id, name, age }),
    {
      // before mutation
      onMutate: (variables: IPerson) => {
        console.log('mutation variables', variables);
        return { id: '7' };
      },
      // on success of mutation
      onSuccess: (
        data: IPerson,
        _variables: IPerson,
        _context: IContext | undefined
      ) => {
        // queryClient.invalidateQueries('person');
        // queryClient 를 통해서 'person' key를 갖고 있는 query에 data를 주입
        // useQuery('person') 에서 return 하는 data의 값이 setQueryData('person', data) 으로 설정한 data와 같다.
        queryClient.setQueryData('person', data);
        return console.log('mutation data', data);
      },
      // if mutation errors
      onError: (
        error: Error,
        _variables: IPerson,
        context: IContext | undefined
      ) => {
        console.log('error: ', error.message);
        return console.log(
          `rolling back optimistic update with id: ${context?.id}`
        );
      },
      // no matter if error or success run me
      onSettled: (
        _data: IPerson | undefined,
        _error: Error | null,
        _variables: IPerson | undefined,
        _context: IContext | undefined
      ) => {
        return console.log('complete mutation!');
      },
    }
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      age: { value: number };
    };
    const id = '1';
    const name = target.name.value;
    const age = target.age.value;
    mutation.mutate({ id, name, age });
  };

  return (
    <>
      {mutation.isLoading ? (
        <p>Adding todo</p>
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation?.error?.message}</div>
          ) : null}

          {mutation.isSuccess ? (
            <div>
              Todo added! Person name is {mutation?.data?.name} and he is{' '}
              {mutation?.data?.age}
            </div>
          ) : null}
        </>
      )}

      <button
        type="button"
        onClick={() => {
          setEnabled(false);
          // query키를 날려버리는 Method
          queryClient.invalidateQueries('person');
        }}
      >
        Invalidate Cache
      </button>

      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="age">Age:</label>
        <br />
        <input type="number" id="age" name="age" />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>

      {queryData && (
        <>
          <h1>Person is</h1>
          <p>Name: {queryData?.name}</p>
          <p>Age: {queryData?.age}</p>
        </>
      )}
    </>
  );
};

export default CreatePersonPage;
