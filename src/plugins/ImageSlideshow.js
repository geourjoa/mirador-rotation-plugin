import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import StopIcon from '@material-ui/icons/Replay';

export default class ImageSlideshow extends Component {
  render() {
    const { label, variant, ...otherProps } = this.props;
    return (
      <MiradorMenuButton
        aria-label={label}
        {...otherProps}
      >
        <StopIcon />
      </MiradorMenuButton>
    );
  }
}

ImageSlideshow.propTypes = {
  containerId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
