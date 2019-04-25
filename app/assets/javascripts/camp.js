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

    $(document).on('click', ".show_link", function(event) {
      event.preventDefault()
      $('#app-container').html('')
      let id = $(this).attr('data-id')
      fetch(`/camps/${id}.json`)
      .then(response => response.json())
      .then(camp => {
        let newCamp = new Camp(camp)
        let campHtml = newCamp.formatShow()
        $('#app-container').append(campHtml)
      })
    })


    $('#new_camp_form').on("submit", function(event) {
      event.preventDefault()

      const values = $(this).serialize()

      $.post("/camps", values).done(function(data) {
        $('#app-container').html('')
        const newCamp = new Camp(data)
        const htmlToAdd = newCamp.formatShow()
        $('#app-container').html(htmlToAdd)
      })
    })
  }


  function Camp(camp) {
    this.id = camp.id
    this.name = camp.name
    this.description = camp.description
    this.location = camp.location
  }


  Camp.prototype.formatIndex = function() {
    let campsHtml = `
      <h3 style="font-weight:500;">${this.location}</h3>
      <p>
      <strong>
        <a href="/camps/${this.id}" data-id="${this.id}" class="show_link">${this.name}</a>
      </strong>
      <br>
      <br>
      ${this.description}
      <br>
      <br>
      <br>
      </p>
    `
    return campsHtml;
  };


  Camp.prototype.formatShow = function() {
    let campHtml = `
      <h2>${this.name}</h2>
      <br>
      <div>
      <h3>${this.location}</h3>
      ${this.description}
      </div>

    `
    return campHtml;
  };

}
