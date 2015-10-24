"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

  function Measure(value,type){
    this.value = value || 0;
    this.type = type || "S.I";
    this.getMeasure = function(){
      return this.value + this.type;
    }
  }

  function Temperature(value,type){
    Measure.call(this, value,type);
  }

  function Mass(value,type){
    Measure.call(this, value,type);
  }

  function Length(value,type){
    Measure.call(this, value,type);
  }

  function Surface(value){
    Measure.call(this, value,type);
  }

  function Volume(value){
    Measure.call(this, value,type);
  }

  function Celsius(value){
    this.type = 'c';
    Temperature.call(this, value, this.type);
    //Celsius	to Fahrenheit	ºF = ºC x 9/5 + 32
    this.toFarenheit = function(){
      return (this.value * (9/5)) + 32;
    }
    //Celsius to	Kelvin	K = ºC + 273.15
    this.toKelvin = function(){
      return (this.value + 273.15);
    }
  }

  function Farenheit(value){
    this.type = 'f';
    Temperature.call(this,value,this.type);
    //Fahrenheit to	Celsius	ºC = ( ºF - 32) * (5/9)
    this.toCelsius = function(){
      return (this.value - 32)  * (5/9);
    }
    //Fahrenheit to	Kelvin	K = ( ºF + 459.67) / 1.8
    this.toKelvin = function(){
      return (this.value + 459.67)  * (5/9);
    }
  }

  function Kelvin(value){
    this.type = 'k';
    Temperature.call(this,value,this.type);
    //Kelvin	Fahrenheit	ºF = K × 1.8 - 459.67
    this.toCelsius = function(){
      return (this.value * (9/5))  - 459.67;
    }
    //Kelvin to	Celsius	ºC = K – 273.15
    this.toFarenheit = function(){
      return (this.value -273.15);
    }
  }

  function Meter(value){
    this.type = 'm';
    Length.call(this,value,this.type);
    //Meter to	toKilometer
    this.toKilometer  = function(){
      return (this.value * 1000);
    }
    //Meter	to Centimeter
    this.toCentimeter = function(){
      return (this.value / 100);
    }
  }

  function Centimeter(value){
    this.type = 'cm';
    Length.call(this,value,this.type);
    //Centimeter to	Meter
    this.toMeter = function(){
      return (this.value * 1000);
    }
    //Centimeter to	Kilometer
    this.toKilometer = function(){
      return (this.value * 100000);
    }
  }

  function Kilometer(value){
    this.type = 'km';
    Length.call(this,value,this.type);
    //Kilometer to	Meter
    this.toMeter = function(){
      return (this.value / 1000);
    }
    //Kilometer to	Centimeter
    this.toCentimeter = function(){
      return (this.value / 100000);
    }
  }



  exports.Measure = Measure;
  exports.Temperature = Temperature;

  exports.Mass = Mass;
  exports.Length = Length;
  exports.Surface = Surface;
  exports.Volume = Volume;

  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.Meter = Meter;
  exports.Kilometer = Kilometer;
  exports.Centimeter = Centimeter;

  exports.calculate = function(){
    var value     = document.getElementById('original').value,
        result1  = document.getElementById('converted'),
        result2  = document.getElementById('converted2'),
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+(?:\.\d+)?)?)\s*(º?(f(arenheit)?|c(elsius)?)|(k(elvin)?)|(((c(enti)?)?|(k(ilo)?)?)?m(eter)?))\s*$/i;
        value     = value.match(regexp);

    if(value){
      var num = value[1];
      var type   = value[2].replace('º','').toLowerCase();
      num = parseFloat(num);

      if (type.substr(0) == 'c') {
        //Celsius	to Fahrenheit	ºF = ºC x 1.8 + 32
        var celsius = new Celsius(num);
        result1.innerHTML = celsius.toFarenheit().toFixed(6) + " Farenheit";

        //Celsius to	Kelvin	K = ºC + 273.15
        result2.innerHTML = celsius.toKelvin().toFixed(6) +" Kelvin"
        errorMsg.innerHTML = "";
      }

      else if (type.substr(0) == 'f'){
        //Fahrenheit to	Celsius	ºC = ( ºF - 32) / 1.8
        var farenheit = new Farenheit(num);
        result1.innerHTML = farenheit.toCelsius().toFixed(6) + " Celsius";

        //Fahrenheit to	Kelvin	K = ( ºF + 459.67) / 1.8
        result2.innerHTML = farenheit.toKelvin().toFixed(6) +" Kelvin"
        errorMsg.innerHTML = "";
      }

      else if (type.substr(0) == 'k'){
        //Kelvin	Fahrenheit	ºF = K × 1.8 - 459.67
        var kelvin = new Kelvin(num);
        result1.innerHTML = kelvin.toCelsius().toFixed(6) + " Farenheit";

        //Kelvin to	Celsius	ºC = K – 273.15
        result2.innerHTML = kelvin.toFarenheit().toFixed(6) + " Celsius";
        errorMsg.innerHTML = "";
      }

      else if (type.substr(0) == 'm'){
        //Meter	to Centimeter
        var meter = new Meter(num);
        result1.innerHTML = meter.toCentimeter().toFixed(6) + " Centimeter";

        //Meter	to Kilometer
        result2.innerHTML = meter.toKilometer().toFixed(6) + " Kilometer";
        errorMsg.innerHTML = "";
      }

      else if (type.substr(0) == 'cm'){
        //Centimeter	to Meter
        var centimeter = new Centimeter(num);
        result1.innerHTML = centimeter.toMeter().toFixed(6) + " Meter";

        //Centimeter	to Kilometer
        result2.innerHTML = centimeter.toKilometer().toFixed(6) + " Kilometer";
        errorMsg.innerHTML = "";
      }

      else if (type.substr(0) == 'km'){
        //Centimeter	to Meter
        var kilometer = new Kilometer(num);
        result1.innerHTML = kilometer.toMeter().toFixed(6) + " Meter";

        //Kilometer to Centimeter
        result2.innerHTML = kilometer.toCentimeter().toFixed(6) + " Centimeter";
        errorMsg.innerHTML = "";
      }


      else {
        var Measure = new Measure(num,type);
        converted.innerHTML = Measure.getMeasure();
      }
    }
    else
    errorMsg.innerHTML = "ERROR! Try something like :Temperature units :  '0 celsius,-2.3e-4kelvin, 32ºF, -45K, 3.4e2 c, -2.3e-4kelvin, '0 meter, -2.3m, 1Km, 45.3centimmeter, 3.4e2 cm, 2.3e-4km,..";

  }

})(this);


// umeros exponenciales(Transformar): http://tip.dis.ulpgc.es/numeros-texto/default.aspx
// Expresiones regulares(Graficamente) : http://regexper.com
// Expresiones regulares : http://www.arumeinformatica.es/blog/expresiones-regulares-conceptos-basicos/
//* : Busca el caracter precedente 0 (cero) o más veces.
//+ : Busca el caracter precedente 1 o más veces.
//? : Busca el caracter precedente 0 (cero) o 1 (una) vez.
