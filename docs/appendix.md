# Appendix

## I. Terminology

- **Spec** - TypeScript or Flow code that describes the API for a Turbo Native Module or Fabric Native component. Used by **Codegen** to generate boilerplate code.

- **Turbo Native Modules** - Native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events. These are accessible to your JavaScript application code as functions and objects.
- **Fabric Native Component** - Native platform views that are available to your application JavaScript code through React Components.

- **Legacy Native Components** - Components which are running on the old React Native architecture.
- **Legacy Native Modules** - Modules which are running on the old React Native architecture.

## II. Codegen Typings

<!-- These should all be squashed into a single table -->

### Flow

You may use the following table as a reference for which types are supported and what they map to in each platform:

#### `string`

|                   |            |
| ----------------- | ---------- |
| Nullable Support? | `?string`  |
| Android (Java)    | `string`   |
| iOS               | `NSString` |

#### `boolean`

|                   |            |
| ----------------- | ---------- |
| Nullable Support? | `?boolean` |
| Android (Java)    | `Boolean`  |
| iOS               | `NSNumber` |

#### Object literal

This is recommended over using plain `Object`, for type safety.

**Example:** `{| foo: string, ... |}`

|                   |                                                         |
| ----------------- | ------------------------------------------------------- |
| Nullable Support? | <code>?&#123;&#124; foo: string, ...&#124;&#125;</code> |
| Android (Java)    | -                                                       |
| iOS               | -                                                       |

#### `Object`

:::info
Recommended to use [Object literal](#object-literal) instead.
:::

|                   |                          |
| ----------------- | ------------------------ |
| Nullable Support? | `?Object`                |
| Android (Java)    | `ReadableMap`            |
| iOS               | `@` (untyped dictionary) |

#### `Array<*>`

|                   |                                                                |
| ----------------- | -------------------------------------------------------------- |
| Nullable Support? | `?Array<*>`                                                    |
| Android (Java)    | `ReadableArray`                                                |
| iOS               | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |

#### `Function`

|                   |             |
| ----------------- | ----------- |
| Nullable Support? | `?Function` |
| Android (Java)    | -           |
| iOS               | -           |

#### `Promise<*>`

|                   |                                                 |
| ----------------- | ----------------------------------------------- |
| Nullable Support? | `?Promise<*>`                                   |
| Android (Java)    | `com.facebook.react.bridge.Promise`             |
| iOS               | `RCTPromiseResolve` and `RCTPromiseRejectBlock` |

#### Type Unions

Type unions are only supported as callbacks.

**Example:** `'SUCCESS' | 'FAIL'`
| | |
|---|---|
| Nullable Support? | Only as callbacks |
| Android (Java) | - |
| iOS | - |

#### Callbacks

Callback functions are not type checked, and are generalized as `Object`s.

**Example:** `() =>`
| | |
|---|---|
| Nullable Support? | Yes |
| Android (Java) | `com.facebook.react.bridge.Callback` |
| iOS | `RCTResponseSenderBlock` |

:::info
You may also find it useful to refer to the JavaScript specifications for the core modules in React Native. These are located inside the `Libraries/` directory in the React Native repository.
:::

### TypeScript

You may use the following table as a reference for which types are supported and what they map to in each platform:

#### `string`

|                   |                                 |
| ----------------- | ------------------------------- |
| Nullable Support? | <code>string &#124; null</code> |
| Android (Java)    | `String`                        |
| iOS               | `NSString`                      |

#### `boolean`

|                   |                                  |
| ----------------- | -------------------------------- |
| Nullable Support? | <code>boolean &#124; null</code> |
| Android (Java)    | `Boolean`                        |
| iOS               | `NSNumber`                       |

#### `number`

|                   |            |
| ----------------- | ---------- |
| Nullable Support? | No         |
| Android (Java)    | `double`   |
| iOS               | `NSNumber` |

#### Object literal

This is recommended over using plain `Object`, for type safety.

**Example:** `{| foo: string, ... |}`
| | |
|---|---|
| Nullable Support? | <code>?&#123;&#124; foo: string, ...&#124;&#125; &#124; null</code> |
| Android (Java) | - |
| iOS | - |

#### `Object`

:::info
Recommended to use [Object literal](#object-literal-1) instead.
:::

|                   |                                 |
| ----------------- | ------------------------------- |
| Nullable Support? | <code>Object &#124; null</code> |
| Android (Java)    | `ReadableMap`                   |
| iOS               | `@` (untyped dictionary)        |

#### `Array<*>`

|                   |                                                                |
| ----------------- | -------------------------------------------------------------- |
| Nullable Support? | `Array<\*> &#124; null`                                        |
| Android (Java)    | `ReadableArray`                                                |
| iOS               | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |

#### `Function`

|                   |                                   |
| ----------------- | --------------------------------- |
| Nullable Support? | <code>Function &#124; null</code> |
| Android (Java)    | -                                 |
| iOS               | -                                 |

#### `Promise<*>`

|                   |                                                 |
| ----------------- | ----------------------------------------------- |
| Nullable Support? | `Promise<\*> &#124; null`                       |
| Android (Java)    | `com.facebook.react.bridge.Promise`             |
| iOS               | `RCTPromiseResolve` and `RCTPromiseRejectBlock` |

#### Type Unions

Type unions are only supported as callbacks.

**Example:** `'SUCCESS' | 'FAIL'`
| | |
|---|---|
| Nullable Support? | Only as callbacks |
| Android (Java) | - |
| iOS | - |

#### Callbacks

Callback functions are not type checked, and are generalized as `Object`s.

**Example:** `() =>`
| | |
|---|---|
| Nullable Support? | Yes |
| Android (Java) | `com.facebook.react.bridge.Callback` |
| iOS | `RCTResponseSenderBlock` |

:::info
You may also find it useful to refer to the JavaScript specifications for the core modules in React Native. These are located inside the `Libraries/` directory in the React Native repository.
:::
