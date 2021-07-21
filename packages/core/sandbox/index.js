import '@cds/core/button/register.js';
import '@cds/core/radio/register.js';
import '@cds/core/input/register.js';
import '@cds/core/icon/register.js';
import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import { barsIcon } from '@cds/core/icon/shapes/bars.js';
import { filterGridIcon } from '@cds/core/icon/shapes/filter-grid.js';
import { ellipsisVerticalIcon } from '@cds/core/icon/shapes/ellipsis-vertical.js';
import { infoStandardIcon } from '@cds/core/icon/shapes/info-standard.js';
import { bellIcon } from '@cds/core/icon/shapes/bell.js';

ClarityIcons.addIcons(barsIcon, filterGridIcon, ellipsisVerticalIcon, infoStandardIcon, bellIcon);
