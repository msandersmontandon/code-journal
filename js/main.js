/* global data */
/* exported data */

var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entryUrl = document.querySelector('#entry-url');
var $entryTitle = document.querySelector('#entry-title');
var $entryNotes = document.querySelector('#entry-notes');
var $entryImage = document.querySelector('.entry-image > img');
var photoUrl = '';
var photoTitle = '';
var notes = '';

if (localStorage.getItem('data')) {
  for (var key in data) {
    var previousDataJSON = localStorage.getItem('data');
    var previousData = JSON.parse(previousDataJSON);
    data[key] = previousData[key];
  }
}

$entryForm.addEventListener('input', function (event) {
  if (event.target === $entryUrl) {
    photoUrl = event.target.value;
  }
  if (event.target === $entryTitle) {
    photoTitle = event.target.value;
  }
  if (event.target === $entryNotes) {
    notes = event.target.value;
  }
});

$entryUrl.addEventListener('blur', function (event) {
  if (photoUrl) {
    $entryImage.setAttribute('src', photoUrl);
  }
});

$entryTitle.addEventListener('blur', function (event) {
  if (photoTitle) {
    $entryImage.setAttribute('alt', photoTitle);
    $entryImage.setAttribute('title', photoTitle);
  }
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entryFormObject = {
    entryTitle: photoTitle,
    entryUrl: photoUrl,
    entryNotes: notes,
    nextEntryId: data.nextEntryId,
    entryId: data.nextEntryId - 1
  };
  data.nextEntryId++;
  data.entries.unshift(entryFormObject);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryImage.setAttribute('alt', 'Placeholder Image');
  $entryImage.setAttribute('title', 'Placeholder Image');
  $entryUrl.value = '';
  $entryTitle.value = '';
  $entryNotes.value = '';
  photoUrl = '';
  photoTitle = '';
  notes = '';
  var entryFormJSON = JSON.stringify(entryFormObject);
  var key = 'entry-form-' + entryFormObject.entryId;
  localStorage.setItem(key, entryFormJSON);
  localStorage.setItem('data', JSON.stringify(data));
});
