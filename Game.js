'use strict';
const ANIM_TIME = 1000/60;
var game = null;
class Game 
{
    constructor() 
	{
		this.loadLevelNav = $('#load-btn');
		this.loadLevel = $('#load-level-btn');
		this.cannonItem = $('.item-cannon');
		this.birdItem = $('.item-bird');
		this.boxItem = $('.item-box');
		this.frameTimer = null;
		this.birdEntities = [];
		this.box2dEntities = [];
		this.myWorld = null;
		this.isGameOver = false;
		this.projectilesText;
		/*
		this.birdHelpSound = new buzz.sound("sound/BirdProblem.wav");
		this.victorySound = new buzz.sound("sound/Victory.wav") ;
		this.loseSound = new buzz.sound("sound/Lose.mp3"); 
		this.shootingSound = new buzz.sound("sound/Shooting.mp3");
		*/
		this._getLevel();
		this.shooting();
		this.result;
	}
     
    update() 
	{
    	for(let i = 0; i < this.box2dEntities.length; i++)
    	{
    		if(this.box2dEntities[i].dom$.hasClass("item-bird"))
    		{
    			this.box2dEntities[i].applyForce(-90, 20);
    			if(this.box2dEntities[i].dom$.position().top < - 200)
    			{
    				$('#game-win').fadeIn("fast");
    				this.myWorld = null;
    				this.isGameOver = true;
    				this.birdHelpSound.stop();
    				this.victorySound.play();
    			}
    			this.projectilesText.html("X" + nav.level.levelProjectiles);
    		}
    	}	
    	if(this.myWorld != null)
    		this.myWorld.update();
    }

    render() 
	{
    	for (let i = 0; i < this.box2dEntities.length; i++)
    	{
    		this.box2dEntities[i].render();
    	}
    	if(this.myWorld != null)
    	 this.myWorld.model.ClearForces();
    }
    
	run() 
	{	 
	    // Game happens here
	    let startTime;
	    let deltaTime = null;
	    var self = this;
	    let frame = function( timestamp ) 
		{
	    	deltaTime = timestamp - startTime;
	    	startTime = timestamp;
	        self.update( deltaTime );
            self.render( deltaTime ); 
                     
            window.requestAnimationFrame( frame );
        };
        // End of game loop
        window.requestAnimationFrame( frame );
	};
	
