var square = function () {
    this.position={
        x:0,//第0行
        y:3//第3列
    };
    this.type=parseInt(""+Math.random());//每个方块的四种类型
    this.cantransform = function (Chack) {
        var test = {};
        if(this.type==3){
            test.type=0;
        }else {
            test.type=this.type+1;
        }
        test.x=this.position.x;
        test.y=this.position.y;
        return Chack(test)
    };
    this.candown=function (Chack) {
        var test = {};
        test.type=this.type;
        test.x = this.position.x +1;
        test.y = this.position.y;
        return Chack(test);
    };
    this.canleft=function (Chack) {
        var test = {};
        test.type=this.type;
        test.x = this.position.x;
        test.y = this.position.y - 1;
        return Chack(test);
    };
    this.canright=function (Chack) {
        var test = {};
        test.type=this.type;
        test.x = this.position.x;
        test.y = this.position.y+1;
        return Chack(test);
    };
    this.leftmove=function () {//左移
            this.position.y-=1;
    };
    this.rightmove=function () {//右移
            this.position.y+=1;
    };
    this.downmove=function () {//下移
            this.position.x+=1;
    };
    this.transform=function () {//变形
        if(this.type==3){
            this.type=0;
        }else {
            this.type += 1;
        }
    };
    this.down_like=function () {//立刻下落

    }
};