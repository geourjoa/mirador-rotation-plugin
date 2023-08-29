import Mirador from 'mirador/dist/es/src/index';
import { miradorRotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [{
    rotationEnabled: true,
    manifestId: 'https://nakamura196.github.io/mirador2/data/examples/hi.json',
  }],
};

Mirador.viewer(config, [
  ...miradorRotationPlugin,
]);
