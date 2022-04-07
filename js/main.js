/* global data */
/* exported data */

var $entriesButton = document.querySelector('.header button');
var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entryFormHeading = $entryForm.querySelector('h1');
var $entryUrl = document.querySelector('#entry-url');
var $entryTitle = document.querySelector('#entry-title');
var $entryNotes = document.querySelector('#entry-notes');
var $deleteButton = $entryForm.querySelector('.delete button');
var $saveButton = $entryForm.querySelector('button.save');
var $entryImage = document.querySelector('.entry-image > img');
var $entries = document.querySelector('[data-view="entries"]');
var $newButton = $entries.querySelector('button');
var $ulEntries = $entries.querySelector('ul.entries');
var $currentEntryEdit = {};

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

$entryForm.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target === $saveButton) {
    if (data.editing) {
      data.editing.entryTitle = $entryTitle.value;
      data.editing.entryUrl = $entryUrl.value;
      data.editing.entryNotes = $entryNotes.value;
      for (var i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId === data.editing.entryId) {
          data.entries.splice(i, 1, data.editing);
        }
      }
      var $currentEditImage = $currentEntryEdit.querySelector('img');
      $currentEditImage.setAttribute('src', data.editing.entryUrl);
      $currentEditImage.setAttribute('alt', data.editing.entryTitle);
      $currentEditImage.setAttribute('title', data.editing.entryTitle);
      var $currentEditTitle = $currentEntryEdit.querySelector('h2');
      $currentEditTitle.textContent = data.editing.entryTitle;
      var $currentEditNotes = $currentEntryEdit.querySelector('p');
      $currentEditNotes.textContent = data.editing.entryNotes;
      data.editing = null;
    } else {
      var entryFormObject = {
        entryTitle: $entryTitle.value,
        entryUrl: $entryUrl.value,
        entryNotes: $entryNotes.value,
        entryId: data.nextEntryId++
      };
      data.entries.unshift(entryFormObject);
      $ulEntries.prepend(setEntry(entryFormObject));
    }
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryImage.setAttribute('alt', 'Placeholder Image');
    $entryImage.setAttribute('title', 'Placeholder Image');
    $entryForm.firstElementChild.reset();
    $entryForm.className = 'hidden';
    $entries.className = '';
  }
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
  $leftImage.setAttribute('alt', dataEntry.entryTitle);
  $leftImage.setAttribute('title', dataEntry.entryTitle);
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
    $entryFormHeading.textContent = 'New Entry';
    $entryForm.className = '';
    $entries.className = 'hidden';
    $deleteButton.className = 'hidden';
  }
  if (event.target.tagName === 'I') {
    $entryFormHeading.textContent = 'Edit Entry';
    $entryForm.className = '';
    $entries.className = 'hidden';
    $deleteButton.className = '';
    $currentEntryEdit = event.target.closest('li');
    var currentEntryId = $currentEntryEdit.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(currentEntryId)) {
        data.editing = data.entries[i];
      }
    }
    $entryImage.setAttribute('src', data.editing.entryUrl);
    $entryImage.setAttribute('alt', data.editing.entryTitle);
    $entryImage.setAttribute('title', data.editing.entryTitle);
    $entryTitle.value = data.editing.entryTitle;
    $entryUrl.value = data.editing.entryUrl;
    $entryNotes.value = data.editing.entryNotes;
  }
});
