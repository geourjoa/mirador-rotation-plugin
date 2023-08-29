import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/flowRight';
import TuneSharpIcon from '@material-ui/icons/TuneSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import Rotation from './Rotation';
import ImageSlideshow from './ImageSlideshow';

/** Styles for withStyles HOC */
const styles = ({ breakpoints, palette }) => {
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);
  const border = `1px solid ${fade(foregroundColor, 0.2)}`;
  const borderImageRight = 'linear-gradient('
    + 'to bottom, '
    + `${fade(foregroundColor, 0)} 20%, `
    + `${fade(foregroundColor, 0.2)} 20% 80%, `
    + `${fade(foregroundColor, 0)} 80% )`;
  const borderImageBottom = borderImageRight.replace('to bottom', 'to right');
  return {
    root: {
      backgroundColor: fade(backgroundColor, 0.8),
      borderRadius: 25,
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'row',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    borderContainer: {
      border: 0,
      borderRight: border,
      borderImageSlice: 1,
      borderImageSource: borderImageRight,
      display: 'flex',
      flexDirection: 'row',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        borderBottom: border,
        borderRight: 'none',
        borderImageSource: borderImageBottom,
      },
    },
  };
};

class MiradorRotation extends Component {
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const {
      updateViewport, windowId, updateRotation, rotation,
    } = this.props;

    return (value) => {
      updateViewport(windowId, { rotation });
      updateRotation(value);
    };
  }

  init() {
    const { updateViewport, windowId, updateRotation } = this.props;
    return () => {
      updateViewport(windowId, { rotation: 0 });
      updateRotation(0);
    };
  }

  toggleState() {
    const {
      open, closeDialog,
    } = this.props;

    closeDialog(open);
  }

  render() {
    const {
      classes, containerId, enabled, open, viewer, windowId, width,
      theme: { palette },
      t,
      rotation,
    } = this.props;

    if (!viewer || !enabled) return null;

    const backgroundColor = palette.shades.main;
    const foregroundColor = palette.getContrastText(backgroundColor);
    const isSmallDisplay = ['xs', 'sm'].indexOf(width) >= 0;

    /** Button for toggling the menu */
    const toggleButton = (
      <div className={(isSmallDisplay && open) ? classes.borderContainer : ''}>
        <MiradorMenuButton
          aria-expanded={open}
          aria-haspopup
          aria-label={t('collapse', { context: open ? 'open' : 'close' })}
          containerId={containerId}
          onClick={this.toggleState}
        >
          {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
        </MiradorMenuButton>
      </div>
    );
    return (
      <div className={`MuiPaper-elevation4 ${classes.root}`}>
        {isSmallDisplay && toggleButton}
        {open
          && (
            <React.Fragment>
              <div className={classes.borderContainer}>

                <Rotation
                  type="slider"
                  label={t('progress')}
                  min={-180}
                  max={180}
                  windowId={windowId}
                  value={rotation}
                  onChange={this.handleChange('rotation')}
                  foregroundColor={foregroundColor}
                  containerId={containerId}
                >
                  <LinearScaleIcon />
                </Rotation>

                <ImageSlideshow
                  containerId={containerId}
                  label={t('init')}
                  onClick={this.init()}
                />
              </div>
            </React.Fragment>
          )}
        {!isSmallDisplay && toggleButton}
      </div>
    );
  }
}

// onClick={() => this.start()}

MiradorRotation.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  containerId: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // updateViewport: PropTypes.func.isRequired,
  // updateWindow: PropTypes.func.isRequired,
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,

  // state

  rotation: PropTypes.number,

  closeDialog: PropTypes.func,
  updateRotation: PropTypes.func,

  updateViewport: PropTypes.func.isRequired,
};

MiradorRotation.defaultProps = {
  enabled: true,
  open: true,
  viewer: undefined,

  rotation: 0,

  // dispatch

  closeDialog: () => { },
  updateRotation: () => { },

};

// Export without wrapping HOC for testing.
export const TestableRotation = MiradorRotation;

export default compose(withStyles(styles), withWidth())(MiradorRotation);
