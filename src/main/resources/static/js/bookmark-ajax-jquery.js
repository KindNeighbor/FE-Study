$(document).ready(function() {
  $('#bookmarkForm').submit(function(event) {
    event.preventDefault();

    const name = $('input[name="name"]').val();
    const url = $('input[name="url"]').val();
    const requestObject = { name: name, url: url };

    $.ajax({
      type: 'POST',
      url: '/bookmark',
      contentType: 'application/json',
      data: JSON.stringify(requestObject),
      success: function() {
        alert('즐겨찾기가 등록되었습니다.');
      },
      error: function() {
        console.error('request failed');
      }
    });
  });

  $('#getBookmarks').click(function() {
    $.ajax({
      type: 'GET',
      url: '/bookmarks',
      success: function(bookmarks) {
        const bookmarkListDom = $('#bookmark-list');
        bookmarkListDom.empty();

        bookmarks.forEach(function(bookmark) {
          const listItem = $('<li></li>').text(bookmark.name + ' - ' + bookmark.url);
          bookmarkListDom.append(listItem);
        });
      },
      error: function() {
        console.error('request failed');
      }
    });
  });
});