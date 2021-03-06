import streams from '../api/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = userId => { 
  return { 
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => { 
  return {
    type: SIGN_OUT
  };
};

//Second parameter of redux thunk is getState (state) of redux store
export const createStream = formValues => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});

    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
  } catch(err) { 
    throw err;
  };
};


export const fetchStreams = formValues => async dispatch => { 
  try {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  } catch(err) { 
    throw err;
  };
};

export const fetchStream = id => async dispatch => { 
  try {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
  } catch(err) { 
    throw err;
  };
};

export const editStream = (id,formValues) => async dispatch => { 
  try {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
  } catch(err) { 
    throw err;
  }
}

export const deleteStream = id => async dispatch => { 
  try {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
  } catch(err) { 
    throw err;
  };
};

