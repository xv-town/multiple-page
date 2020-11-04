export const remove = (payload) => {
  return dispatch => {
    dispatch('tab.remove', payload);
  }
};
