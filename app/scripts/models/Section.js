define(['jquery','underscore','backbone'], 
	function($,_,Backbone) {
	
		var Section = Backbone.Model.extend({
			defaults: {
				isSelected : false
			},

			select : function(){
				this.set({isSelected:true});
			},

			deselect : function(){
				this.set({isSelected:false});
			},

			validate: function(attrs) {
				if(typeof this.collection !== 'undefined'){
					if(!this.get('isSelected')){
						if(attrs.isSelected){
							if(_.filter(this.collection.models, function(m){ return m.get('isSelected'); }).length !== 0){
								return 'Attempt to select multiple sections';
							}
						}
					}
				}
			}
		});

		var SectionCollection = Backbone.Collection.extend({
			model : Section
		});


		var __sections = new SectionCollection([
			new Section({ kind : "studies" }),
			new Section({ kind : "work" }),
			new Section({ kind : "projects" }),
			new Section({ kind : "skills" }),
			new Section({ kind : "fun" }),
			new Section({ kind : "future" })
		]);

		return{

			Section : Section,
			SectionCollection : SectionCollection,

			getAll : function(){
				return __sections;
			},

			getByKind : function(kind){
				return _.find(__sections.models, function(s){
					return s.get("kind") === kind;
				});
			},

			getCurrentSelection : function(){
				return _.find(__sections.models, function(s){
					return s.get("isSelected") === true;
				});	
			} 
		};

	}
);