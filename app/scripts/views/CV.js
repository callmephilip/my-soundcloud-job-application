define(['jquery','underscore','backbone','handlebars','models/Section','text!templates/cv.html','tyler'],
    function($,_,Backbone,Handlebars,Sections,cvTemplate) {

        var CV = Backbone.CompositeView.extend({
            template : Handlebars.compile(cvTemplate),

            events: {
                "click .close-btn" : "deselectCurrentSelection"
            },

            initialize : function(){

                $(document).keydown(_.bind(function(e) {
                    if(e.keyCode === 27) { //ESC
                        this.deselectCurrentSelection();
                    }
                }, this));


                Sections.getAll().on("change", function(section){
                    if(section.get("isSelected") === true){
                        this.displayCV(section.get('kind'));
                    }else{
                        this.hideCV();
                    }
                }, this);
            },

            deselectCurrentSelection : function(){
                var currentSelection = Sections.getCurrentSelection();
                if(typeof currentSelection !== 'undefined'){
                    currentSelection.deselect();
                }
            },


            displayCV : function(kind){
                _.delay(function(context){
                    $(context.el).find(".content").hide();
                    $(context.el).find("." +  kind).show();
                    $("#cv").removeClass("hidden");

                    _.delay(function(){ $("#cv").addClass("docked"); }, 1000);

                },1000,this);
            },

            hideCV : function(){
                $("#cv").addClass("hidden");
            }
        });

        return CV;
    }
);
