$(document).ready(function() {

  $.ajax({
    url: "/tweets",
    context: document.body
  }).done(function(data) {
    renderHandlebarsTemplate('templates/tweets.handlebars', '#results', data);
  });

  $.ajax({
    url: "/fixtures",
    context: document.body
  }).done(function(data) {
    displayFixtures(data);
  });

  Handlebars.registerHelper('noop', function(options) {
    var text = this.text;
    var t2 = text.replace(/(http|https)(:\/\/)([^ ]+)/ig, '<a href="$1$2$3">$1$2$3</a>' );
    t2 = t2.replace(/@([^ :]+)/gi,'<a href="http://twitter.com/$1" target="_blank">@$1</a>');
    t2 = t2.replace(/#([^ :]+)/gi,'<a href="http://twitter.com/search?q=%23$1" target="_blank">#$1</a>');
    return t2;
  });

  Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).startOf('hour').fromNow();
  });

  function displayFixtures(fixtures) {
    fixtures.sort(function(a,b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    });

    var nextFixture = fixtures[0];
    renderHandlebarsTemplate('templates/next-fixture.handlebars', '#next-fixture', nextFixture);
  }

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
