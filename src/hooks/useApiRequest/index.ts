/* eslint-disable no-unused-vars */
import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { useCallback, useMemo, useReducer } from "react";

// Hook state status enum
export enum APIRequestStatuses {
  idle = "idle",
  resolved = "resolved",
  pending = "pending",
  rejected = "rejected",
}

/**
 * API REQUEST HOOK
 *
 * This custom hook abstracts all information needed to perform api requests.
 * It works closely with the src/api/services and axios
 *
 * ===================================================
 *
 * @param  APIRequestHookProps - The would be initialState
 *
 */

const useApiRequest = (initialState: APIRequestHookProps) => {
  // State variable
  const [state, dispatch] = useReducer(asyncReducer, {
    data: null,
    error: null,
    status: APIRequestStatuses.idle,
    ...initialState,
  });

  /**
   * This run function extracts the returned data from an api request.
   * It takes in a service from the src/services folder.
   * Pass a service into this run function and the request properties
   * will be stored in state.
   *
   * ===================================================
   *
   * @param  AxiosPromise
   *
   */

  const run = useCallback(
    async (promise: AxiosPromise) => {
      dispatch({ type: APIRequestStatuses.pending });
      await promise
        .then((data) => {
          dispatch({
            type: APIRequestStatuses.resolved,
            data: data,
            error: null,
          });
        })
        .catch((error) => {
          dispatch({
            type: APIRequestStatuses.rejected,
            error: error,
            data: null,
          });
        });
    },
    [dispatch]
  );

  const { data, status, error } = state;

  /**
   * This object contains all the possible statuses of an API request
   */

  const requestStatus = useMemo(
    () => ({
      isResolved: status === APIRequestStatuses.resolved,
      isPending: status === APIRequestStatuses.pending,
      isRejected: status === APIRequestStatuses.rejected,
      isIdle: status === APIRequestStatuses.idle,
    }),
    [status]
  );

  return {
    data,
    status,
    error,
    run,
    requestStatus,
  };
};

// Hook Props
interface APIRequestHookProps {
  data?: any;
  error?: any;
  status?: keyof typeof APIRequestStatuses;
}

// Hook Reducer Action
type APIRequestAction =
  | { type: APIRequestStatuses.idle }
  | { type: APIRequestStatuses.pending }
  | { type: APIRequestStatuses.resolved; data: AxiosResponse; error: null }
  | { type: APIRequestStatuses.rejected; data: null; error: AxiosError };

// Hook reducer function
const asyncReducer = (state: APIRequestHookProps, action: APIRequestAction) => {
  switch (action.type) {
    case APIRequestStatuses.pending: {
      return {
        ...state,
        status: APIRequestStatuses.pending,
        data: null,
        error: null,
      };
    }
    case APIRequestStatuses.resolved: {
      return {
        ...state,
        status: APIRequestStatuses.resolved,
        data: action.data,
        error: null,
      };
    }
    case APIRequestStatuses.rejected: {
      return {
        ...state,
        status: APIRequestStatuses.rejected,
        data: null,
        error: action.error,
      };
    }
    case APIRequestStatuses.idle: {
      return {
        ...state,
        status: APIRequestStatuses.idle,
        data: null,
        error: null,
      };
    }
    default:
      return state;
  }
};

export { useApiRequest };
