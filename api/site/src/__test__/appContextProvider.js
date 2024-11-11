import React from 'react';
import { render, act } from '@testing-library/react';
import { appContext, useAppContext } from '../components/shared/appContext';

describe('AppContextProvider', () => {
  test('getAggregateByStatus returns count for matching status', () => {
    const status = 'completed';
    const aggregateResults = [
      { status: 'pending', count: 2 },
      { status: 'completed', count: 7 },
      { status: 'cancelled', count: 1 },
    ];
    const state = { aggregateResults };
    const setState = jest.fn();
    const useContextMock = jest.spyOn(React, 'useContext');
    useContextMock.mockReturnValue({ state, setState });

    let getAggregateByStatusResult;

    function TestComponent() {
      const { getAggregateByStatus } = useAppContext();
      getAggregateByStatusResult = getAggregateByStatus(status);
      return null;
    }

    act(() => {
      render(
        <appContext.Provider value={{ state, setState }}>
          <TestComponent />
        </appContext.Provider>
      );
    });

    expect(getAggregateByStatusResult).toBe(10);
    expect(setState).not.toHaveBeenCalled();
  });

  test('getAggregateByStatus returns empty string for non-matching status', () => {
    const status = 'rejected';
    const aggregateResults = [
      { status: 'pending', count: 5 },
      { status: 'completed', count: 10 },
      { status: 'cancelled', count: 2 },
    ];
    const state = { aggregateResults };
    const setState = jest.fn();
    const useContextMock = jest.spyOn(React, 'useContext');
    useContextMock.mockReturnValue({ state, setState });

    let getAggregateByStatusResult;

    function TestComponent() {
      const { getAggregateByStatus } = useAppContext();
      getAggregateByStatusResult = getAggregateByStatus(status);
      return null;
    }

    act(() => {
      render(
        <appContext.Provider value={{ state, setState }}>
          <TestComponent />
        </appContext.Provider>
      );
    });

    expect(getAggregateByStatusResult).toBe('');
    expect(setState).not.toHaveBeenCalled();
  });
});
