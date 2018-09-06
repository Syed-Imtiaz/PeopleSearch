const searchPeopleType = 'GET_PEOPLE';
const receivePeopleType = 'RECEIVE_PEOPLE';
const addPeopleType = 'ADD_PEOPLE';
const editPeopleType = 'EDIT_PEOPLE';
const initialState = { people: [], isLoading: false };

export const actionCreators = {
    searchPeople: personName => async (dispatch, getState) => {
      if (getState().people !== undefined && personName === getState().people.personName) {
        // Don't issue a duplicate request (we already have or are loading the requested data)
        return;
      }

      dispatch({ type: searchPeopleType, personName });

      const url = `api/Person/SearchPeople?personName=${personName}`;
      const response = await fetch(url);
      const people = await response.json();

      dispatch({ type: receivePeopleType, personName, people });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === searchPeopleType) {
    return {
      ...state,
      personName: action.personName,
      isLoading: true
    };
  }

  if (action.type === receivePeopleType) {
    return {
      ...state,
      personName: action.personName,
      people: action.people,
      isLoading: false
    };
  }

  return state;
};
