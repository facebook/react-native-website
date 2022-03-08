---
id: release-roles-responsibilities
title: Roles and Responsibilities
---

Here we set guidelines to apply the “dividi et impera” approach to React Native releases: it is an involved process and we need to clarify the work to allow for easier rotations of folks in various positions.

The roles should be imagined as “concentric”, with #1 in the centre: this means that anything in role #3 can be done by #2 or #1, and anything on role #2 can be done by #1.

The goal of this structure is that #1 doesn’t have to do everything: to do so the suggestion is to at least always have a person per each role in each release.

---

## Release Role #1: Meta Releasers (x2)

### Details

Two sub-roles:

- 1 **release captain** as main point of contact per minor release (aiming for every 2 months, see [schedule](https://github.com/facebook/react-native/wiki/Release-Schedule))
- 1 **reverse shadow** per minor release — working on high-need tooling (perhaps from retrospective of previous minor release) and serves as backup if release captain is out

**Time commitment:** maximum 4 hours/week of work for each release captain and reverse shadow.

### Release Captain Responsibilities

- Drives the initial cut and sets up release scaffolding (re: blogpost draft, documentation bump, etc)
- Is informed of the pre-release & stable release status and any blocking issues and communicates to appropriate channels
  - Attends & drives weekly release meeting
  - updates and monitors the #releases channel
  - updates and monitors discussion in [react-wg/react-native-releases](https://github.com/reactwg/react-native-releases/discussions) discussion for both:
    - the [pre-release](https://github.com/reactwg/react-native-releases/discussions/categories/releases)
    - the [stable release (for patches)](https://github.com/reactwg/react-native-releases/discussions/categories/patches)
- Make final call on release decisions
  - Decide when to promote pre-release to stable (in consult with **co-pilot** and **release supporters**)
  - Decide when to release a patch on stable
- Ensures blocking issues have owners
  - Escalate internally if release community is blocked by Meta-owned dependencies (metro, folly, flipper, hermes, etc)
  - Coordinate with release co-pilot & supporters on any community library blockers (reanimated, cli, etc.)
- Escalates security alerts
  - When a security alert gets raised, communicates it quickly to relevant partners and internally
  - If the security fix commit lands and it’s important, coordinates with the **copilot** on which stable branches should get the releases and produces the patch releases accordingly
- Can perform release or delegate release steps (as well as **release co-pilot/reverse shadow**)

### Reverse Shadow Responsibilities

- Is informed of the minor release status and current stable status
- Supports release captain
  - Fills in for release captain if current release captain is unavailable
- Actions on high-priority tooling, retrospective action items when relevant

### Who can fill it

- These roles must be filled by Meta engineers

---

## Release Role #2 : Release Copilot

### Details

- 1 or 2 people (the second one being backup)

**Time commitment:** can be more flexible and doesn’t have to align with minor release schedule, but we should update the release schedule when needed. Most likely, a couple hours per week.

### Responsibilities

- Is informed of the minor release status and current stable status
  - attends weekly release meeting
  - updates and monitors #releases channel
  - updates and monitors discussion in [react-wg/react-native-releases](https://github.com/reactwg/react-native-releases/discussions) discussion for both:
    - the [pre-release](https://github.com/reactwg/react-native-releases/discussions/categories/releases)
    - the [stable release (for patches)](https://github.com/reactwg/react-native-releases/discussions/categories/patches)
- Ensures blocking issues have owners
  - Escalate to Meta releaser when blocked by Meta-owned dependencies (metro, folly, flipper, hermes, etc)
  - Find owners, coordinate with Meta releaser for any community library blockers (reanimated, cli, etc.)
- Support release decisions
  - Help decide when to promote pre-release to stable
  - Help decide when to release a patch on stable
  - Help decide which commits are part of which release
- Can perform release (pre-release/stable)
  - Merge cherry-picks (as agreed with main releaser)
  - Create the changelog & release entry in GH
  - Makes documentation PR and blogpost PR
  - Trigger the rn-diff-purge script to update upgrade-helper (this should be automated for 0.68 onwards)
- Help release testing via [local E2E script](/contributing/release-testing)

### Who can fill it

- This role can be filled by anyone with write access to the necessary repos (react-native)

---

## Release Role #3: Release Supporter

### Details

- 0 to N **release supporters**
- 0 to N **release testers**

**Time commitment:** as much or as little as available by each person.

No strict coupling with any specific release - active supports and testers will be thanked in the release notes of versions they help with.

### Release Supporter Responsibilities

- Surface release issues either on stable or release candidate by triaging [release issues in the react-native repo](https://github.com/facebook/react-native/labels?q=release)
  - Some issues might not be tagged appropriately, so keep an eye out on incoming issues and surface any
- Watch the [release discussions repo](https://github.com/reactwg/react-native-releases/discussions)
  - Help answer/debug/escalate issues
- Work on any [release improvements](https://github.com/facebook/react-native/projects/18) or if you see something that can be improved; please add!
- Help [test release candidates](/contributing/release-testing) with your configuration or improve it
- Engage/help out with discussion in the release related channels (#supporters-feed, #testers-feedback, #release-coordination)

### Release Tester Responsibilities

This role is about helping test release candidates against your production app/workflows

- Helps surface release issues either on stable or release candidate by them testing out against their production apps and workflows
  - Perhaps integrate either the [npm `next` or `nightly` versions of react-native](https://www.npmjs.com/package/react-native) in your app's CI and raise any issues that might come up.
- Support regression fixes if relevant
- Engage/help out with discussion in the release related channels (#supporters-feed, #testers-feedback, #release-coordination)

### Who can fill it

- Anyone interested in supporting the React Native Open Source project and its releases!
  - To start, you can participate in the [discussion repo](https://github.com/reactwg/react-native-releases/discussions) -- testing release candidates, surfacing any release issues you've seen or encountered yourself
  - We also have some [discussions about improvements](https://github.com/reactwg/react-native-releases/discussions/categories/improvements) here as well as some issues related to [improving the release process in this project board](https://github.com/facebook/react-native/projects/18).
    - If you are up for any specific tasks, let us know by commenting on it.
- For release testers, it's preferred (as it's very valuable) that you are able to test the releases against a production app in order to also verify non-trivial parts of the flow like archiving a release for the App Store.

#### Apply to the role

For both supporters and testers, you can let us know that you want to help out in this [dedicated discussion](https://github.com/reactwg/react-native-releases/discussions/11). We will provide you access to a dedicated RN Discord server that folks involved the releasers use to coordinate.
