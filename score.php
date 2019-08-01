<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/2/002
 * Time: 12:16
 */
header("Content-Type:text/html;charset=utf-8");
/*数据库的链接*/
function d_bconnect(){
    $link = mysqli_connect('localhost', 'root');//连接数据库
    mysqli_set_charset($link, 'utf8');//设置字符集
    mysqli_select_db($link, 'square');//选择数据库
    return $link;
}
/*查询数据库中的分数并返回*/
function score(){
   if(isset($_POST['x'])){
       $link=d_bconnect();
       $reponse=[];
       $result=mysqli_query($link,'select * from score');
       if($result){
           for($i=0;$i<mysqli_num_rows($result);$i++){
               $row=mysqli_fetch_assoc($result);
               $arry=[];
               $name=$row['name'];
               $max_score=$row['max_score'];
               $arry=[$name,$max_score];
               $reponse[$i]=$arry;
           }
       }
       echo json_encode($reponse,JSON_UNESCAPED_UNICODE);
   }
}
function update_score(){
   if(isset($_POST['score'])){
       $score=$_POST['score'];
       $link=d_bconnect();
       $reponse=[];
       $result=mysqli_query($link,'select * from score');
       if($result){
           for($i=0;$i<mysqli_num_rows($result);$i++){
               $row=mysqli_fetch_assoc($result);
               $arry=[];
               $name=$row['name'];
               $max_score=$row['max_score'];
               $arry=[$name,$max_score];
               $reponse[$i]=$arry;
           }
       }
       if($score>$reponse[0][1]){
            mysqli_query($link,'update score set name=\''.$_POST['name'].'\',max_score='.$score.' where ID=1');
            return;
       }else if ($score>$reponse[1][1]){
           mysqli_query($link,'update score set name=\''.$_POST['name'].'\',max_score='.$score.' where ID=2');
           return;
       }else if ($score>$reponse[2][1]){
           mysqli_query($link,'update score set name=\''.$_POST['name'].'\',max_score='.$score.' where ID=3');
           return;
       }else if ($score>$reponse[3][1]){
           mysqli_query($link,'update score set name=\''.$_POST['name'].'\',max_score='.$score.' where ID=4');
           return;
       }else if ($score>$reponse[4][1]){
           mysqli_query($link,'update score set name=\''.$_POST['name'].'\',max_score='.$score.' where ID=5');
           return;
       }
   }
}
score();
update_score();