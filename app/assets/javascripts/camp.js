$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {

  $('#all_camps').on('click', function (event) {
    event.preventDefault()
    history.pushState(null, null, "camps");
    fetch('/camps.json')
      .then(response => response.json())
      .then(camps => {
        $('#app-container').html('')
        camps.forEach(camp => {
          let newCamp = new Camp(camp)
          let campHtml = newCamp.formatIndex()
          $('#app-container').append(campHtml)
      })
    })
  })

}
