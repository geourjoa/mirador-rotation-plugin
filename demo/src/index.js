import Mirador from '@nakamura196/mirador/dist/es/src/index';
import { miradorRotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      rotationEnabled: true,
      manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
      rotation: -90,
    }, {
      rotationEnabled: false,
      manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
      rotation: 90,
    },
  ],
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
};

Mirador.viewer(config, [
  ...miradorRotationPlugin,
]);
