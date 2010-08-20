die = function(sides) {
   this.sides = sides;
   this.result = 0;

   this.roll = function() {
      if(this.result == 0) {
         this.result = Math.floor(Math.random() * this.sides + 1);
      } else {
         return false;
      }
   }
}

diegroup = function(count, sides) {
   this.sides = sides;
   this.count = count;
   this.name = "d" + this.sides;

   this.dice = [];

   this.roll = function() {
      for(var i=0; i<this.count; i++) {
         this.dice[i] = new die(this.sides);
         this.dice[i].roll();
      }
   }

   this.result = function() {
      return this.dice;
   }

   this.sum = function() {
      var sum = 0;
      for(var i=0; i<this.dice.length; i++){
         sum += this.dice[i].result;
      } 
      return sum;
   }

   this.min = function() {
      return this.count;
   }

   this.max = function() {
      return this.sides * this.count;
   }
}

roll = function (in_roll) {
   this.groups = new Array();
   this.mods = new Array();
   this.input = "";

   this.g = function(input) {
      input = input.val().replace(/ /g,"").replace(/-(\d+)/, "+(-$1)").replace(/\+\+/g,"+");
      this.name = input;
      input = input.split("+");
      for(var i=0;i<input.length;i++){
         if(input[i].indexOf('d') > -1) {
            parts = input[i].split('d');
            var j = this.groups.length;
            console.log(j);
            if(parts[0] === null || parts[0] === "") parts[0] = 1;
            this.groups[j] = new diegroup(parts[0], parts[1]); 
            this.groups[j].roll();
         } else {
            console.log(input[i]);
            var k = this.mods.length;
            console.log(k);
            this.mods[k] = input[i]; 
            console.log(this.mods);
         }
      }
   }; this.g(in_roll);

   this.roll = function() {
      for(var i=0; i<this.groups.length; i++) {
         this.groups[i].roll();
      }
   }

   this.result = function() {
      var rollgroups = new Array();
      for(var i=0; i<this.groups.length; i++) {
         rollgroups.push(this.groups[i].result());
      }
      return rollgroups;
   }

   this.min = function() {
      var sum = 0;
      for(var i=0; i<this.groups.length; i++) {
         sum += this.groups[i].min();
      }
      return sum;
   }

   this.max = function() {
      var sum = 0;
      for(var i=0; i<this.groups.length; i++) {
         sum += this.groups[i].max();
      }
      return sum;
   }

   this.subtotal = function() {
      var sum = 0;
      for(var i=0; i<this.groups.length; i++){
         sum += this.groups[i].sum();
      } 
      return sum;
   }
   this.sum = function() {
      var sum = this.subtotal();
      for(var i=0; i<this.mods.length; i++){
         sum = parseInt(sum) + parseInt(this.mods[i]);
      } 
      return sum;
   }
}


