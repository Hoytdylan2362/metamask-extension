import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  BackgroundColor,
  BlockSize,
  Display,
  FlexDirection,
  FlexWrap,
  FontWeight,
  JustifyContent,
  TextAlign,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { Box, Text } from '../../component-library';

export const ActivityListItem = ({
  topContent,
  icon,
  title,
  subtitle,
  midContent,
  children,
  rightContent,
  onClick,
  className,
  'data-testid': dataTestId,
}) => {
  const primaryClassName = classnames('activity-list-item', className, {
    'activity-list-item--single-content-row': !(subtitle || children),
  });

  return (
    <Box
      as="button"
      backgroundColor={BackgroundColor.backgroundDefault}
      className={primaryClassName}
      onClick={onClick}
      data-testid={dataTestId}
      tabIndex={0}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
      padding={4}
      display={Display.Flex}
      width={BlockSize.Full}
      flexWrap={FlexWrap.Wrap}
      gap={4}
    >
      {topContent && (
        <Text
          variant={TextVariant.bodyMd}
          color={TextColor.textDefault}
          display={Display.Flex}
          width={BlockSize.Full}
        >
          {topContent}
        </Text>
      )}
      <Box
        display={Display.Flex}
        width={BlockSize.Full}
        flexDirection={FlexDirection.Row}
        gap={4}
      >
        {icon && <Box display={Display.InlineFlex}>{icon}</Box>}
        <Box
          display={Display.InlineFlex}
          width={BlockSize.Full}
          justifyContent={JustifyContent.spaceBetween}
        >
          <Box
            display={Display.InlineFlex}
            width={[BlockSize.OneThird, BlockSize.SevenTwelfths]}
            flexDirection={FlexDirection.Column}
            className="activity-list-item__detail-container"
          >
            <Text
              ellipsis
              textAlign={TextAlign.Left}
              variant={TextVariant.bodyLgMedium}
              fontWeight={FontWeight.Medium}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                ellipsis
                textAlign={TextAlign.Left}
                variant={TextVariant.bodyMd}
                fontWeight={FontWeight.Normal}
              >
                {subtitle}
              </Text>
            )}
            {children && (
              <Box className="activity-list-item__children">{children}</Box>
            )}
          </Box>

          {midContent && (
            <Box
              display={Display.InlineFlex}
              className="activity-list-item__mid-content"
            >
              {midContent}
            </Box>
          )}
          {rightContent && (
            <Box className="activity-list-item__right-content">
              {rightContent}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

ActivityListItem.propTypes = {
  topContent: PropTypes.node,
  icon: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.node,
  midContent: PropTypes.node,
  children: PropTypes.node,
  rightContent: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};
