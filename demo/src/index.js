import Mirador from 'mirador/dist/es/src/index';
import { miradorRotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [{
    rotationEnabled: true,
    manifestId: 'https://dl.ndl.go.jp/api/iiif/1286201/manifest.json',
  }],
};

Mirador.viewer(config, [
  ...miradorRotationPlugin,
]);
