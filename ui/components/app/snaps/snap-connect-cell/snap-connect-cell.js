import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  IconColor,
  AlignItems,
  Display,
  FontWeight,
} from '../../../../helpers/constants/design-system';
import {
  Box,
  Icon,
  IconName,
  IconSize,
  Text,
} from '../../../component-library';
import Tooltip from '../../../ui/tooltip/tooltip';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import SnapAvatar from '../snap-avatar/snap-avatar';
import { getSnapMetadata } from '../../../../selectors';

export default function SnapConnectCell({ origin, snapId }) {
  const t = useI18nContext();
  const { name: snapName } = useSelector((state) =>
    getSnapMetadata(state, snapId),
  );

  return (
    <Box
      display={Display.Flex}
      alignItems={AlignItems.center}
      paddingTop={2}
      paddingBottom={2}
    >
      <SnapAvatar snapId={snapId} />
      <Box width="full" paddingLeft={4} paddingRight={4}>
        <Text>
          {t('connectSnap', [
            <Text as="span" key="1" fontWeight={FontWeight.Bold}>
              {snapName}
            </Text>,
          ])}
        </Text>
      </Box>
      <Box>
        <Tooltip
          html={
            <div>
              {t('snapConnectionWarning', [
                <b key="0">{origin}</b>,
                <b key="1">{snapName}</b>,
              ])}
            </div>
          }
          position="bottom"
        >
          <Icon
            color={IconColor.iconMuted}
            name={IconName.Info}
            size={IconSize.Sm}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}

SnapConnectCell.propTypes = {
  origin: PropTypes.string.isRequired,
  snapId: PropTypes.string.isRequired,
};
