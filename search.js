const urlParams = new URLSearchParams(window.location.search);
const searchKeyword = urlParams.get('query');
console.log(searchKeyword);