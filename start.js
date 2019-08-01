/*
* 游戏开始程序
* */
var GameStart = function () {
    this.start = function () {
        var Game = new Game_main();
        Game.Init();//初始化游戏框中div
        Game.keydown();//监听键盘事件
        Game.scren_keydown();
    }
};


