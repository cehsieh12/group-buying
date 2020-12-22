(function () {
  window.addEventListener('load', event => {
    // Add animation to groupLisst
    const groupList = document.querySelectorAll('.group-list .animated')
    groupList.forEach(group => {
      // remove animation tags when animation ends
      group.addEventListener('animationend', event => {
        group.classList.remove('animated', 'bounceInUp')
      })
    })
  })
})()