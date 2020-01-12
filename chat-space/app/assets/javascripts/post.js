$(function() {

  // console.log(last_message_id);
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
      return html;
    };
  }
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
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/posts",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});
