/*
* 游戏类（主程序）
*
*
* */
var Game_main = function () {
    var gamedata = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];//当前游戏的方块数组
    var nextdata=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];//下一个方块数组
    var $gamedivs =[];//$对象
    var $nextdivs =[];//$对象
    var current_square = '';//当前方块对象
    var next_square = '';//下一个方块对象
    var gameover=false;//游戏是否结束
    var time =0;//游戏时间
    var score = 0;//以得分数
    var speed = 600;//下降速度，当分数增加时游戏难度增加
    /*
    * 初始化div>>>在游戏框和下一个方块框中加入div
    *
    * */
    var Init_divs=function (data,container,classname) {
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
    /*
    * 刷新div，给div加上背景色
    * */
    var Refresh_div = function (data,container) {
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
    /*
    * 随机生成方块，方块构造函数
    * */
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
    /*
    * 将方块数据拷贝到gamedata和中去
    * */
    var copy_data=function (x,y) {
        for(var i=0;i<current_square.data.length;i++){
            for(var j=0;j<current_square.data[0].length;j++){
                if(Check(x,y,i,j)){
                    gamedata[x+i][y+j]=current_square.data[current_square.type][i][j];
                }
            }
        }
    };
    /*
    * 刷新游戏界面，实现移动效果
    * */
    var Refresh_game = function () {
        copy_data(current_square.position.x,current_square.position.y);//拷贝当前方块数据
        nextdata = next_square.data[next_square.type];//拷贝下一个方块数据
        Refresh_div(gamedata,$gamedivs);
        Refresh_div(nextdata,$nextdivs);
    };
    /*
    * 每进行一次移动都要清除之前的方块
    * */
    var empty_game=function (x,y) {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(Check(x,y,i,j)){
                    gamedata[x+i][y+j]=0;
                }
            }
        }
    };
    /*
    * 控制方块移动函数，通过改变x，y
    * */
    var left = function () {
        if(current_square.canleft(Chack_data)){
            empty_game(current_square.position.x,current_square.position.y);
            current_square.leftmove();
            Refresh_game();
        }
    };
    var right = function () {
        if(current_square.canright(Chack_data)){
            empty_game(current_square.position.x,current_square.position.y);
            current_square.rightmove();
            Refresh_game();
        }
    };
    var down =function () {
        if(current_square.candown(Chack_data)){
            empty_game(current_square.position.x,current_square.position.y);
            current_square.downmove();
            Refresh_game();
            return true;
        }else {
            return false;
        }
    };
    var up = function () {//变形
        if(current_square.cantransform(Chack_data)){
            empty_game(current_square.position.x,current_square.position.y);
            current_square.transform();
            Refresh_game();
        }
    };
    var space = function () {
        if(down()){
            space();
        }
    };
    //方块的移动
    var move = function (direction) {
            if(direction=="left"){
                left();
            }else if(direction=="right"){
                right();
            }else if(direction=="up"){
                up();
            }else if(direction=="down"){
                if(!gameover){
                    if(!down()){
                        Fixed_change();
                        Refresh_game();
                        Change();
                    }
                }
            }else if(direction=="space"){
                space();
            }

    };
    /*
    * 监听键盘事件，实现移动方块
    * */
    this.keydown=function () {
        $(document).keydown(function (e) {
            if(e.keyCode==38){//up
                move("up");
            }else if(e.keyCode==39){//right
                move("right");
            }else if(e.keyCode==40){//down
                move("down");
            }else if(e.keyCode==37){//left
                move("left");
            }else if(e.keyCode==32){//space
                move("space");
            }
        });
    };
    /*
    * 监听屏幕按键事件
    * */
    this.scren_keydown = function () {
        $('.control_left').click(function () {
            move("left");
        });
        $('.control_right').click(function () {
            move("right");
        });
        $('.control_up').click(function () {
            move("up");
        })
        ;$('.control_down').click(function () {
            move("down");
        });
        ;$('.control_space').click(function () {
            move("space");
        });
    };
    /*
    * 检查点是否违法，如果x，y值不合适会导致超出gamedata数组，会报错
    * */
    var Check=function (x,y,i,j) {
        if(y+j<0){//超出左边界
            return false;
        }else if((y+j)>=gamedata[0].length){//超出右边界
            return false;
        }else if(x+i<0){//超出上边界
            return false;
        }else if(x+i>=gamedata.length){//超出下边界
            return false;
        }else if(gamedata[x+i][y+j]===1){//已经有方块的
            return false;
        }else {
            return true;
        }


    };
    /*
    * 检查数据是否合法
    * */
    var Chack_data= function (test) {
        for(var i=0;i<current_square.data.length;i++){
            for(var j=0;j<current_square.data[current_square.type][0].length;j++){
                if(current_square.data[test.type][i][j]!=0){
                    if(!Check(test.x,test.y,i,j)){
                        return false;
                    }
                }
            }
        }
        return true;
    };
    /*实现方块自动下降*/
     var Down_self=function () {
        move("down");
        if(!gameover){
            setTimeout(Down_self,speed);
        }
    };
     /*
     * 实现方块的固定并且改变颜色
     * */
    var Fixed_change=function () {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                    if(current_square.data[current_square.type][i][j]==2){
                        gamedata[current_square.position.x+i][current_square.position.y+j]=1;
                    }
                }
            }
    };
    /*
    * 当方块固定时下一个方块变成当前方块
    * */
    var Change = function () {
        current_square = next_square;
        next_square = random_square();
        clear();
        Check_gameover();
        add_level();
    };
    /*
    * 实现游戏的消行，即每当有一行全是1的时候，下移一行
    * */
    var clear = function () {
        line=0;//消除的行数
        for(var i=gamedata.length-1;i>=0;i--) {//检测是否满足一行都是1
            var canlear = true;
            for (var j = 0; j < gamedata[0].length; j++) {
                if (gamedata[i][j] != 1) {
                    canlear = false;
                    break;
                }
            }
            if (canlear) {//将行数向下移动一行
                for (var k = i; k > 0; k--) {
                    for (var t = 0; t < gamedata[0].length; t++) {
                        gamedata[k][t] = gamedata[k - 1][t];
                    }
                }
                i++;//这步很重要保证了每次检查都可以从最底层开始，不加每次只能消除一行
                line++;
            }
        }
        if (line==1) {
            score += 100;
        }
        if (line == 2) {
            score += 300;
        }
        if (line == 3) {
            score += 500;
        }
        if (line == 4) {
            score += 800;
        }
        if (line == 5) {
            score += 1000;
        }
        console.log(score)
    };
    /*
    * 增加游戏难度
    * */
    var add_level = function () {
        if(time>60){
            speed=500;
        }else if(time>120){
            speed=400;
        }else if(time>180){
            speed=300;
        }else if(time>240){
            speed=200;
        }
    };

    /*
    * 实现游戏的结束思路，从上检查若第一层有1则游戏结束
    * */
    var Check_gameover = function () {
            for(var j=0;j<gamedata[0].length;j++){
                if(gamedata[0][j]==1){
                    gameover=true;
                    alert('游戏结束！');
                    var min_score=$('.table tr:nth-child(5) td:nth-child(3)').html();
                    if(score>min_score){
                        var name = prompt("恭喜你破纪录了，请问大佬姓名？");
                        $.post('score.php','score='+score+'&name='+name);
                    }

                }
            }

    };

    /*
    * 游戏计时器
    * */
    var Timeout = function () {
        time++;
        $('.used-time').html(time);
        $('.score').html(score);
        if(!gameover){
            setTimeout(Timeout,1000);
        }
    };




    /*游戏初始化*/
    this.Init = function () {
        Init_divs(gamedata,$gamedivs,game);
        Init_divs(nextdata,$nextdivs,next);
        current_square = random_square();
        next_square = random_square();
        copy_data(current_square.position.x,current_square.position.y);//拷贝当前方块数据
        nextdata = next_square.data[next_square.type];//拷贝下一个方块数据
        Refresh_div(gamedata,$gamedivs);
        Refresh_div(nextdata,$nextdivs);
        Down_self();
        Timeout();
    }
};