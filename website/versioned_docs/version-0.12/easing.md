---
id: version-0.12-easing
title: Easing
original_id: easing
---

This class implements common easing functions. The math is pretty obscure, but this cool website has nice visual illustrations of what they represent: http://xaedes.de/dev/transitions/

### Methods

- [`step0`](easing.md#step0)
- [`step1`](easing.md#step1)
- [`linear`](easing.md#linear)
- [`ease`](easing.md#ease)
- [`quad`](easing.md#quad)
- [`cubic`](easing.md#cubic)
- [`poly`](easing.md#poly)
- [`sin`](easing.md#sin)
- [`circle`](easing.md#circle)
- [`exp`](easing.md#exp)
- [`elastic`](easing.md#elastic)
- [`back`](easing.md#back)
- [`bounce`](easing.md#bounce)
- [`bezier`](easing.md#bezier)
- [`in`](easing.md#in)
- [`out`](easing.md#out)
- [`inOut`](easing.md#inout)

---

# Reference

## Methods

### `step0()`

```javascript
static step0(n)
```

---

### `step1()`

```javascript
static step1(n)
```

---

### `linear()`

```javascript
static linear(t)
```

---

### `ease()`

```javascript
static ease(t)
```

---

### `quad()`

```javascript
static quad(t)
```

---

### `cubic()`

```javascript
static cubic(t)
```

---

### `poly()`

```javascript
static poly(n)
```

---

### `sin()`

```javascript
static sin(t)
```

---

### `circle()`

```javascript
static circle(t)
```

---

### `exp()`

```javascript
static exp(t)
```

---

### `elastic()`

```javascript
static elastic(bounciness)
```

A simple elastic interaction, similar to a spring. Default bounciness is 1, which overshoots a little bit once. 0 bounciness doesn't overshoot at all, and bounciness of N > 1 will overshoot about N times.

Wolfram Plots:

http://tiny.cc/elastic_b_1 (default bounciness = 1) http://tiny.cc/elastic_b_3 (bounciness = 3)

---

### `back()`

```javascript
static back(s)
```

---

### `bounce()`

```javascript
static bounce(t)
```

---

### `bezier()`

```javascript
static bezier(x1, y1, x2, y2, epsilon?)
```

---

### `in()`

```javascript
static in easing;
```

---

### `out()`

```javascript
static out(easing)
```

Runs an easing function backwards.

---

### `inOut()`

```javascript
static inOut(easing)
```

Makes any easing function symmetrical.
