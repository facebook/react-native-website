---
id: testing
title: Testing
---

As your codebase expands, small errors and edge cases you don’t expect can cascade into larger failures. Bugs lead to bad user experience and ultimately, business losses. One way to prevent fragile programming is to test your code before releasing it into the wild.

In this guide, we will cover different ways to ensure your app works as expected, ranging from static analysis to end-to-end tests.

## Why Test

We're humans and we make mistakes. Testing is important because it proves that your code is working, and perhaps even more importantly, ensures that your code continues to work in the future as you add new features, refactor the existing ones, or after you upgrade major dependencies of your project.

There is more value in testing, that perhaps isn't immediately visible: when there is a bug in your code, often the easiest way to fix it is to write a failing test that exposes the bug - then when you fix the bug in your code and re-run the test, it'll pass, meaning the bug is fixed and is never reintroduced into the code base.

Tests can also serve as documentation for new people joining your team - when they have to use code they have never seen before, reading tests can greatly help them to understand how the existing code is intended to be used.

## Static Analysis

The first step to improve your code quality is to start using static analysis tools. Static analysis checks your code for errors as you write it, but without running any of that code.

- **Linters** analyze code to catch common errors, such as unused code, help avoid pitfalls or flag style guide no-nos like using tabs instead of spaces (or vice versa, depending on your configuration). Linters are configured by a set of rules - and your code needs to follow them.
- **Type checking** ensures that the construct you’re passing to a function matches what the function was designed to accept, preventing passing a string to a counting function that expects an integer, for instance.

