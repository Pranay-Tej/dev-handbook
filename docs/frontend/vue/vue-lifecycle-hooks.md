---
id: vue-lifecycle-hooks
title: Lifecycle Hooks
sidebar_label: Lifecycle Hooks
---

## Creation

- beforeCreated()
- created()
  - all props watchers are processed here
  - make any API calls

## Mounting

- beforeMount()
- mounted()
  - dom is ready for access
  - focus on input element with dom node id

## Updating

- beforeUpdate()
  - access existing dom before an update
- updated()
  - perform any dom dependent operations

## Unmounting

- beforeUnmount()
  - cleanup
  - clear manually added event listeners
  - cancelling subscriptions
  - clear any timers
- unmounted()

## Misc

- keep-alive related
  - activated()
  - deactivated()
- errorCaptured()
  - triggered if any child throws errors
- renderTracked() renderTriggered()
  - useful for debugging

## Order

- Example. parent with isShown and child with v-if=isShown and button to toggle isShown
- first parent created mounted then child created mounted. parent beforeUpdate child umount parent updated
