enchant();

var PATH_CHARA = 'chara1.gif';
var COLOR_BG = '#eef';      //背景色

var BULLET_CHAR = 'chara1.gif';

var PLANE_SIZE_X = 32;
var PLANE_SIZE_Y = 32;

var BULLET_SIZE_Y = 32;
var BULLET_SIZE_X = 32;

var ENEMY_SIZE_Y = 32;
var ENEMY_SIZE_X = 32;

var SCREEN_SIZE_X = 640;
var SCREEN_SIZE_Y = 500;

var PLANE_X = 300;
var PLANE_Y = 400;

var ENEMY_X = 300;
var ENEMY_Y = 50;

var game;

Enemy = Class.create(Sprite,
                    {initialize: function(x,y){
                        Sprite.call(this,ENEMY_SIZE_X, ENEMY_SIZE_Y );
                        this.image = game.assets[BULLET_CHAR];
                        this.x = x;
                        this.y = y;

                        this.frame = 12;

                        game.rootScene.addChild(this);
                    },

                    onenterframe : function(){
                        this.y += 3;
                    },
                });

Bullet = Class.create(Sprite,
                    {initialize: function(x,y){
                        Sprite.call(this,BULLET_SIZE_X, BULLET_SIZE_Y );
                        this.image = game.assets[BULLET_CHAR];
                        this.x = x;
                        this.y = y;

                        this.frame = 5;

                        game.rootScene.addChild(this);
                    },

                    onenterframe : function(){
                            this.y -= 10;
                    },
                });


MyPlane = Class.create(Sprite,
                    {initialize: function (x, y) {
                        Sprite.call(this, PLANE_SIZE_X, PLANE_SIZE_Y);
                        this.image = game.assets[PATH_CHARA];
                        this.x = x;
                        this.y = y;
                        this.speed = 0;

                        game.keybind('Z'.charCodeAt(0), "a");

                        game.rootScene.addChild(this);
                    },

                    onenterframe : function(){
                        if (game.input.up) {
                            if(this.y >0)
                                this.y-=4;
                        }
                        if(game.input.down) {
                            if(this.y < SCREEN_SIZE_Y)
                                this.y+=4;
                        }
                        if (game.input.right) {
                            if(this.x < SCREEN_SIZE_X - 20)
                                this.x+=4;
                        }
                        if (game.input.left) {
                            if(this.x > 0)
                                this.x-=4;
                        }

                        if(game.input.a){
                            this.speed++;
                            if(this.speed > 3){
                                bullet = new Bullet(this.x, this.y - 20);
                                this.speed = 0;
                            }
                        }
                    },
                });


window.onload = function(){
    game = new Game(SCREEN_SIZE_X, SCREEN_SIZE_Y);
    game.preload(PATH_CHARA);
    game.onload = function(){
        game.rootScene.backgroundColor = COLOR_BG;
        myplane = new MyPlane(PLANE_X, PLANE_Y);
        enemy = new Enemy(ENEMY_X, ENEMY_Y);
        };
    game.start();
};
