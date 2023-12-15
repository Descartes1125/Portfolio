<?php
try {
    $dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
    $user = 'root';
    $password = '';

    $dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    $sql = 'SELECT * FROM card_data join card_type on card_data.type = card_type.type_id ';
    $sth = $dbh->prepare($sql);

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

?>
