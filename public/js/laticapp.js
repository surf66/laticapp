$(document).ready(function() {

  $.ajax({
    url: "/tweets",
    context: document.body
  }).done(function(data) {
    console.log(data);
    renderHandlebarsTemplate('templates/tweets.handlebars', '#results', data);
  });

  function renderHandlebarsTemplate(withTemplate, inElement, withData){
    getTemplateAjax(withTemplate, function(template) {
      $(inElement).html(template(withData));
    });
  };

  function getTemplateAjax(path, callback) {
    var source, template;
    $.ajax({
      url: path,
      success: function (data) {
        source = data;
        template = Handlebars.compile(source);
        if (callback) callback(template);
      }
    });
  }
});
