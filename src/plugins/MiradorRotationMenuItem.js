import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';

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
        {enabled ? t('hide') : t('show')}
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
