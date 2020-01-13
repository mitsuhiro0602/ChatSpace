$(function() {
  var buildHTML = function(post) {
    if (post.text && post.image) {
      var html = `<div class="message" data-message-id= ` + post.id + `>` +
        `<div class="message__upper-info">` +
            `<div class="message__upper-info__user">` +
              post.user_name +
            `</div>` +
            `<div class="message__upper-info__date">` +
              post.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="message__text">` +
              post.text +
            `</p>` +
            `<img src="` + post.image + `" class="lower-message__image">` +
          `</div>` +
        `</div>`
  } else if (post.text) {
    var html = `<div class="message" data-message-id= ` + post.id + `>` +
      `<div class="message__upper-info">` +
          `<div class="message__upper-info__user">` +
            post.user_name +
          `</div>` +
          `<div class="message__upper-info__date">` +
            post.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="message__text">` +
            post.text +
          `</p>` +
        `</div>` +
      `</div>`
  } else if (post.image) {
    var html = `<div class="message" data-message-id= ` + post.id + `>` +
      `<div class="message__upper-info">` +
          `<div class="message__upper-info__user">` +
            post.user_name +
          `</div>` +
          `<div class="message__upper-info__date">` +
            post.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + post.image + `" class="lower-message__image">` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('#new_post').on('submit', function(e){
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
    $('.messages').append(html);
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $(".submit-btn").prop('disabled', false);
  })
  .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
  var reloadMessages = function() {
    var last_message_id = $('.messages .message:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/posts",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(posts){
console.log(posts)
      if (posts.length !== 0) {
        var insertHTML = '';
        $.each(posts, function(i, post) {
          insertHTML += buildHTML(post)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_post")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/posts/)) {
  setInterval(reloadMessages, 7000);
  }
});
