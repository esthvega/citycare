document.addEventListener('DOMContentLoaded', function() {
    console.log('hi')
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });