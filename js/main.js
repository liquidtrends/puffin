var game = new Phaser.Game(320, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
   game.load.image('sky', '../assets/sky.png');
   game.load.image('cloud1', '../assets/cloud1.png');
   game.load.image('puffin', '../assets/puffin.png');
   game.load.image('puffin-left', '../assets/puffin-left.png');
   game.load.image('puffin-right', '../assets/puffin-right.png');
}

var cloud;
var texture1;
var texture2;
var texture3;
var clouds = [];

function create() {
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.add.sprite(0,0, 'sky');

   cloud = game.make.sprite(0, 0, 'cloud1');

   texture1 = game.add.renderTexture(320, 480, 'texture1');
   texture2 = game.add.renderTexture(320, 480, 'texture2');
   texture3 = game.add.renderTexture(320, 480, 'texture3');

   game.add.sprite(0, 0, texture1);
   game.add.sprite(0, 0, texture2);
   game.add.sprite(0, 0, texture3);

   var t = texture1;
   var s = 4;

   //  100 sprites per layer
   for (var i = 0; i < 300; i++)
    {
        if (i == 10)
        {
            //  With each 100 stars we ramp up the speed a little and swap to the next texture
            s = 6;
            t = texture2;
        }
        else if (i == 10)
        {
            s = 7;
            t = texture3;
        }

        clouds.push( { x: game.world.randomX, y: game.world.randomY, speed: s, texture: t });
    }


   player = game.add.sprite(100, game.world.height - 280, 'puffin');
   game.physics.arcade.enable(player);
   player.body.collideWorldBounds = true;

}

function update() {
   game.physics.arcade.collide(player);
   cursors = game.input.keyboard.createCursorKeys();

   player.body.velocity.y = 0;
   
   if (cursors.left.isDown)
   {
      player.body.velocity.x = -100;
      player.animations.play('puffin-left');
   }
   else if (cursors.right.isDown)
   {
      player.body.velocity.x = 100;
      player.animations.play('puffin-right');
   }
   else if (cursors.up.isDown) 
   {
      player.body.velocity.y = -50;
   } 
   else if (cursors.down.isDown)
   {
      player.body.velocity.y = 50;
   }
   // else if (cursors.spacebar.isDown)
   // {
   //    player.body.velocity.y = 400;
   // }
   else
   {
      player.animations.stop();
      player.frame = 4;
   }

   for (var i = 0; i < 300; i++)
    {
        //  Update the clouds y position based on its speed
        clouds[i].y += clouds[i].speed;

        if (clouds[i].y > 600)
        {
            //  Off the bottom of the screen? Then wrap around to the top
            clouds[i].x = game.world.randomX;
            clouds[i].y = -32;
        }

        if (i == 0 || i == 100 || i == 200)
        {
            //  If it's the first star of the layer then we clear the texture
            clouds[i].texture.renderXY(cloud, clouds[i].x, clouds[i].y, true);
        }
        else
        {
            //  Otherwise just draw the star sprite where we need it
            clouds[i].texture.renderXY(cloud, clouds[i].x, clouds[i].y, false);
        }
    }

   player.bringToTop();

}