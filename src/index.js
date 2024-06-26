import * as actions from '@nakamura196/mirador/dist/es/src/state/actions';
import { getWindowConfig, getViewer, getContainerId } from '@nakamura196/mirador/dist/es/src/state/selectors';
import MiradorRotation from './plugins/MiradorRotation';
import MiradorRotationMenuItem from './plugins/MiradorRotationMenuItem';
import translations from './translations';

const mapStateToProps = (state, { windowId }) => {
  const { windows } = state;

  const canvasId = (windows[windowId] && windows[windowId].canvasId) || null;

  return {
    canvasId,
    containerId: getContainerId(state),
    enabled: getWindowConfig(state, { windowId }).rotationEnabled || false,
    open: getWindowConfig(state, { windowId }).rotationOpen || false,
    viewConfig: getViewer(state, { windowId }) || {},
  };
};

export const miradorRotationPlugin = [
  {
    target: 'OpenSeadragonViewer',
    mode: 'add',
    component: MiradorRotation,
    mapStateToProps,
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
      updateViewport: actions.updateViewport,
    },
    config: {
      translations,
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
