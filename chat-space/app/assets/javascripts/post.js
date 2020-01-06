$(function() {
  function buildHTML(post) {
    if (post.image) {
      var html =
        `<div class="message" data-post-id=${post.id}>
          <div class="message__upper-info">
            <div class="message__upper-info__user">
              ${post.user_name}
            </div>
            <div class="message__upper-info__date">
              ${post.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="message__text">
              ${post.text}
            </p>
          </div>
          <img src=${post.image}>
        </div>`
        // console.log("aa")
      return html;
    }  else {
        var html =
        `<div class="message" data-post-id=${post.id}>
          <div class="message__upper-info">
            <div class="message__upper-info__user">
              ${post.user_name}
            </div>
            <div class="message__upper-info__date">
              ${post.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="message__text">
              ${post.text}
            </p>
          </div>
        </div>`
        console.log(post.text)
      return html;
    };
  }
  $('#new_post').on('submit', function(e){
    // console.log('#new_post')
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
  .done(function(data) {
    var html = buildHTML(data);
    // console.log(data);
    $('.message').append(html);
    $('form')[0].reset();
  })
})
})
