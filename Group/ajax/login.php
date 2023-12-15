<?php
if(isset($_GET['mail']) && isset($_GET['pass'])){
try {
    $dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
    $user = 'root';
    $password = '';

    $dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    $mail = $_GET['mail'];
    $pass = $_GET['pass'];

    // パスワードのハッシュ化（例：password_hash を使用）

    $sql = 'SELECT * FROM customer_data WHERE mail = :mail AND pass = :pass';
    $sth = $dbh->prepare($sql);

    // バインド変数を設定
    $sth->bindParam(':mail', $mail, PDO::PARAM_STR);
    $sth->bindParam(':pass', $pass, PDO::PARAM_STR);

    // プリペアドステートメントを実行する
    $sth->execute();

    // 実行後に結果を取得する
    $aryResult = $sth->fetchAll(PDO::FETCH_ASSOC);

    // データベースの取得結果配列をjson形式に変換
    echo json_encode($aryResult);

} catch (PDOException $e) {
    print('エラー:'.$e->getMessage());
    die();
}
}
?>
