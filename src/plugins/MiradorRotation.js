import React, { Component } from 'react';
import compose from 'lodash/flowRight';
import { withSize } from 'react-sizeme';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';

import PropTypes from 'prop-types';

import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { styled, alpha } from '@mui/material/styles';

import ReplayIcon from '@mui/icons-material/Replay';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import Rotation from './Rotation';

const SizeContainer = styled('div')(() => ({
  position: 'static !important',
}));

const ToggleContainer = styled('div')(() => ({
  border: 0,
  borderImageSlice: 1,
}));

const ToolContainer = styled('div')(() => ({
  display: 'flex',
  border: 0,
  borderImageSlice: 1,
}));

/** Styles for withStyles HOC */
const Root = styled('div')(({ small, theme: { palette } }) => {
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);
  const border = `1px solid ${alpha(foregroundColor, 0.2)}`;
  const borderImageRight = 'linear-gradient('
    + 'to bottom, '
    + `${alpha(foregroundColor, 0)} 20%, `
    + `${alpha(foregroundColor, 0.2)} 20% 80%, `
    + `${alpha(foregroundColor, 0)} 80% )`;
  const borderImageBottom = borderImageRight.replace('to bottom', 'to right');
  return {
    backgroundColor: alpha(backgroundColor, 0.8),
    borderRadius: 25,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    ...(small && { flexDirection: 'column' }),
    [ToggleContainer]: {
      ...(small && {
        borderBottom: border,
        borderImageSource: borderImageBottom,
        display: 'flex',
      }),
    },
    [ToolContainer]: {
      ...(!small && {
        borderRight: border,
        borderImageSource: borderImageRight,
        flexDirection: 'row',
      }),
      ...(small && {
        flexDirection: 'column',
        borderBottom: border,
        borderImageSource: borderImageBottom,
      }),
    },
  };
});

class MiradorRotation extends Component {
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      rotation: 0,
    };
  }

  handleChange() {
    const { windowId, updateViewport } = this.props;

    return (value) => {
      this.setState({ rotation: value });

      updateViewport(windowId, { rotation: value });
    };
  }

  handleReset() {
    const {
      updateViewport, windowId,
    } = this.props;

    this.setState({ rotation: 0 });

    updateViewport(windowId, { rotation: 0 });
  }

  toggleState() {
    const { open, updateWindow, windowId } = this.props;

    updateWindow(windowId, { rotationOpen: !open });
  }

  render() {
    const {
      size: { width }, t, enabled, open, viewer, containerId,
    } = this.props;

    const { rotation } = this.state;

    if (!viewer || !enabled) return null;

    const isSmallDisplay = width && (width < 480);

    /** Button for toggling the menu */
    const toggleButton = (
      <ToggleContainer>
        <MiradorMenuButton
          aria-expanded={open}
          aria-haspopup
          aria-label={t('collapse', { context: open ? 'open' : 'close' })}
          onClick={this.toggleState}
        >
          {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
        </MiradorMenuButton>
      </ToggleContainer>
    );

    return (
      <SizeContainer>
        <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
          {isSmallDisplay && toggleButton}
          {open && (
            <ToolContainer>
              <Rotation
                type="slider"
                label={t('progress')}
                min={-180}
                max={180}
                value={rotation}
                containerId={containerId}
                onChange={this.handleChange('rotation')}
                small={isSmallDisplay}
              >
                <LinearScaleIcon />
              </Rotation>

              <MiradorMenuButton
                aria-label={t('init')}
                onClick={this.handleReset}
              >
                <ReplayIcon />
              </MiradorMenuButton>
            </ToolContainer>
          )}
          {!isSmallDisplay && toggleButton}
        </Root>
      </SizeContainer>
    );
  }
}

MiradorRotation.propTypes = {
  containerId: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  t: PropTypes.func,
  updateViewport: PropTypes.func,
  updateWindow: PropTypes.func,
  viewConfig: PropTypes.shape({
    rotation: PropTypes.number,
  }),
  viewer: PropTypes.shape({
    rotation: PropTypes.number,
  }),
  windowId: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
  }),
};

MiradorRotation.defaultProps = {
  enabled: true,
  open: false,
  t: () => { },
  updateViewport: () => { },
  updateWindow: () => { },
  viewConfig: {},
  viewer: {},
  size: {},
};

// Export without wrapping HOC for testing.
export const TestableMiradorRotation = MiradorRotation;

export default compose(withSize())(MiradorRotation);
