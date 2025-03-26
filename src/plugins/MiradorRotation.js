import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { styled, alpha } from '@mui/material/styles';
import { useElementSize } from '@custom-react-hooks/use-element-size';
import mergeRefs from 'merge-refs';
import { MiradorMenuButton, useTranslation } from '@nakamura196/mirador';
import Rotation from './Rotation';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
const SizeContainer = styled('div')(() => ({
  position: 'static !important',
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
    borderBottom: small ? border : 'none',
    borderImageSource: small ? borderImageBottom : borderImageRight,
    borderRadius: 25,
    display: 'flex',
    flexDirection: small ? 'column' : 'row',
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 999,
  };
});

const ControlContainer = styled('div')(({ small }) => ({
  border: 0,
  borderImageSlice: 1,
  display: 'flex',
  flexDirection: small ? 'column' : 'row',
}));

const MiradorRotation = ({
  enabled = true,
  open = true,
  innerRef = null,
  updateViewport,
  updateWindow,
  viewer = {},
  viewConfig = {},
  windowId,
}) => {
  const [isSmallDisplay, setIsSmallDisplay] = useState(false);
  const { t } = useTranslation();

  const {
    rotation = 0,
  } = viewConfig;

  const toggleState = () => {
    updateWindow(windowId, { rotationOpen: !open });
  };

  const handleChange = (param) => (value) => {
    updateViewport(windowId, { [param]: value });
  };

  const handleReset = () => {
    const viewConfigReset = {
      rotation: 0,
    };
    updateViewport(windowId, viewConfigReset);
  };


  const [sizeRef, size] = useElementSize();

  useEffect(() => {
    setIsSmallDisplay(size.width && size.width < 480);
  }, [size.width]);

  if (!viewer || !enabled) return <SizeContainer ref={mergeRefs(innerRef, sizeRef)} />;

  const toggleButton = (
    <div style={{ border: 0, borderImageSlice: 1 }}>
      <MiradorMenuButton
        aria-expanded={open}
        aria-haspopup
        aria-label={t('collapse', { context: open ? 'open' : 'close' })}
        onClick={toggleState}
      >
        {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
      </MiradorMenuButton>
    </div>
  );

  return (
    <SizeContainer ref={mergeRefs(innerRef, sizeRef)}>
      <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
        {isSmallDisplay && toggleButton}
        {open && (
          <>
            <ControlContainer small={isSmallDisplay}>
              <Rotation
                label={t('progress')}
                value={rotation}
                windowId={windowId}
                onChange={handleChange('rotation')}
                small={isSmallDisplay}
              />
              <MiradorMenuButton
                aria-label={t('revert')}
                onClick={handleReset}
              >
                <ReplaySharpIcon />
              </MiradorMenuButton>
            </ControlContainer>
            
          </>
        )}
        {!isSmallDisplay && toggleButton}
      </Root>
    </SizeContainer>
  );
};

MiradorRotation.propTypes = {
  enabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
  open: PropTypes.bool,
  updateViewport: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  viewConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

export const TestableRotation = MiradorRotation;

export default MiradorRotation;
