define(['jquery','underscore','backbone','handlebars', 'models/Section', 'text!templates/box.html'], 
    function($, _, Backbone, Handlebars, Sections, boxTemplate) {

        var Box = Backbone.View.extend({
            template : Handlebars.compile(boxTemplate),

            events : {
                "click .face" : "onFaceClicked"
            }, 

            initialize : function(attributes){
                this.kind = attributes.kind;
                this.section = Sections.getByKind(this.kind);
                this.section.on("change", function(section){
                    if(section.get("isSelected") !== true){
                        this.restoreBox();
                    } else {
                        this.unwrapBox();
                    }                                        
                }, this);
            },

            box : function(){
                return $(this.el).parent();
            },

            unwrapBox : function(){
                this.box().removeClass("moving").addClass("pull-down");
                _.delay(function(context){ context.box().addClass("unwrap"); }, 700, this);
            },

            restoreBox : function(){
                this.box().removeClass("pull-down");
                _.delay(function(context){ context.box().removeClass("unwrap").addClass("moving"); }, 500, this);
            },

            onFaceClicked : function(e){
                this.section.select();
            },

            render : function(){
                $(this.el).html(
                    this.template({ kind:this.kind, faces : [1,2,3,4,5,6]})
                );
                return this.el;
            } 
        });

        return Box;
    }
);