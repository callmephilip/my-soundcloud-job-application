define(['backbone','handlebars',

    'text!templates/sections/studies.html',
    'text!templates/sections/work.html',
    'text!templates/sections/projects.html',
    'text!templates/sections/skills.html',
    'text!templates/sections/fun.html',
    'text!templates/sections/future.html'

    ],
    function(
        Backbone,Handlebars,
        studiesTemplate,
        workTemplate,
        projectsTemplate,
        skillsTemplate,
        funTemplate,
        futureTemplate

    ) {

        var kindToTemplate = {
            studies : studiesTemplate,
            work : workTemplate,
            projects : projectsTemplate,
            skills : skillsTemplate,
            fun : funTemplate,
            future : futureTemplate
        };

        var Section = Backbone.View.extend({
            initialize : function(attributes){
                attributes = attributes || {};

                if(typeof attributes.kind === 'undefined'){
                    throw new Error('missing section kind');
                }

                if(typeof kindToTemplate[attributes.kind] === 'undefined'){
                    throw new Error('invalid section kind : ' + attributes.kind);
                }

                this.template = Handlebars.compile(kindToTemplate[attributes.kind]);
            },

            render : function(){
                this.el = jQuery(this.template());
                return this.el;
            }
        });

        return Section;
    }
);
