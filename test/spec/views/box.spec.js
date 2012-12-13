require(['jquery','underscore','views/Box','models/Section'],function($,_,Box,SectionData){

  describe("Box View", function(){

    describe("module", function(){
      it('exports Box view', function(){
        expect(Box).to.be.ok;
      });
    });

    describe("#render()", function(){
      var view, kind = 'fun';  

      beforeEach(function(){
        view = new Box({kind : kind});
      });

      it('returns DOM element', function(){
        expect(view.render()).to.be.ok;
      });

      it('returns 6 divs with class set to face', function(){
        expect($(view.render()).find('div.face').length).to.be.eql(6);
      });
    });

    describe("events", function(){
      var view, kind = 'fun', section;

      beforeEach(function(){
        view = new Box({kind : kind});
        _.each(SectionData.getAll().models, function(s){
          s.deselect();
        });
        section = SectionData.getByKind(kind);
        
        $("#sandbox").append(view.render());
      });

      afterEach(function(){
        $("#sandbox").html("");
      });

      it('clicking on of the box faces tiggers section selection', function(done){
        section.on('change', function(section){
          expect(section.get('isSelected')).to.be.true;
          done();
        });

        $("div.face").first().trigger('click');
      });

    });

  });

});