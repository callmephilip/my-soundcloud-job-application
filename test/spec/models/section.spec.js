require(['underscore','models/Section'],function(_,SectionData){

    describe('SectionData', function () {
        
        var supportedSectionKinds = ["studies","work","projects","skills","fun","future"],
            invalidSectionKind = 'gibberish';

        /*
          Section data module integrity check
        */
        describe('module', function () {
        
          it('is properly imported', function () {
            expect(SectionData).to.be.ok;
          });

          it('supports getAll() method', function () {
            expect(SectionData).respondTo('getAll');
          });

          it('supports getByKind() method', function () {
            expect(SectionData).respondTo('getByKind');
          });

          it('supports getCurrentSelection() method', function(){
            expect(SectionData).respondTo('getCurrentSelection');
          });

          it('exports Section model class', function(){
            expect(SectionData.Section).to.be.ok;
          });

          it('exports Section collection class', function(){
            expect(SectionData.SectionCollection).to.be.ok;
          });

        });

        describe('#getAll()', function(){
   
          var sections;

          beforeEach(function(){
            sections = SectionData.getAll(); 
          });

          it('returns something',function(){
            expect(sections).to.be.ok;
          });

          it('returns something with models property set', function(){
            expect(sections).to.have.property('models');
          });

          it('returns 6 items inside models property', function(){
            expect(sections).to.have.deep.property('models.length',6);
          });

          it('returns models with kind attribute set', function(){
            expect(sections).to.satisfy(function(c){
              return typeof _.find(c.models, function(m){
                return typeof m.get('kind') == 'undefined';
              }) === 'undefined';
            });
          });

          it('returns models with 6 distinct kinds: ' + supportedSectionKinds, function(){
            expect(sections).to.satisfy(function(c){
              return _.intersection(supportedSectionKinds,
                _.map(c.models, function(m){ return m.get("kind"); }) 
              ).length == supportedSectionKinds.length; 
            });
          });

        });

        describe('#getByKind()', function(){

          it('returns nothing if kind is not passed', function(){
            expect(SectionData.getByKind()).to.be.not.ok;
          });

          it('returns nothing for invalid kind', function(){
            expect(SectionData.getByKind(invalidSectionKind)).to.be.not.ok;
          });

          it('retruns something if kind is one of these: ' + supportedSectionKinds, function(){
            _.each(supportedSectionKinds, function(kind){
              expect(SectionData.getByKind(kind)).to.be.ok;
            });
          });          

          it('returns a model with a proper kind for each of these: ' + supportedSectionKinds, function(){
            _.each(supportedSectionKinds, function(kind){
              expect(SectionData.getByKind(kind)).to.satisfy(function(m){
                return m.get('kind') === kind;
              });
            });
          });

        });

        describe('#getCurrentSelection()', function(){

          it('returns nothing when no section is selected', function(){
            expect(SectionData.getCurrentSelection()).to.be.not.ok;
          });

          it('returns something when a section is selected', function(){
            SectionData.getByKind('fun').select(); 
            expect(SectionData.getCurrentSelection()).to.be.ok;
          });

          it('returns a selected section', function(){
            var s = SectionData.getByKind('fun');
            s.select(); 
            expect(SectionData.getCurrentSelection()).to.be.eql(s);
          });

        });

        describe('Section model', function(){

          it('supports select operation', function(){
            expect(new SectionData.Section().select).to.be.ok;
          });

          it('supports deselect operation', function(){
            expect(new SectionData.Section().deselect).to.be.ok;
          });

          it('is not selected by default', function(){
            expect(new SectionData.Section().get("isSelected")).to.be.false;
          });

          it('is selected once select() is called', function(){
            var s = new SectionData.Section();
            s.select();
            expect(s.get("isSelected")).to.be.true;
          });

          it('is not selected once deselect() is called', function(){
            var s = new SectionData.Section();
            s.select(); s.deselect();
            expect(s.get("isSelected")).to.be.false;
          });

        });

    });
});