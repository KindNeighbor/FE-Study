function addBookmarkRequest() {
  const name = document.querySelector('input[name = name]').value;
  const url = document.querySelector('input[name = url]').value;
  const requestObject = {name : name, url : url};

  fetch('/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestObject)
  })
  .then(response => {
    if (response.status === 200) {
      alert("즐겨찾기가 등록되었습니다.");
    } else {
      console.error('request failed');
    }
  })
  .catch(error => {
    console.error('request failed', error);
  });

  return false;
}

function getBookmarkListRequest() {
  fetch('/bookmarks')
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.error('request failed');
      throw new Error('request failed');
    }
  })
  .then(bookmarks => {
    const bookmarkListDom = document.querySelector('#bookmark-list');
    bookmarkListDom.innerHTML = '';

    bookmarks.forEach(bookmark => {
      const liNode = document.createElement('li');
      const textNode = document.createTextNode(bookmark.name + ' - ' + bookmark.url);
      liNode.appendChild(textNode);
      bookmarkListDom.appendChild(liNode);
    });
  })
  .catch(error => {
    console.error('request failed', error);
  })
}