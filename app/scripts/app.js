define(['jquery','underscore','backbone','handlebars', "models/Section", 'text!templates/application.html','tyler'],
    function($,_,Backbone,Handlebars,Sections,applicationTemplate) {

            var ApplicationView = Backbone.CompositeView.extend({
                template : Handlebars.compile(applicationTemplate),
            });

            $(document).ready(function(){
                if($('#mocha').length === 0){
                    $('body').prepend(
                        new ApplicationView().render()
                    );
                }
            });
});
