/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CdsAction } from '@cds/core/actions';
import { property, assignSlotNames } from '@cds/core/internal';

/**
 * Control Action Button
 *
 * ```typescript
 * import '@cds/core/button/register.js';
 * ```
 *
 * ```html
 * <cds-control-action>
 *
 * </cds-control-action>
 * ```
 * @internal
 * @element cds-control-action
 * @slot - For projecting text content or cds-icon
 */
export class CdsControlAction extends CdsAction {
  /** Set the action type placement within the supporting input control */
  @property({ type: String, reflect: true }) action: 'label' | 'prefix' | 'suffix' | string;

  updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('action')) {
      assignSlotNames([this, this.action ?? false]);
    }
  }
}
