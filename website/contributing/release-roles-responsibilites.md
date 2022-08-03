---
id: release-roles-responsibilities
title: Roles and Responsibilities
---

Here we set guidelines to apply the "dividi et impera" approach to React Native releases: it is an involved process and we need to clarify the work to allow for easier rotations of folks in various positions.

In a normal situation, we expect that the release crew at any given point is composed of 2+2 releasers (two people from the community, two from Meta).

---

## Release Role #1: Meta Releasers (x2)

### Details

Two sub-roles:

- 1 **release captain** as main point of contact per minor release (aiming for every 2 months)
- 1 **reverse shadow** per minor release — working on high-need tooling (perhaps from retrospective of previous minor release) and serves as backup if release captain is out

**Time commitment:** around 4 hours/week of work for each release captain and reverse shadow.

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

## Release Role #2 : Community Releasers

### Details

- 2 people per each release

**Time commitment:** can be more flexible but, m most likely, a few hours per week.

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
- Runs a release retrospective after a new minor is released

### Who can fill it

- This role can be filled by anyone with write access to the necessary repos (react-native)
- Engineers from key companies in the React Native ecosystem are preferred
