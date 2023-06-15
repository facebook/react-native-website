---
id: release-roles-responsibilities
title: Roles and Responsibilities
---

Here we set guidelines to apply the "dividi et impera" approach to React Native releases: it is an involved process and we need to clarify the work to allow for easier rotations of folks in various positions.

In a standard situation, we expect that the Release Crew is composed of 2+2 releasers (two people from the community, two from Meta). Organically, the Release Crew will identify one Meta and Community drivers that will lead the effort, but that can change based on day-to-day availability of the members.

A Release Crew effort starts with the work on a new minor; meaning, at least one week ahead of the branch cut. It is part of the current Release Crew responsibilities to identify when to "pass the baton" to the next one.

---

## Release Role #1: Meta Releaser

### Details

- 2 people per each release

**Time commitment:** about 4 hours/week of work until the next crew starts working on a new minor release (multi month commitment).

### Role Responsibilities

- Drives the initial cut and sets up release scaffolding (re: blogpost draft, documentation bump, etc)
- Is informed of the pre-release & stable release status and any blocking issues and communicates to appropriate channels
  - Attends & drives weekly release meeting
  - updates and monitors the #releases channel
  - updates and monitors discussion in [react-wg/react-native-releases](https://github.com/reactwg/react-native-releases/discussions) discussion for both:
    - the [pre-release](https://github.com/reactwg/react-native-releases/discussions/categories/releases)
    - the [stable release (for patches)](https://github.com/reactwg/react-native-releases/discussions/categories/patches)
- Make final call on release decisions
  - Decide when to promote pre-release to stable (in consult with the release crew)
  - Decide when to release a patch on stable
- Ensures blocking issues have owners
  - Escalate internally if release community is blocked by Meta-owned dependencies (metro, folly, flipper, hermes, etc)
  - Coordinate with release crew on any community library blockers (reanimated, cli, etc.)
- Escalates security alerts
  - When a security alert gets raised, communicates it quickly to relevant partners and internally
  - If the security fix commit lands and it’s important, coordinates with the release crew on which stable branches should get the releases and produces the patch releases accordingly
- Can perform release or delegate release steps
- Responsible for all active releases in the support window during the duration of the role [supported versions](https://github.com/reactwg/react-native-releases#which-versions-are-currently-supported)

### Who can fill it

- This role can only be filled by Meta engineers

---

## Release Role #2: Community Releaser

### Details

- 2 people per each release

**Time commitment:** flexible but, most likely, a few hours per week until next crew starts working on a new minor release (multi month commitment).

### Role Responsibilities

- Is informed of the minor release status and current stable status
  - prepares agenda & attends weekly release meeting
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
  - Trigger the rn-diff-purge script to update upgrade-helper (this is automated for 0.68 onwards)
- Coordinates the [release testing](/contributing/release-testing)
- Runs a release retrospective after a new minor is released
- Responsible for all active releases in the support window during the duration of the role [supported versions](https://github.com/reactwg/react-native-releases#which-versions-are-currently-supported)

### Who can fill it

- This role can be filled by anyone with write access to the necessary repos (react-native)
