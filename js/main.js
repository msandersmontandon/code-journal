/* global data */
/* exported data */

var $entriesButton = document.querySelector('.header button');
var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entryUrl = document.querySelector('#entry-url');
var $entryTitle = document.querySelector('#entry-title');
var $entryNotes = document.querySelector('#entry-notes');
var $entryImage = document.querySelector('.entry-image > img');
var $entries = document.querySelector('[data-view="entries"]');
var $newButton = $entries.querySelector('button');
var $ulEntries = $entries.querySelector('ul.entries');

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
  $ulEntries.prepend(setEntry(entryFormObject));
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
  var $rightRow = document.createElement('div');
  $rightRow.className = 'row justify-between';
  $rightColumn.appendChild($rightRow);
  var $rightTitle = document.createElement('h2');
  $rightTitle.textContent = dataEntry.entryTitle;
  $rightRow.appendChild($rightTitle);
  var $rightIcon = document.createElement('i');
  $rightIcon.className = 'fas fa-pen';
  $rightRow.appendChild($rightIcon);
  var $rightNotes = document.createElement('p');
  $rightNotes.textContent = dataEntry.entryNotes;
  $rightColumn.appendChild($rightNotes);
  $entryForm.className = 'hidden';
  $entries.className = '';
  return $newEntry;
}

for (var i = 0; i < data.entries.length; i++) {
  $ulEntries.appendChild(setEntry(data.entries[i]));
}

$entriesButton.addEventListener('click', function (event) {
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryImage.setAttribute('alt', 'Placeholder Image');
  $entryImage.setAttribute('title', 'Placeholder Image');
  $entryForm.firstElementChild.reset();
  $entryForm.className = 'hidden';
  $entries.className = '';
});

$entries.addEventListener('click', function (event) {
  if (event.target === $newButton) {
    $entryForm.className = '';
    $entries.className = 'hidden';
  }
});
