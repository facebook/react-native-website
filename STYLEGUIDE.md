# React Native Documentation Style Guide

We believe everyone should be able to learn React Native, no matter what their technology platform, experience, country of origin, age, race, gender, etc. And our documentation guidelines reflect that.

## From “Zero to 360”

Part of what makes books like Effective JavaScript effective for new learners as well as advanced is that each section starts by assuming the reader has no knowledge of JavaScript. By the end of the chapter, the author has ramped up the content to speak at an expert level. That’s the sort of cadence we’re looking for in our documentation pages. Each page should start with the basics then ramp up to advanced ideas and concepts. Readers will, as with Effective JavaScript, revisit the content as their expertise and understanding grows.

## Write for more than a React audience

It’s convenient to write as though the reader has the same background and perspective that you do. But in reality, our readers have a range of experience as well as come to us from many different fields including Android and iOS. We have to be inclusive of all learners, and that means taking nothing for granted!

- **Assume no knowledge of React.** 31% of visitors surveyed in September 2019 said they have no experience with React JS. When explaining React concepts, give a short explanation and then link to the appropriate React docs.
- **Assume readers have no background in web development.** While 76% of our visitors surveyed in September 2019 said they had experience with web development before starting with React Native, that means 24% came in without any knowledge of web paradigms! 7.4% said they had no experience, meaning we can’t rely on Android, iOS, or web metaphors with those readers.
- **Provide references to multiple technologies.** To help learners from Android and iOS backgrounds, it’s important that references also take those experiences into account and make comparisons for them in addition to web developers.

### Example

**Bad** “React Native is like React, but it uses native components instead of web components as building blocks.” This assumes a knowledge of the Web as well as React—and readers may lack one or both of those.

**Good** “React Native is built with React. On the Web, React composes web components into UIs. Similarly, React Native uses native components as building blocks.”

## Unpack “native”

Refer to non-web technologies by their proper nouns or as “apps,” not lumping them as “native.” Android and iOS developers do not think of their technologies as “native” nor what they build as “native apps.” Being more specific helps create an inclusive shared vocabulary for web and app devs to learn and collaborate with each other.

### Example

**Bad** “Native App Accessibility (Android and iOS)” Qualifying “app” with “native” is redundant with “Android and “iOS” in the same phrase.

**Good** “App Accessibility on Android and iOS” specifies both platforms and drops the confusing “native.”

## Welcoming and mature

Tone counts for a lot. Too familiar, and some folks might feel like they aren’t a part of a company of friends. Too formal and we risk alienating them with a robotic-sounding textbook! Our aim is to be welcoming and mature, like a senior developer who doesn’t take themselves too seriously.

### Example

**Bad** “In accordance with the ancient traditions of our people, we must first build an app that does nothing except say ‘Hello, world!’” Pokes fun at ancient traditions of “our people” (whose people?) using a storytelling voice familiar to European English-language speakers that could be lost on people from other backgrounds.

**Good** “As with so many other tutorials, you will first build an app that says ‘Hello, world!’” This is shorter, easier to read, and still keeps a friendly tone by acknowledging the proliferation of ‘hello world’ apps.

## In-jokes are out

Cultural reference jokes, or “in-jokes,” don’t translate well across language and cultural divides. Even a reference to a popular British television drama like Downton Abbey can be lost on an American audience! What’s more, these reference tend to exclude people of different generations and age poorly. For instance, a Never Ending Story reference is lost on people born in the 90’s, and a Stranger Things reference will be outdated in five years, meaning more work for future documentation contributors to update.

## “you”, “we”, and “they”

- “You” refers to the reader
- “We” can be confusing and ambiguous. It could refer to the React Native community, React Native contributors, or the React Native Core team at Facebook. As such, only use “we” after explicitly referring to one of those groups.
- “They” refers to people or organizations outside this “you/we” paradigm
  - Set up who “they” are by referencing the person/org first

### Example

**Bad** “We can play around with sample code directly in these web simulators made by Genius Co. (You have built a wonderful tool!) Their contributions make it better and better. It’s great when they all work together!”

**Good** “You can play around with sample code directly in these web simulators made by Genius Co. (They have built a wonderful tool!) The React Native community’s contributions make it better and better. It’s great when we all work together!”

## Avoid pronouns

Pronouns are difficult to translate into some languages. They also tend to be gendered, which provides unnecessary bias.

### Example

<!--alex ignore he-she retext-equality-->

**Bad** “When he opens the app, he will see a loading screen.”

**Good** “When the user opens the app, it will show a loading screen.”

## Prefer imperative to gerund

"To" forms of verbs are easier to translate.

### Example

**Bad** “Coding with React Native is fun!”

**Good** “It is fun to code with React Native!”

## Shorter is better

Short sentences are easier to translate, for both machines and humans! Break clauses into multiple sentences.

### Example

**Bad** “First of all, ES2015 (also known as ES6) is a set of improvements to JavaScript that is now part of the official standard, but not yet supported by all browsers, so often it isn't used yet in web development.”

**Good** “ES2015 is a set of improvements to the official JavaScript standard. It is not yet supported by all browsers, so it isn't used yet in web development.”

# Technical documentation guidelines

## Format menu paths

When navigating operating system menus, the menu selection path should be **bold** and use carats to indicate submenus.

### Example

**Bad** “Open Xcode’s ‘Preferences...’ menu and then click on ‘Components.’” Ambiguous. Relies on reader knowing that “Preferences” is a submenu of “Xcode.” Difficult to read at a glance.

**Good** “Open **Xcode > Preferences...** and select the **Components** tab.” Path is clearer to pick out from the surrounding copy.

## “Android” before “iOS”

The number of Android developers surpasses iOS developers, and putting iOS in front of Android seems belittling and privileged. For consistency's sake at the very least, when listing technologies, Android comes before iOS.

**Bad** “While we do our best to assume no prior knowledge of React, iOS, or Android development, these are valuable topics of study for the aspiring React Native developer.”

**Good** “While we do our best to assume no prior knowledge of React, Android, or iOS development, these are valuable topics of study for the aspiring React Native developer.”

## When it comes to values, be explicit

When it comes to describing property values, be definitive in what is and is not allowed. If something is optional, say it is optional. If something can have multiple values, say which values it can accept.

### Example

**Bad** “Should be an integer.” Implies that it could take other values. Leaves room for imagination.

**Good** “Accepts integer values.” Leaves no doubt about what values this takes!

## Other grammar policies

* Capitalize “Hooks.”

## Empathize with readers

When writing step-by-step instructions (e.g. how to install something), try to forget everything you know about the topic to attain a "beginner's mindset." Imagine follow the instructions you write, one step at time. Often you will discover that there is implicit knowledge that you forgot to mention, or that there are missing or out-of-order steps in the instructions. UX research pro tip: ask _someone else_ to follow your instructions and see where they get stuck!

# Learn more

## Writing tips

- Start with an outline, a table of contents of what you want to cover
- Expand that outline into fully fledged content
- Ensure your content answers Who, What, Where, When, Why and How

## Resources

- [React JS’s contibuting guidelines](https://github.com/reactjs/reactjs.org/blob/main/CONTRIBUTING.md#guidelines-for-text), especially the [code examples guidelines](https://github.com/reactjs/reactjs.org/blob/master/CONTRIBUTING.md#guidelines-for-code-examples)
