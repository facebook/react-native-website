---
id: version-0.30-transforms
title: Transforms
original_id: transforms
---

### Props

- [`decomposedMatrix`](transforms.md#decomposedmatrix)
- [`rotation`](transforms.md#rotation)
- [`scaleX`](transforms.md#scalex)
- [`scaleY`](transforms.md#scaley)
- [`transform`](transforms.md#transform)
- [`transformMatrix`](transforms.md#transformmatrix)
- [`translateX`](transforms.md#translatex)
- [`translateY`](transforms.md#translatey)

---

# Reference

## Props

### `decomposedMatrix`

| Type                     | Required |
| ------------------------ | -------- |
| DecomposedMatrixPropType | No       |

---

### `rotation`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `scaleX`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `scaleY`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `transform`

| Type | Required |
| ---- | -------- |


| ReactPropTypes.arrayOf( ReactPropTypes.oneOfType([ ReactPropTypes.shape({perspective: ReactPropTypes.number}), ReactPropTypes.shape({rotate: ReactPropTypes.string}), ReactPropTypes.shape({rotateX: ReactPropTypes.string}), ReactPropTypes.shape({rotateY: ReactPropTypes.string}), ReactPropTypes.shape({rotateZ: ReactPropTypes.string}), ReactPropTypes.shape({scale: ReactPropTypes.number}), ReactPropTypes.shape({scaleX: ReactPropTypes.number}), ReactPropTypes.shape({scaleY: ReactPropTypes.number}), ReactPropTypes.shape({translateX: ReactPropTypes.number}), ReactPropTypes.shape({translateY: ReactPropTypes.number}), ReactPropTypes.shape({skewX: ReactPropTypes.string}), ReactPropTypes.shape({skewY: ReactPropTypes.string}) ]) ) | No |

---

### `transformMatrix`

| Type                    | Required |
| ----------------------- | -------- |
| TransformMatrixPropType | No       |

---

### `translateX`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `translateY`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |
