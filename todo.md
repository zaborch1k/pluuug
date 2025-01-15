### Todo

- [ ] Introduced a bug - it seems verdict is either incorrect or it does not equate to "SAFE" ever. (checkURL.js -> notify.js)
- [ ] Create or snatch a neural network capable of predicting current site's safety based on URL, HTML, et cetera.
- [ ] Different cache for different tabs. Also why the fuck does everyone call every other thing cache...?

### Done ✓

- [x] Add dynamic ruleset or make website load conditional.
  - Migrated from intolerable declarativeNetRequests to webRequests and added simple redirect logic.
- [x] Discard the use of inject.js/alert() in favour of EITHER chrome.notifications OR separate .html with url saved in js.
- [x] Create a webpage that would warn the user about potentially unwanted activity from the website and allow them to force access the website or return to the previous page.


### Expired -
- [-] Right now, the engine's interaction with URLs containing asterisks is flawed at best. This is because of pending equality. Do something.