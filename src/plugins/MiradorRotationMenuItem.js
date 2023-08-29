import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LayersIcon from '@material-ui/icons/Layers';

const MiradorRotationMenuItem = ({
  enabled, handleClose, t, updateWindow, windowId,
}) => {
  const handleClickOpen = () => {
    handleClose();
    updateWindow(windowId, { rotationEnabled: !enabled });
  };

  return (
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
        { enabled ? t('hide') : t('show') }
      </ListItemText>
    </MenuItem>
  );
};

MiradorRotationMenuItem.propTypes = {
  enabled: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

MiradorRotationMenuItem.defaultProps = {
  enabled: true,
};

export default MiradorRotationMenuItem;
