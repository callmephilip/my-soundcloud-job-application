define(['backbone','handlebars','text!templates/boxes.html','tyler'],
    function(Backbone,Handlebars,boxesTemplate) {

        var Boxes = Backbone.CompositeView.extend({
            template : Handlebars.compile(boxesTemplate),
            className : "initial-stage-view",
            tagName: "ul"
        });

        return Boxes;
    }
);
