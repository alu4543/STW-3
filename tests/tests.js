var expect = chai.expect,
    should = chai.should();

describe("Measure Units Converter", function() {
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(window.console, "log");
    sandbox.stub(window.console, "error");
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe("Constructor", function() {
    it("Constructor : should have a default type of measure object created", function() {
      var measure = new Measure();
      expect(measure.type).to.equal("S.I");
    });

   it("Constructor : should have a default value of measure object created", function() {
      var measure = new Measure();
      expect(measure.value).to.equal(0);
    });

    it("Constructor : should set Measure type if provided", function() {
      var measure = new Measure(0,"unidad");
      expect(measure.type).to.equal("unidad");
    });

    it("Constructor : should set Measure value if provided", function() {
      var measure = new Measure(100,"unidad");
      expect(measure.value).to.equal(100);
    });

    it("Constructor : should have a default value of Temperature object created", function() {
      var temperature = new Temperature();
      expect(temperature.value).to.equal(0);
    });

    it("Constructor : should have a default value of Celsius object created", function() {
      var celsius = new Celsius();
      expect(celsius.value).to.equal(0);
    });

    it("Constructor : should have a default value of Kelvin object created", function() {
      var kelvin = new Kelvin();
      expect(kelvin.value).to.equal(0);
    });

    it("Constructor : should have a default value of Farenheit object created", function() {
      var farenheit = new Farenheit();
      expect(farenheit.value).to.equal(0);
    });
  });

  describe("Measure Objects Convertion", function() {
    it("Measure Objects : should not be converted an Abstract Measure object to Farenheit", function() {
      expect(function() {
        (new Measure(0)).toFarenheit();
      }).to.throw(Error);
    });

    it("Measure Objects : should not be converted an Abstract Temperature object to Farenheit", function() {
      expect(function() {
        (new Temperature(0)).toFarenheit();
      }).to.throw(Error);
    });

    it("Measure Objects : the 'type' attribute must be a String", function() {
      var temperature = new Temperature(0,'c');
      expect(temperature.type).to.be.a('string');
    });

    it("CMeasure Objects : celsius type must be equal to 'c'", function() {
      var celsius = new Celsius(0);
      celsius.should.have.property('type').equal('c');
    });

    it("Measure Objects : farenheit type must be equal to 'f'", function() {
      var celsius = new Farenheit(0);
      celsius.should.have.property('type').equal('f');
    });

    it("Measure Objects : kelvin type must be equal to 'k'", function() {
      var celsius = new Kelvin(0);
      celsius.should.have.property('type').equal('k');
    });

    it("Measure Objects : should be converted an Celsius object to Farenheit : \t 0 Celsius = 32 Farenheit", function() {
      var temperature = new Celsius(0);
      temperature.toFarenheit().should.equal(32);
    });

    it("Measure Objects : should be converted an Celsius object to Kelvin : \t  0 Celsius = 273.15 Kelvin", function() {
      var temperature = new Celsius(0);
      temperature.toKelvin().should.equal(273.15);
    });

    it("Measure Objects : should be converted an Farenheit object to Celsius : \t 32 Farenheit = 0 Celsius", function() {
      var temperature = new Farenheit(32);
      temperature.toCelsius().should.equal(0);
    });

    it("Measure Objects : should be converted an Farenheit object to Kelvin : \t 32 Farenheit = 273.15 Kelvin", function() {
      var temperature = new Farenheit(32);
      temperature.toKelvin().should.equal(273.15000000000003);
    });

    it("Measure Objects : should be converted an Kelvin object to Celsius : \t 273.15 Kelvin = 32 Celsius", function() {
      var temperature = new Kelvin(273.15);
      temperature.toCelsius().should.equal(31.999999999999943);
    });

    it("Measure Objects : should be converted an Kelvin object to Farenheit : \t 273.15 Kelvin = 0 Farenheit", function() {
      var temperature = new Kelvin(273.15);
      temperature.toFarenheit().should.equal(0);
    });

  });

  describe("Length Objects Convertion", function() {
    it("should not be converted an Abstract Length object to Meter", function() {
      expect(function() {
        (new Length(0)).toMeter();
      }).to.throw(Error);
    });

    it("Length Objects : The 'value' attribute must be a Number", function() {
      var length = new Length(0,'m');
      expect(length.value).to.be.a('Number');
    });

    it("Length Objects : The 'type' attribute must be a String", function() {
      var length = new Length(0,'m');
      expect(length.type).to.be.a('string');
    });

    it("Length Objects : should be converted a Meter object to Centimeter : \t 1 Meter = 100 Centimeter", function() {
      var meter = new Meter(1);
      meter.toCentimeter().should.equal(100);
    });

    it("Length Objects : should be converted a Meter object to Kilometer : \t 1 Meter = 1000 Kilometer", function() {
      var meter = new Meter(1);
      meter.toKilometer().should.equal(0.001);
    });

    it("Length Objects : should be converted a Kilometer object to Meter : \t 1 Kilometer = 1000 Meter", function() {
      var kilometer = new Kilometer(1);
      kilometer.toMeter().should.equal(1000);
    });

    it("Length Objects : should be converted a Kilometer object to Centimeter : \t 1 Kilometer = 100000  Centimeter", function() {
      var kilometer = new Kilometer(1);
      kilometer.toCentimeter().should.equal(100000);
    });

    it("Length Objects : should be converted an Centimeter object to Meter : \t 1 Centimeter = 0.001 Centimeter", function() {
      var centimeter = new Centimeter(1);
      centimeter.toMeter().should.equal(0.001);
    });

    it("Length Objects : should be converted an Centimeter object to Farenheit : \t 1 Centimeter = 100000 Kilometer", function() {
      var centimeter = new Centimeter(1);
      centimeter.toKilometer().should.equal(0.00001);
    });

  });

  describe("HTML UI", function() {

    it("HTML UI : should print error message if no correct parameteres is passed in ",function() {
      original.value = "0unit";
      calculate();
      expect(converted.innerHTML).to.equal("ERROR! Try something like  0 celsius,-2.3e-4kelvin, 32ºF, -45K, 3.4e2 c, -2.3e-4kelvin, 0 meter, -2.3m, 1Km, 45.3centimmeter, 3.4e2 cm, 2.3e-4km,..");
      expect(converted2.innerHTML).to.equal("ERROR! Try something like  0 celsius,-2.3e-4kelvin, 32ºF, -45K, 3.4e2 c, -2.3e-4kelvin, 0 meter, -2.3m, 1Km, 45.3centimmeter, 3.4e2 cm, 2.3e-4km,..");
    });


    it("HTML UI : 0c will = 32 Farenheit = 273.15 Kelvin",function(){
      original.value = "0c";
      calculate();
      expect(converted.innerHTML).to.equal("32.000000 Farenheit");
      expect(converted2.innerHTML).to.equal("273.150000 Kelvin");
    });

    it("HTML UI : 32f will = 0 Celsius = 273.15 Kelvin",function(){
      original.value = "32f";
      calculate();
      expect(converted.innerHTML).to.equal("0.000000 Celsius");
      expect(converted2.innerHTML).to.equal("273.150000 Kelvin");
    });

    it("HTML UI : 273.15k will = 32.000000 Farenheit = 0.000000 Celsius",function(){
      original.value = "273.15k";
      calculate();
      expect(converted.innerHTML).to.equal("32.000000 Farenheit");
      expect(converted2.innerHTML).to.equal("0.000000 Celsius");
    });

    it("HTML UI : 1m will = 100 Centimeter = 0.001 Kilometer",function() {
      original.value = "1m";
      calculate();
      expect(converted.innerHTML).to.equal("100.000000 Centimeter");
      expect(converted2.innerHTML).to.equal("0.001000 Kilometer");
    });

    it("HTML UI : 1km will = 1000 Centimeter = 0.200000 Kilometer",function() {
      original.value = "1km";
      calculate();
      expect(converted.innerHTML).to.equal("1000.000000 Meter");
      expect(converted2.innerHTML).to.equal("100000.000000 Centimeter");
    });

    it("HTML UI : 1cm will = 0.001000 Meter = 0.000010 Kilometer",function() {
      original.value = "1cm";
      calculate();
      expect(converted.innerHTML).to.equal("0.001000 Meter");
      expect(converted2.innerHTML).to.equal("0.000010 Kilometer");
    });


  });


  describe("Errors & Logs", function() {

    it("Errors & Logs : should log parameters passed to GetMeasure()", function() {
      (new Temperature(2,'c')).getMeasure();

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, "The Mesure is 2c");
    });

    it("Errors & Logs : should throw if no parameteres is passed in ", function() {
      (new Temperature()).getMeasure();
      sinon.assert.calledWithExactly(console.error, "Data missing");
    });

    it("Errors & Logs : should log Celsius toFarenheit()", function() {
      var farenheit = (new Celsius(0).toFarenheit());

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, "Converted_1 is 32 Farenheit");
    });
    it("Errors & Logs : should log Celsius toFarenheit()", function() {
      var kelvin = (new Celsius(0).toKelvin());

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, "Converted_2 is 273.15 Kelvin");
    });

    it("Errors & Logs : should log Kilometer toMeter()", function() {
      var meter = (new Kilometer(1)).toMeter();

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, "Converted_1 is 1000 Meter");

    });
    it("Errors & Logs : should log Kilometer toCentimeter()", function() {
      var centimeter = (new Kilometer(1)).toCentimeter();

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, "Converted_2 is 100000 Centimeter");
    });

  });

  });
