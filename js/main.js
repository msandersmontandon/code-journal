/* global data */
/* exported data */

var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entryUrl = document.querySelector('#entry-url');
var $entryTitle = document.querySelector('#entry-title');
var $entryNotes = document.querySelector('#entry-notes');
var $entryImage = document.querySelector('.entry-image > img');
var $entries = document.querySelector('[data-view="entries"]');
var $ulEntries = $entries.querySelector('ul.entries');
var entryList = {};

$entryUrl.addEventListener('blur', function (event) {
  if (event.target.value) {
    $entryImage.setAttribute('src', event.target.value);
  }
});

$entryTitle.addEventListener('blur', function (event) {
  if (event.target.value) {
    $entryImage.setAttribute('alt', event.target.value);
    $entryImage.setAttribute('title', event.target.value);
  }
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entryFormObject = {
    entryTitle: $entryTitle.value,
    entryUrl: $entryUrl.value,
    entryNotes: $entryNotes.value,
    entryId: data.nextEntryId++
  };
  data.entries.unshift(entryFormObject);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryImage.setAttribute('alt', 'Placeholder Image');
  $entryImage.setAttribute('title', 'Placeholder Image');
  $entryForm.firstElementChild.reset();
});

function setEntry(dataEntry) {
  var $newEntry = document.createElement('li');
  $newEntry.className = 'row';
  $newEntry.setAttribute('id', dataEntry.entryId);
  var $leftColumn = document.createElement('div');
  $leftColumn.className = 'column-half left';
  $newEntry.appendChild($leftColumn);
  var $leftImage = document.createElement('img');
  $leftImage.setAttribute('src', dataEntry.entryUrl);
  $leftColumn.appendChild($leftImage);
  var $rightColumn = document.createElement('div');
  $rightColumn.className = 'column-half right';
  $newEntry.appendChild($rightColumn);
  var $rightTitle = document.createElement('h2');
  $rightTitle.textContent = dataEntry.entryTitle;
  $rightColumn.appendChild($rightTitle);
  var $rightNotes = document.createElement('p');
  $rightNotes.textContent = dataEntry.entryNotes;
  $rightColumn.appendChild($rightNotes);
  $ulEntries.insertBefore($newEntry, $ulEntries.querySelector('li'));
  entryList['entryId #' + dataEntry.entryId] = $newEntry;
}

for (var i = 0; i < data.entries.length; i++) {
  setEntry(data.entries[i]);
}
