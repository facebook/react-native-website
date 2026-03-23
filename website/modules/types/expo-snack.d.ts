/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Window {
  ExpoSnack?: {
    /**
     * Initialize all snack players on the page
     */
    initialize(): void;
    /**
     * Remove a snack player container
     */
    remove(container: Element): void;
    /**
     * Append/add a snack player container
     */
    append(container: Element): void;
  };
}
