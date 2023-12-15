<?php
if(isset($_GET['mail']) && isset($_GET['pass'])){
    try {
        $dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
        $user = 'root';
        $password = '';

        $dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        
        $name = $_GET['name'];
        $adress = $_GET['adress'];
        $mail = $_GET['mail'];
        $pass = $_GET['pass'];


        // INSERT文
        $sql = 'INSERT INTO customer_data (name, address, mail, pass) VALUES (:name, :address, :mail, :pass)';
        $sth = $dbh->prepare($sql);
        $sth->bindParam(':name', $name, PDO::PARAM_STR);
        $sth->bindParam(':address', $adress, PDO::PARAM_STR);
        $sth->bindParam(':mail', $mail, PDO::PARAM_STR);
        $sth->bindParam(':pass', $pass, PDO::PARAM_STR);
        $sth->execute();

        // SELECT文
        $secondsql = 'SELECT * FROM customer_data WHERE mail = :mail';
        $secondsth = $dbh->prepare($secondsql);
        $secondsth->bindParam(':mail', $mail, PDO::PARAM_STR);

        $secondsth->execute();
        $aryResult = $secondsth->fetchAll(PDO::FETCH_ASSOC);

        // データベースの取得結果配列をjson形式に変換
        echo json_encode($aryResult);

    } catch (PDOException $e) {
        print('エラー:'.$e->getMessage());
        die();
    }
}
?>