React Native comes with two such tools configured out of the box: [ESLint](https://eslint.org/) for linting and [Flow](https://flow.org/en/docs/) for type checking. You can also use [TypeScript](https://www.typescriptlang.org/), which is a typed language that compiles to plain JavaScript.

## Writing Testable Code

To start with tests, you first need to write code that is testable. Consider an aircraft manufacturing process - before any model first takes off to show that all of its complex systems work well together, individual parts are tested to guarantee they are safe and function correctly. For example, wings are tested by bending them under extreme load, engine parts are tested for their durability, windshield is tested against simulated bird impact, and much more.

Similarly, with software, as opposed to writing your entire program in one huge file with many lines of code, writing your code in multiple small modules that you can test is more effective. In this way, writing testable code is intertwined with writing clean, modular code.

To help make your app more testable, it’s a good idea to separate the view part of your app, React components, from business logic and app state (regardless of whether you use Redux, MobX or other solutions). This way, you can separate tests of your business logic — which shouldn’t rely on your React components — from the components themselves, whose job is primarily rendering your app’s UI!

Theoretically, you could go so far as to move all logic and data fetching out of your components. This way your components would be solely dedicated to rendering, and your state would be independent on your components - your app’s logic would work without any React components at all!

After writing testable code, it’s time to write some actual tests! (Or if you do test-driven development, you actually write tests first!). We encourage you to explore the topic of testability in other learning resources.

The default template of React Native ships with [Jest](https://jestjs.io) testing framework. It includes a preset that's tailored to this environment so you can get productive without tweaking the configuration and mocks straight away. You can use Jest to write all types of tests featured in this guide. Let’s get started!

### Structuring Tests

Your tests should be short and ideally test only one thing. Let's start with an example unit test written with Jest:

```js
it('given a date in the past, colorForDueDate() returns red', () => {
    expect(colorForDueDate('2000-10-20'))).toBe('red');
});
```

The test is described by the string passed to the [`it`](https://jestjs.io/docs/en/api#testname-fn-timeout) function - take good care writing the description so that it’s clear what is being tested. Do your best to cover the following:

1. **Given** - some precondition
2. **When** - some action executed by the function that you’re testing
3. **Then** - the expected outcome

This is also known as AAA (Arrange, Act, Assert).

Jest offers [`describe`](https://jestjs.io/docs/en/api#describename-fn) function to help structure your tests. Use `describe` to group together all tests that belong to one functionality. Describes can be nested, if you need that. Other functions you'll commonly use are [`beforeEach`](https://jestjs.io/docs/en/api#beforeeachfn-timeout) or [`beforeAll`](https://jestjs.io/docs/en/api#beforeallfn-timeout) that you can use for setting up the objects you're testing. Read more in the [Jest api reference](https://jestjs.io/docs/en/api).

If your test has many steps or many expectations, you probably want to split it into multiple smaller ones. Also, ensure that your tests are completely independent of one another. Each test in your suite must be executable on its own without eg. first running some other test. Conversely, if you run all your tests together, the first test must not influence the output of the second one.

Lastly, as developers we like when our code works great and doesn't crash. With tests, this is often the opposite - think of a failing test as of a _good thing_! When a test is failing, it often means something is not right and it gives us an opportunity to fix the problem before it impacts the users.

## Unit tests

Unit tests cover the smallest parts of code, like individual functions or classes.

When the object under test has any dependencies, you’ll often mock them out, as described in the next paragraph.

The great thing about unit tests is that they are quick to write and run. Therefore, as you work, you get fast feedback about whether your tests are passing. Jest even has an option to continuously run tests that are related to code you’re editing: [Watch mode](https://jestjs.io/docs/en/cli#watch).

## Mocking

Sometimes, when your tested objects have external dependencies, you’ll want to mock them out. “Mocking” is when you replace some dependency of your code by your own implementation. Note that generally, using real objects in your tests is better than using mocks but there are situations where this is not possible (for example when your JS unit test relies on a native module written in Java or Objective-C).

Imagine you’re writing an app that shows the current weather in your city and you’re using some external service (dependency of your code) that provides you with the weather information. If the service tells you that it’s raining, you want to show an image with a rainy cloud. You don’t want to call that service in your tests, because it would make the tests slow and unstable (because of the network requests involved) and because the service may return different data every time you run the test. Therefore, you can provide a mock implementation of the service - effectively replacing thousands of lines of code and some internet-connected thermometers!

Jest comes with [support for mocking](https://jestjs.io/docs/en/mock-functions#mocking-modules) from function level all the way to module level mocking.

## Integration Tests

When writing larger software systems, individual pieces of it need to interact with each other. As explained, in unit testing, when your unit depends on another one, you’ll sometimes end up mocking the dependency, replacing it with a fake one.

In integration testing, real individual units are combined (same as in your app) and tested together to ensure that their cooperation works as expected. This is not to say that mocking does not happen here: you’ll still need mocks (for example to mock communication with the weather service covered in the mocking paragraph), but much less than in unit testing.

> Please note that the terminology around what integration testing means is not always consistent. Also, the line between what is a unit test and what is an integration test may not always be clear. As a rule of thumb for this document, when your test
>
> - Uses an external system (such as the thermometer in the mocking paragraph)
> - Does a network call to other application
> - Does any kind of file or database I/O
>
> Then it falls into the “integration test” category.

## Component Tests

React components are responsible for rendering your app, and users will directly interact with their output. Even if your app's business logic has high testing coverage and is correct, without component tests you may still deliver a broken UI to your users. Component tests could fall into both unit and integration testing, and since they are such a core part of React Native, we'll cover them in separate paragraphs.

For testing React components, there are two things you may want to test:

- Interaction: to ensure the component behaves correctly when interacted with by a user (eg. when user presses a button)
- Rendering: to ensure the component render output used by React is correct

For example, if you have a button that has an `onPress` listener, you want to test that the button both appears correctly and that tapping the button is correctly handled by the component.

There are several libraries that can help you testing these:

- React’s [Test Renderer](https://reactjs.org/docs/test-renderer.html) developed alongside its core. Provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
- [`react-native-testing-library`](https://github.com/callstack/react-native-testing-library) builds on top of React’s test renderer and adds `fireEvent` and `query` apis described in the next paragraph.
- [`@testing-library/react-native`](https://www.native-testing-library.com/) is another alternative that also builds on top of React’s test renderer and adds `fireEvent` and `query` apis described in the next paragraph.

> Note that component tests are only JavaScript tests running in Node.js environment, they do _not_ take into account any iOS or Android code which is backing the React Native components. It follows that they cannot give you a 100% confidence that everything works for the user - if there is a bug in the iOS or Android code, they will not find it.

### Testing User Interactions

Aside from rendering some UI, your components handle events like `onChangeText` for `TextInput` or `onPress` for `Button`. They may also contain other functions and event callbacks. Consider the following example:

```js
class GroceryShoppingListCreator extends React.Component {
  render() {
    return (
      <>
        <TextInput
          placeholder="Enter grocery item"
          onChangeText={this.setGroceryItem}
        />
        <Button
          title="Add the item to list"
          onPress={this.props.addNewItemToShoppingList}
        />
      </>
    );
  }
}
```

When testing user interactions, test the component from the user perspective: you could write your tests to call `addNewItemToShoppingList` directly, and while such test works, it's very close to the implementation details of your component and would break if you refactor the component.

To counter for that, component testing libraries such as [`react-native-testing-library`](https://github.com/callstack/react-native-testing-library), offer `fireEvent` apis that simulate a user interacting with the component. There are apis that allow to simulate entering text into textinput, tapping buttons and more. An example of how you may fire text change event using `react-native-testing-library`:

```js
test('updates grocery input', () => {
  fireEvent.changeText(getByPlaceholder('Enter grocery item'), 'banana');
});
```

The first parameter is a query function that returns a `ReactTestInstance` and the second parameter is the new text that user entered.

This way, we're not testing what some function is doing - we're testing what happens when a user changes the text in the `TextInput`!

Now that we know how to fire an event, let's take a look at verifying that it caused the expected change in your component: for example, that a certain text is rendered in a `GroceryShoppingList`. Aforementioned component testing libraries expose `query` apis for this purpose. An example may look like this:

```js
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const {getByTestId, getByText, getAllByText} = render(
    <GroceryShoppingList />,
  );

  fireEvent.changeText(getByPlaceholder('Enter grocery item'), 'banana');
  fireEvent.press(getByText('Add the item to list'));
  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});
```

### Testing Rendered Output

[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) lets you verify how component is rendering. A snapshot is a textual representation of your component’s render output, and may look like this:

```
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

Snapshots are _generated_ by a component testing testing library, unlike the other types of tests which are written manually (snapshots are too complex to be created by hand).

With snapshot testing, you typically first implement your component and then run the snapshot test, which creates a snapshot and saves it to a file in your repo as a reference snapshot. The file is then committed and checked during code review. Changes to the component render output will result in change of its snapshot, which fails the test. You then need to update the stored reference snapshot for the test to pass. That change again needs to be commited and reviewed.

Snapshots have several weak points:

- For you as a developer or reviewer, it can be hard to tell whether a change in snapshot is intended or whether it's evidence of a bug. Especially large snapshots can quickly become hard to understand and their added value becomes low.
- When snapshot is created, at that point it is considered to be correct - even in the case when the rendered output is actually wrong.
- When a snapshot fails, it's tempting to update it using the `--updateSnapshot` jest option without taking proper care to investigate whether the change is expected. Certain developer discipline is thus needed.

Snapshots themselves do not ensure that your component render logic is correct, they are merely good at guarding against unexpected changes and for checking that the components in the React tree under test receive the expected props (styles and etc.).

We recommend that you only use small snapshots (see [`no-large-snapshots` rule](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md)). If you want to test a _change_ between two React component states, use [`snapshot-diff`](https://github.com/jest-community/snapshot-diff). When in doubt, prefer explicit expectations as described in the previous paragraph.

## End-to-End Tests

In end-to-end (E2E) tests, you verify your app is working as expected on a device (or a simulator / emulator) from the user perspective.

To run them, you build your app in the release configuration and run tests against it. In E2E tests, you no longer think about React components, React Native apis, Redux stores or any business logic - that is not the purpose of E2E tests and those are not even accessible to you during E2E testing.

Instead, E2E testing libraries allow you to find and control elements in the screen of your app: for example, you can tap buttons or insert text into textinputs the same way a real user would. Then you can make assertions about whether or not certain element exists in the app’s screen, whether or not it’s visible, what text it contains and so on.

E2E tests give you the highest possible confidence that part of your app is working. The tradeoff here is that compared to the previously mentioned types of tests, writing them is more time consuming, they are quite slow to run and more prone to flakiness.

A rule of thumb is to mostly cover vital parts of your app, like authentication flow, core functionalities, payments, etc with E2E tests and use faster JS test for the rest. The more tests you add, the more confidence, but also more time spending maintaining and running them. Know the tradeoffs and decide what's best for you.

There are several E2E testing tools available: in the React Native community, [Detox](https://github.com/wix/detox/) is a popular framework because it’s tailored for React Native apps. Another popular library in the space of iOS and Android apps is [Appium](http://appium.io/).

## Summary

We hope you enjoyed and, what's more important, learned something from this guide. There are many ways we can test our apps, and it may be hard to decide what to use at first. However, we believe all of that will make more sense once you start adding tests to your awesome React Native app. So what are you waiting for? Get your coverage up!

### Links

- [React testing overview](https://reactjs.org/docs/testing.html)
- [`react-native-testing-library`](https://github.com/callstack/react-native-testing-library)
- [`@testing-library/react-native`](https://www.native-testing-library.com/)
- [Jest docs](https://jestjs.io/docs/en/tutorial-react-native)
- [Detox](https://github.com/wix/detox/)
- [Appium](http://appium.io/)
