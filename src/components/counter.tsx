import { useEffect, useReducer, useState } from 'react';

// normally all of this outside the component would be in a different file(s)
type InitialState = {
  count: number;
  draftCount: string | number;
};

const initialState: InitialState = {
  count: 0,
  draftCount: 0,
};

type Action = {
  type: 'increment' | 'decrement' | 'reset' | 'updateCountFromDraft';
};

type ActionWithPayload = {
  type: 'updateDraftCount';
  payload: number | string;
};

const reducer = (state = initialState, action: Action | ActionWithPayload) => {
  const { count, draftCount } = state;

  if (action.type === 'increment') {
    // with action types now, there is autocomplete for these statements
    const newCount = count + 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === 'decrement') {
    // with action types, autocomplete will not show 'increment', because it knows it's already been used
    const newCount = count - 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === 'reset') {
    return { count: 0, draftCount: 0 };
  }

  if (action.type === 'updateDraftCount') {
    console.log('updateDraftCount');

    return { count, draftCount: action.payload };
  }

  if (action.type === 'updateCountFromDraft') {
    return { count: Number(draftCount), draftCount };
  }

  return state;
};

const Counter = () => {
  // const [count, setCount] = useState(0);
  // setCount won't let it be set to a non-number, like a string, which can be useful when handling form values

  // Updating to test useReducer
  // reducer takes in current value and a new value and returns the new value
  // reducer is just a js function, it can be outside component, different file, etc.
  // const reducer = (count: number, newValue: number): number => {
  //   // can do other stuff here
  //   return newValue;
  // };

  const [{ count, draftCount }, dispatch] = useReducer(reducer, initialState);

  // const [draftCount, setDraftCount] = useState(0);

  // useEffect expects a deconstructed function or undefined
  // useEffect(() => {
  //   setDraftCount(count);
  // }, [count]);

  return (
    <section className="flex w-2/3 flex-col items-center gap-8 border-4 border-primary-500 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          ➖ Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          ➕ Increment
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'updateCountFromDraft' });
          }}
        >
          <input
            type="number"
            value={draftCount}
            onChange={(e) =>
              dispatch({ type: 'updateDraftCount', payload: e.target.value })
            }
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
