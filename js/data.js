/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

if (localStorage.getItem('data')) {
  var previousDataJSON = localStorage.getItem('data');
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('data', JSON.stringify(data));
});
