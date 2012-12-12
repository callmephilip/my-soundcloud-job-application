require(['models/Section'],function(SectionData){

    describe('SectionData', function () {
        
        /*
          Section data module integrity check
        */
        describe('module', function () {
        
          it('is properly imported', function () {
            expect(SectionData).to.be.ok;
          });

          it('supports getAll() method', function () {
            expect(SectionData.getAll).to.be.ok
              .and.to.be.an.instanceof(Function);
          });

          it('supports getByKind() method', function () {
            expect(SectionData.getByKind).to.be.ok
              .and.to.be.an.instanceof(Function);
          });

          it('supports getCurrentSelection() method', function(){
            expect(SectionData.getCurrentSelection).to.be.ok
              .and.to.be.an.instanceof(Function);
          });

        });

        describe('#getAll()', function(){
          it('returns something',function(){
            expect(SectionData.getAll()).to.be.ok;
          });

          it('this something looks like a Backbone collection', function(){
            expect(SectionData.getAll()).to.have.property('models');
          });
        });
    });

});