	_getLevel( event ) 
	{
		this.loadLevel.click(()=> 
		{
			this.myWorld = new WorldController($('#editor-game'));
			$('#editor-game').html("");
			$('#game-score').html("");
			$('#game-win').fadeOut("fast");
			$('#game-lose').fadeOut("fast");
			$('#editor-right').fadeOut( "fast" );
			$('#editor-left').fadeOut( "fast" );
			$('#save-btn').fadeOut( "fast" );
			this.projectilesText =  $('#game-cannonballs').clone().appendTo($('#editor-game')).fadeIn("fast"); 
			let levelName = $('#load-select').val();
			let command = { 'action' : 'loadlevel', 'levelName' : levelName };
			let request = $.param( command );
			// Post message to the server AND THEN.
			$.post('server/', request).then(( responseStr ) => 
			{
				this.result = JSON.parse(responseStr);
				this.result = JSON.parse(this.result);
				$('#editor-game').css('width', "80%");
				$('#editor-game').css('margin-left', "8%");
				$('#editor-game').css("backgroundImage", this.result.levelBackground);
				nav.level.levelName = this.result.levelName;
				nav.level.levelAuthor = this.result.levelAuthor;
				nav.level.levelProjectiles = this.result.levelProjectiles;
				var actualCannon = this.cannonItem.clone().appendTo($('#editor-game'));
				actualCannon.attr("id", "game-cannon");
				let newEntity = new Entity(this.myWorld, $('#game-cannon'), true);				
				this.box2dEntities.push(newEntity);
				actualCannon.fadeIn("fast");
		        actualCannon.css('position', 'absolute');
		        actualCannon.css('left', this.result.levelCannon.xPos);
				actualCannon.css('top', this.result.levelCannon.yPos);
				$('.item-cannon-top').css('top', "-20px");
		        $('.item-cannon-top').css('right', "-45px");
		        $('.item-cannon-top').css('width', "140px");
		        $('.item-cannon-top').css('height', "140px");
		        for (var i = 0; i <= this.result.levelBirds.length - 1; i++) 
				{
		          let birdObject = 
				  {
		            birdId : i,
		            birdWidth : this.result.levelBirds[i].birdWidth,
		            birdHeight : this.result.levelBirds[i].birdHeight,
		            birdXPos : this.result.levelBirds[i].birdXPos,
		            birdYPos : this.result.levelBirds[i].birdYPos
		          }
		          var bird = this.birdItem.clone().appendTo( $('#editor-game') );
		          bird.attr('id', "bird" + birdObject.birdId);
		          bird.removeClass("item");		          
		          bird.addClass("bird-anim");
		          bird.css('position', 'absolute');
		          bird.fadeIn("fast");
		          bird.css('margin', '0px');
		          bird.css('height', birdObject.birdHeight);
		          bird.css('width', birdObject.birdWidth)		         
		          bird.css('left', birdObject.birdXPos);
		          bird.css('top', birdObject.birdYPos);
		          let birdEntity = new Entity(this.myWorld, bird, false);
		          this.box2dEntities.push(birdEntity);		            
		        }
		        this.birdHelpSound.loop().play();
		        // Initiation
		        for (var i = 0; i <= this.result.levelItems.length - 1; i++) 
				{
		        	let itemObject = 
					{
	        			itemId : i,
	        	        itemWidth : this.result.levelItems[i].itemWidth,
	        	        itemHeight : this.result.levelItems[i].itemHeight,
	        	        itemXPos : this.result.levelItems[i].itemXPos,
	        	        itemYPos : this.result.levelItems[i].itemYPos,
	        	        itemBack : this.result.levelItems[i].itemBack,
	        	        itemMass : this.result.levelItems[i].itemDensity,
	        	        itemFriction : this.result.levelItems[i].itemFriction,
	        	        itemBounce : this.result.levelItems[i].itemBounce,
		        	}
		        	var item = this.boxItem.clone().appendTo($('#editor-game'));
		        	item.addClass("draggable-item draggable");
		        	item.css('position', 'absolute');
		        	item.css('margin', '0px');
		        	item.css('padding', '0px');
		        	item.css('height', itemObject.itemHeight);
		        	item.css('width', itemObject.itemWidth);
		        	item.css('left', itemObject.itemXPos);
		        	item.css('top', itemObject.itemYPos);
		        	item.css('background-image', itemObject.itemBack);
		        	item.data("mass", itemObject.itemMass);
		        	item.data("friction", itemObject.itemFriction);
		        	item.data("bounce", itemObject.itemBounce);
		        	let newEntity = new Entity(this.myWorld, item, false, item.data("mass"), item.data("friction"), item.data("restitution"));
			        this.box2dEntities.push(newEntity);
		        	item.attr('id', "item" + itemObject.itemId);		      
		        }
			});
			$('#editor-game').mousemove((event) => 
			{
				var actualRotation = Math.atan2(event.clientY -  this.result.levelCannon.yPos, event.clientX -  this.result.levelCannon.xPos);
				actualRotation = (actualRotation) * (180/Math.PI);				
				$('.item-cannon-top').css({'transform' : 'rotate('+ actualRotation +'deg)'});
			});
		});
	}
	
	shooting()
	{		
		$('#editor-game').click((event ) => 
		{			
			if(nav.level.levelProjectiles > 0 && this.myWorld != null)
			{
				this.shootingSound.play();
				let cannonBall = $('.item-cannonball').clone().appendTo($('#editor-game'));
				cannonBall.css('top',  this.result.levelCannon.yPos);
				cannonBall.css('left', this.result.levelCannon.xPos + 200);
				cannonBall.fadeIn("fast");
				var actualRotation = Math.atan2(event.clientY -  this.result.levelCannon.yPos, event.clientX -  this.result.levelCannon.xPos);
				actualRotation = (actualRotation) * (180/Math.PI);
				let actualBall = new Entity(this.myWorld, cannonBall, false, 200);
				actualBall.applyForce(actualRotation, 1000 * (event.clientX * 10));
				this.box2dEntities.push(actualBall);	
			}
			nav.level.levelProjectiles--;
			if(nav.level.levelProjectiles <= 0 && this.myWorld != null)
			{
				$('#game-lose').fadeIn("fast");
				this.myWorld = null;
				this.loseSound.play();
				this.birdHelpSound.stop();
			}
		});
	}
};

// MAIN -- START HERE
$(document).ready( () => {
 
    game = new Game();
    game.run();
});