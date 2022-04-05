/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

if (localStorage.getItem('data')) {
  for (var key in data) {
    var previousDataJSON = localStorage.getItem('data');
    var previousData = JSON.parse(previousDataJSON);
    data[key] = previousData[key];
  }
}

window.addEventListener('unload', function (event) {
  localStorage.setItem('data', JSON.stringify(data));
});
