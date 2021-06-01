class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500,50,50);
    player1.addImage("player1",player_img);
    player1.scale=0.2;
    player2 = createSprite(800,500,200,250);
    player2.addImage("player2", player2_img);
    players=[player1,player2];

        }
    
    play(){
        if(gameState===1){

        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index -1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         text("Player 1 :" +allPlayers.player1.score,50,50);
                        text("Player 2 :" + allPlayers.player2.score, 50, 100);
                 
                    }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }

                    if (keyIsDown(UP_ARROW) && player.index !== null) {
                        player.distance += 10
                        player.update();
                    }

                        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                            player.distance += 10
                            player.update();

                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,4));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         fruits.scale=0.4;
                         sound1.play();
                         break;
                         case 2: fruits.addImage("fruit2", fruit2_img);
                         fruits.scale=0.3;
                         sound1.play();
                         break;
                         case 3: fruits.addImage("fruit3", fruit3_img);
                         fruits.scale=0.5;
                         break;
                         case 4: fruits.addImage("fruit4", fruit4_img);
                         fruits.scale=0.3;
                         break;
                
                         
                         
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length -1; i++) {
                          if (fruitGroup.get(i).isTouching(players)) {
                              fruitGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();

                              
                          }
if(allPlayers.player1.score >=15|| allPlayers.player2.score>=15){
    gameState=2;
}
                       
                      }
                  }
                

         
         
                }   
         

    }

    end(){
       console.log("Game Ended");
       textSize(35)
       fill("white")




       
       if(allPlayers.player1.score >=15){
           text("player1",200,200)

           
       }else if(allPlayers.player2.score>=15){
           text("player2",200,200)
       }
    }
}