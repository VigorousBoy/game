var mygame=function () {
    var nextdata=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];//下一个方块数组
    var gamedata = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    ];//正在游戏的方块数组
    var $gamedivs =[];//$对象
    var $nextdivs =[];//$对象
    /*初始化div*/
    var init_divs=function (data,container,classname) {
        if($(classname).html()==''){
            for(var i=0;i<data.length;i++){
                var div=[];
                for(var j=0;j<data[i].length;j++){
                    var gamediv=$('<div class="none" style="left:'+(j*20)+'px;top:'+(i*20)+'px;"></div>');
                    div.push(gamediv);
                    $(classname).append(gamediv);
                }
                container.push(div);
            }
        }

    };

    /*刷新游戏*/
    var refresh=function (data,container) {
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].length;j++){
                if(data[i][j]==0){
                    container[i][j].removeClass('current down');
                    container[i][j].addClass('none');
                }
                else if(data[i][j]==1){
                    container[i][j].removeClass('none current');
                    container[i][j].addClass('down');
                }else if(data[i][j]==2){
                    container[i][j].removeClass('none down');
                    container[i][j].addClass('current');
                }
            }
        }
    };
    //随机生成方块
    var random_square=function () {
        var square_type=parseInt(""+(Math.random()*7+1));
        switch (square_type){
            case 1:
                return  new square_1();
            case 2:
                return  new square_2();
            case 3:
                return  new square_3();
            case 4:
                return  new square_4();
            case 5:
                return  new square_5();
            case 6:
                return  new square_6();
            case 7:
                return  new square_7();
        }

    };
    var current=random_square();//当前方块
    var nex=random_square();//下一个方块
    nextdata=nex.data[nex.type];
    //检查点是否违法
    var Check=function (x,y,i,j) {
       if(y+j<0){//超出左边界
           return false;
       }else if((y+j)>gamedata[0].length){//超出右边界
           return false;
       }else if(x+i<0){//超出上边界
           return false;
       }else if((x+i)>gamedata.length){//超出下边界
           return false;
       }else if(gamedata[x+i][y+j]==1){//已经有方块的
           return false;
       }else {
           return true;
       }
    };
    //检查数据是否违法
    var Chack_data= function (x,y) {
       for(var i=0;i<4;i++){
           for(var j=0;j<4;j++){
               if(current.data[i][j]!=0){
                   if(!Check(x,y,i,j)){
                       return false;
                   }
               }
           }
       }
       return true;
    };
    //将方块的中的值拷贝到game中去
    var copy_game=function (x,y) {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(Check(x,y,i,j)){
                    gamedata[x+i][y+j]=current.data[current.type][i][j]
                }
            }
        }
    };
    //清空game中的数值
    var empty_game=function (x,y) {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(Check(x,y,i,j)){
                    gamedata[x+i][y+j]=0;
                }
            }
        }
    };

    //监听键盘事件，实现移动方块
    var keydown=function () {
      $(document).keydown(function (e) {
          if(e.keyCode==38){//up
                current.transform();
                init();
          }else if(e.keyCode==39){//right
              current.rightmove();
              init();
          }else if(e.keyCode==40){//down
              if(Chack_data(current.position.x,current.position.y)){
                  current.downmove();
              }
              color_change(current.position.x,current.position.y);
              init();
          }else if(e.keyCode==37){//left
              current.leftmove();
              init();
          }else if(e.keyCode==32){//space

          }
      });
    };
    //自动下降
    var down_self=function () {
        if(Chack_data(current.position.x,current.position.y)){
            current.downmove();
        }
        color_change(current.position.x,current.position.y);
        init();
        setTimeout(down_self,1000);
    };
    //当方块落到底端时固定并改变颜色
    var color_change=function (x,y) {
           for(var i=0;i<4;i++){
               for(var j=0;j<4;j++){
                   if(!Chack_data(x,y)){
                       if(gamedata[x+i][y+j]==2){
                           gamedata[x+i][y+j]=1;
                       }

                   }
               }
           }
    };
    //初始化game
    var init=function () {
        copy_game(current.position.x,current.position.y);
        init_divs(gamedata,$gamedivs,game);
        init_divs(nextdata,$nextdivs,next);
        refresh(gamedata,$gamedivs);
        refresh(nextdata,$nextdivs);
        empty_game(current.position.x,current.position.y);
    };
    this.init=init;
    this.keydown=keydown;
    this.down_self=down_self;
};