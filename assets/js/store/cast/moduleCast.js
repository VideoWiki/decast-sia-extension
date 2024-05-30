import actions from './moduleCastActions.js';
import mutations from './moduleCastMutations.js';
import getDefaultState from './moduleCastState.js';

export default {
  namespaced: true,
  actions,
  state: getDefaultState(),
  mutations,
};
