define(['jquery','underscore','backbone','handlebars', 'models/Section', 'text!templates/boxes.html'], 
	function($,_,Backbone,Handlebars, Sections, boxesTemplate) {

		var Boxes = Backbone.View.extend({
			template : Handlebars.compile(boxesTemplate),
			
			className : "initial-stage-view",  
			tagName: "ul",
            id : "stage",

			events : {
				"click .face" : "onFaceClicked"
			},

			initialize : function(){
				Sections.getAll().on("change", function(section){
					if(section.get("isSelected") !== true){
						$(".cube").removeClass("pull-down");

						setTimeout(function(){
							$(".cube").removeClass("unwrap").addClass("moving");
						},500);
					}
				}, this);
			},

			onFaceClicked : function(e){
				
				var cube = $(e.target).parent();
                var category = cube.attr("data-rel");

                var section = Sections.getByKind(category);

                if(typeof section === 'undefined'){
                	throw new Error("Invalid section kind: " + category);
                }
                
                section.select();

                cube.removeClass("moving").addClass("pull-down");
               
                setTimeout(function(){
                  cube.addClass("unwrap");
                },700);
			},

			render : function(){
				$(this.el).html(this.template());
      		  	return this.el;	
			} 
		});

		return Boxes;
	}
);