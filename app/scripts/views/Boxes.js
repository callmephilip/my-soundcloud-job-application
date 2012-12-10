define(['jquery','underscore','backbone','handlebars','text!templates/boxes.html','tyler'], 
	function($,_,Backbone,Handlebars,boxesTemplate) {

		var Boxes = Backbone.CompositeView.extend({
			template : Handlebars.compile(boxesTemplate),
			className : "initial-stage-view",  
            tagName: "ul"
		});

		return Boxes;
	}
);