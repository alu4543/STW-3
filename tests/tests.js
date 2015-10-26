var expect = chai.expect;

describe("Temperature", function() {
 describe("Constructor", function() {
   it("should have a default type of International System of Units (S.I)", function() {
     var measure = new Measure();
     expect(measure.type).to.equal("S.I");
   });

   it("should have a default value", function() {
      var measure = new Measure();
      expect(measure.value).to.equal(0);
    });

    it("should set Measure type & value if provided", function() {
      var measure = new Measure(0,"unidad");
      expect(measure.type).to.equal("unidad");
    });

  });

  describe("Obects Convertion", function() {
    it("should not be converted an object Measure to Farenheit", function() {
      expect(function() {
        (new Measure()).toCelsius("0 farenheit");
      }).to.throw(Error);
    });

    it("should be converted an Temperature object to Farenheit", function() {
      var celsius = new Celsius(32);
      expect(celsius.toFarenheit).to.equal("0");
    });
  });

});
