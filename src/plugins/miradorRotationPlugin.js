import withTheme from '@material-ui/core/styles/withTheme';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowConfig, getContainerId } from 'mirador/dist/es/src/state/selectors';

import MiradorRotation from './MiradorRotation';
import MiradorRotationMenuItem from './MiradorRotationMenuItem';
import translations from '../translations';

const layersDialogReducer = (state = {}, action) => {
  if (action.type === 'CLOSE_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        open: !action.open,
      },
    };
  }

  if (action.type === 'UPDATE_ROTATION') {
    const afterState = {
      ...state,
      [action.windowId]: {
        ...state[action.windowId],
        rotation: action.rotation,
      },
    };
    return afterState;
  }

  return state;
};

// Map dispatch to props
const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: (open) => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId, open }),
  updateRotation: (rotation) => dispatch({ type: 'UPDATE_ROTATION', windowId, rotation }),
});

const mapStateToProps = (state, { windowId }) => {
  const { windows } = state;
  const canvasId = (windows[windowId] && windows[windowId].canvasId) || null;

  return {
    canvasId,
    containerId: getContainerId(state),
    enabled: getWindowConfig(state, { windowId }).rotationEnabled || false,
    open: state.layersDialog[windowId] && state.layersDialog[windowId].open,
    rotation: state.layersDialog[windowId] && state.layersDialog[windowId].rotation,
  };
};

export default [
  {
    target: 'OpenSeadragonViewer',
    mapDispatchToProps,
    mapStateToProps,
    mode: 'add',
    component: withTheme(MiradorRotation),
    config: {
      translations,
    },
    reducers: {
      layersDialog: layersDialogReducer,
    },
  },
  {
    target: 'WindowTopBarPluginMenu',
    component: MiradorRotationMenuItem,
    mode: 'add',
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).rotationEnabled || false,
    }),
  },
];
