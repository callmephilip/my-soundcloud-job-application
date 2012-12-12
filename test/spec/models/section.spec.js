require(['underscore','models/Section'],function(_,SectionData){

    describe('SectionData', function () {
        
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

        });

        describe('#getAll()', function(){
   
          var supportedSectionKinds = ["studies","work","projects","skills","fun","future"],
              sections;

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
    });

});