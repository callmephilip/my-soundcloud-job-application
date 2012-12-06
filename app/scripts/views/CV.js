define(['jquery','underscore','backbone','handlebars','models/Section','text!templates/cv.html','tyler'], 
	function($,_,Backbone,Handlebars,Sections,cvTemplate) {

		var CV = Backbone.CompositeView.extend({
			template : Handlebars.compile(cvTemplate),

			events: {
	        	"click .close-btn" : "deselectCurrentSelection"
		    },

			initialize : function(){

	            document.addEventListener('keydown', _.bind(function(e) {
	            	if(e.keyCode === 27) { //ESC
						this.deselectCurrentSelection();
	            	}
	            },this), false);

				Sections.getAll().on("change", function(section){
					if(section.get("isSelected") === true){
						this.displayCV(section.get('kind'));
					}else{
						this.hideCV();
					}
				}, this);

				this.delegateEvents(this.events);
			},

			deselectCurrentSelection : function(){
				var currentSelection = Sections.getCurrentSelection();
				if(typeof currentSelection !== 'undefined'){
					currentSelection.deselect();
				}
			},


			displayCV : function(kind){
				setTimeout(_.bind(function(){

					$(this.el).find(".content").hide();
	                $(this.el).find("." +  kind).show();
	                $("#cv").removeClass("hidden");

	                setTimeout(_.bind(function(){
	              		$("#cv").addClass("docked");
	              	},this), 1000);

				},this),1000);
			},

			hideCV : function(){
				$("#cv").addClass("hidden");
			}
		});

		return CV;
	}
);