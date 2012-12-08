define(['jquery','underscore','backbone','handlebars', "models/Section", 'text!templates/side-panel.html'], 
	function($,_,Backbone,Handlebars, Sections, sidePanelTemplate) {

		var SidePanel = Backbone.View.extend({
			template : Handlebars.compile(sidePanelTemplate),

			initialize : function(){
				Sections.getAll().on("change", function(section){
					if(section.get("isSelected") === true){
						setTimeout(function(){
                        	$("aside").addClass("solid");  
                      	},1000);
					}else{
						setTimeout(function(){
		                  $("aside").removeClass("solid");
		                },1000);
					}
				}, this);
			},

			render : function(){
				this.el = jQuery(this.template());
      			return this.el;	
			} 
		});

		return SidePanel;
	}
);