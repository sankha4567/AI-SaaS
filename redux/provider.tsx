"use client";
import React, { useRef } from 'react'
import { makeStore, store } from './store'
import { RootState } from './store';
import { Provider} from 'react-redux';

const ReduxProvider = ({
  children,
  preloadedState
}:{children:React.ReactNode;preloadedState?:Partial<RootState>;}) => {
  const storeRef = useRef<any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}

export default ReduxProvider;
