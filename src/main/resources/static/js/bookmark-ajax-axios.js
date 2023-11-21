function addBookmarkRequest() {
  const name = document.querySelector('input[name=name]').value;
  const url = document.querySelector('input[name=url]').value;
  const requestObject = { name: name, url: url };

  axios.post('/bookmark', requestObject, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    alert('즐겨찾기가 등록되었습니다.');
  })
  .catch(error => {
    console.error('request failed', error);
  });

  return false;
}

function getBookmarkListRequest() {
  axios.get('/bookmarks')
  .then(response => {
    const bookmarkListDom = document.querySelector('#bookmark-list');
    bookmarkListDom.innerHTML = '';

    const bookmarks = response.data;
    bookmarks.forEach(bookmark => {
      const liNode = document.createElement('li');
      const textNode = document.createTextNode(bookmark.name + ' - ' + bookmark.url);
      liNode.appendChild(textNode);
      bookmarkListDom.appendChild(liNode);
    });
  })
  .catch(error => {
    console.error('request failed', error);
  });
}