---
"react-modal-control": patch
---

Fixed bug. "open" function from modal hook called with only one argument was causing error due to modal options were not present. Now it is optional in useModalManager
