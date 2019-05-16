# Contributing

Thank you for your interest in contributing to the React Native Docs!

## Code of Conduct

Facebook has adopted a Code of Conduct that we expect project participants to
adhere to. Please [read the full text](https://code.facebook.com/codeofconduct)
so that you can understand what actions will and will not be tolerated.

## Guidelines for Text

**Different sections intentionally have different styles.**

The documentation is divided into sections to cater to different learning styles
and use cases. When editing an article, try to match the surrounding text in
tone and style. When creating a new article, try to match the tone of the other
articles in the same section. Learn about the motivation behind each section
below.

**[Getting Started](https://facebook.github.io/react-native/docs/tutorial.html)**
is relatively informal. Resist adding too much detail to the Quick Start. The
native code instructions should contain the minimal set of steps to get to a
working development environment. Whatever the case, it should be
possible for a beginner to mechanically follow every instruction, and still get
to a working React Native app.

**[The Basics](https://facebook.github.io/react-native/docs/tutorial.html)** is
designed to introduce fundamental concepts in a step-by-step way. Each
individual article in The Basics builds on the knowledge from the previous ones,
so make sure not to add any "cyclical dependencies" between them. It is
important that the reader can start with the first article and work their way to
the last Basics article without ever having to "look ahead" for a definition.
This explains some ordering choices. Resist adding too much detail to Basics
articles. They intentionally don't cover all corner cases, and focus on
establishing firm foundations.

**[Guides](https://facebook.github.io/react-native/docs/components-and-apis.html)**
are deep dives into topics that aren't essential for a beginner developer but
that everyone bumps into sooner or later. They don't have a specific order, and
target more experienced developers. If you have a set of recipes fitting a
particular use case, and those recipes aren't opinionated (most React Native
users would agree on them), this is the place to add them.

**[Reference](https://facebook.github.io/react-native/docs/activityindicator.html)**
is organized by APIs rather than concepts. It is intended to be exhaustive. Any
corner cases or recommendations that were skipped for brevity in The Basics or
Guides should be mentioned in the reference documentation for the corresponding
APIs.

**[Contributing](https://facebook.github.io/react-native/docs/contributing.html)**
should stay up-to-date and be friendly to relatively experienced developers.

**[More Resources](https://facebook.github.io/react-native/docs/more-resources.html)**
has a more conversational tone than the other sections. Here, it's fine to
include some content that's not primarily concerned with React Native, as long
as React Native users are overwhelmingly interested in it (e.g. recommendations
on which libraries to use).

**Try to follow your own instructions.**

When writing step-by-step instructions (e.g. how to install something), try to
forget everything you know about the topic, and actually follow the instructions
you wrote, a single step at time. Often you will discover that there is implicit
knowledge that you forgot to mention, or that there are missing or out-of-order
steps in the instructions. Bonus points for getting _somebody else_ to follow
the steps and watching what they struggle with. Often it would be something very
simple that you have not anticipated.
