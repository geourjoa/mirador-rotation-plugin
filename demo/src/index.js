// import Mirador from '@nakamura196/mirador';
import Mirador from '@nakamura196/mirador';
import { miradorRotationPlugin } from '../../src';

const xywh = '9554.0,8213.0,1000,1000';

const spl = xywh.split(',');

// Box to zoom to
const boxToZoom = {
  height: Number(spl[3]),
  width: Number(spl[2]),
  x: Number(spl[0]),
  y: Number(spl[1])
};

const zoomCenter = {
  x: boxToZoom.x + boxToZoom.width / 2,
  y: boxToZoom.y + boxToZoom.height / 2
};

const config = {
  id: 'demo',
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
  windows: [{
    canvasId: "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/187cc82d-11e6-9912-9dd4-b4cca9b10970/canvas/p2",
    rotationEnabled: true,
    rotationOpen: true,
    initialViewerConfig: {
      rotation: 180,
      x: zoomCenter.x,
      y: zoomCenter.y,
      zoom: 1 / Math.max(boxToZoom.width, boxToZoom.height) 
    },
    // manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
    manifestId: "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/187cc82d-11e6-9912-9dd4-b4cca9b10970/manifest",
  }],
};

Mirador.viewer(config, [
  ...miradorRotationPlugin,
]);
