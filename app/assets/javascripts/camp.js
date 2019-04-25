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
        $('#app_container').html('')
        camps.forEach(camp => {
          let newCamp = new Camp(camp)
          let campHtml = newCamp.formatIndex()
          $('#app_container').append(campHtml)
      })
    })
  })

    $(document).on('click', ".show_link", function(event) {
      event.preventDefault()
      $('#app_container').html('')
      let id = $(this).attr('data-id')
      history.pushState(null, null, `camps/${id}`);
      fetch(`/camps/${id}.json`)
      .then(response => response.json())
      .then(camp => {
        let newCamp = new Camp(camp)
        let campHtml = newCamp.formatShow()
        $('#app_container').append(campHtml)
      })
    })


    $('#new_camp_form').on("submit", function(event) {
      event.preventDefault()
      $('#app_container').html('')

      const values = $(this).serialize()

      $.post("/camps", values).done(function(data) {
        const newCamp = new Camp(data)
        const htmlToAdd = newCamp.formatShow()
        $('#app_container').append(htmlToAdd)
      })
    })
  }

// for the activities show link in a Camp view
  $(document).on('click', ".show_activities_link", function(event) {
    event.preventDefault()
    $('#app_container').html('')
    let id = $(this).attr('data-id')
    history.pushState(null, null, `camps/${id}/activities`);
    fetch(`/camps/${id}/activities.json`)
    .then(response => response.json())
    .then(activities => {
      $('#app_container').html('')
      activities.forEach(activity => {
        let newActivity = new Activity(activity)
        let activityHtml = newActivity.formatIndex()
        $('#app_container').append(activityHtml)
      })
    })


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
      <p style="text-align:center;">
        <a href="/camps/${this.id}/activities" data-id="${this.id}" class="show_activities_link">View ${this.name} Activities</a>
      </p>

    `
    return campHtml;
  };
