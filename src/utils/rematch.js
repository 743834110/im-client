import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import createLoadingPlugin from '@rematch/loading'
import { fromJS } from 'immutable';
import models from '../store'


// Immutably returns the new state
const immutableLoadingActionCreator = (state, name, action, converter, cntState) => (
  state.asImmutabletations( map => map.set('global', converter(cntState.global))
    .setIn(['models', name], converter(cntState.models[name]))
    .setIn(['effects',name, action], converter(cntState.effects[name][action]))
  )
);

// Mutates the current state with a deep merge
const immutableMergeInitialState = (state, newObj) => (
  state.asMutable().mergeDeep(fromJS(newObj))

);

const options = {
  loadingActionCreator: immutableLoadingActionCreator,
  mergeInitialState: immutableMergeInitialState,
  model: {
    state: fromJS({}),
  }
};

export default init({
  models: models,
  plugins: [immerPlugin(), createLoadingPlugin(options)]
})
