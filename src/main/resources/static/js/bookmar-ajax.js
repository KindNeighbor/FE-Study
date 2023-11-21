function addBookmarkRequest() {
  const name = document.querySelector('input[name=name]').value;
  const url = document.querySelector('input[name=url]').value;
  const requestObject = {name: name, url: url};
  const requestJson = JSON.stringify(requestObject);

  function onReadyStateChange(event) {
    const currentAjaxRequest = event.currentTarget;

    if (currentAjaxRequest.readyState === XMLHttpRequest.DONE) {
      if (currentAjaxRequest.status === 200) {
        alert("즐겨찾기가 등록되었습니다.");
      } else {
        console.error('request failed');
      }
    }
  }

  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = onReadyStateChange;
  ajaxRequest.open('POST', '/bookmark');
  ajaxRequest.setRequestHeader('Content-Type', 'application/json');
  ajaxRequest.send(requestJson);

  return false;
}

function getBookmarkListRequest() {
  function onReadyStateChange(event) {
    const currentAjaxRequest = event.currentTarget;

    if (currentAjaxRequest.readyState === XMLHttpRequest.DONE) {
      if (currentAjaxRequest.status === 200) {
        const bookmarkListDom = document.querySelector('#bookmark-list');
        bookmarkListDom.innerHTML = '';

        const bookmarks = JSON.parse(currentAjaxRequest.responseText);
        bookmarks.forEach(bookmark => {
          const liNode = document.createElement('li');
          const textNode = document.createTextNode(bookmark.name + ' - ' + bookmark.url);
          liNode.appendChild(textNode);
          bookmarkListDom.appendChild(liNode);
        });
      } else {
        console.error('request failed');
      }
    }
  }

  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = onReadyStateChange;
  ajaxRequest.open('GET', '/bookmarks');
  ajaxRequest.send();
}