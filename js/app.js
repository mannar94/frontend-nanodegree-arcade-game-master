    //Enemies our player must avoid
    var Enemy = function(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
         this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    };
    
    var countscore=0;
    var ls=1;
    var levelcount=0;

    // Function that cheeck if Vehicle-player collisions happen &&  resets the game
    function collision() {
        var dist=35;
               for(var i=0;i<allEnemies.length;i++){
           if ((allEnemies[i].x) <= player.x + dist &&
                (allEnemies[i].x + dist) >= (player.x) &&
                (allEnemies[i].y)<= player.y + dist &&
                (allEnemies[i].y+ dist) >= (player.y)){
         alert("YOU LOSE Don't try again :P");
               player.x=220;
               player.y=400;
               location.reload();
                countscore=0;
               document.getElementById("demo").innerHTML =" GO";

     }
        }       
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
          this.x =this.x + this.speed * dt;
       // to prevent enemies from moving out of canvas's wall boundaries (x axis)
        if(this.x>1000){
            this.x=this.x-1000;
        }

      collision();


    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Now write your own player class
    var Player = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    var allEnemies = [];
    var enemyPosition = [70, 150, 210];
    var player = new Player(500, 400, 65);
    var enemy;

    //to initial enemies with their Positions and speed
    function get(n){
    for(var i=0;i<enemyPosition.length;i++){
        var s =100 + Math.random() * 10*n;
        enemy =new Enemy(0,enemyPosition[i] , s);
        allEnemies.push(enemy); 
    }
    }

    //calling first enemies
    get(ls);

    // This class requires an update(), render() and
    // a handleInput() method.
    Player.prototype.update = function() {
        // Prevent player from moving out of canvas's wall boundaries
        if(this.y<30){
            this.y=380;
             countscore++;
             document.getElementById("demo").innerHTML ="score:"+countscore;
        if(countscore==3){
               levelcount++;
               alert('YOU win level'+levelcount);
                 ls=ls+5;
                 get(ls);
                countscore=0;
               document.getElementById("demo").innerHTML ="GO";

        }
        }

        if(this.y>400){
           this.y=this.y-65;
        }
        if(this.x>935 ){
            this.x=this.x-65;
          // document.getElementById("demo").innerHTML =this.x; 
        }
        if(this.x<0 ){
            this.x=-1;
           //document.getElementById("demo").innerHTML =this.x; 
        }

    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    };

    Player.prototype.handleInput = function(key) {
        if(key == 'left')
            {
                    this.x =this.x- this.speed;
            }
            if(key == 'right')
            {
                    this.x =this.x + this.speed;
            }

            if(key == 'up')
            {
                    this.y =this.y - this.speed;
            }
            if(key == 'down')
            {
                    this.y =this.y + this.speed;
            }

    };

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
