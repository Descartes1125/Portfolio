<?php
// データベースに接続するための情報
$dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
$user = 'root';
$password = '';

// Ajaxリクエストから送信されたデータを取得
$cardPrice = $_POST['price']; // 価格の更新値
$cardStock = $_POST['stock']; // 在庫の更新値
$cardid = $_POST['id'];

try {
    // データベースに接続
    $dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    // SQL文を準備
    $sql = "UPDATE card_data SET price = :price, stock = :stock WHERE card_id = :id";

    // プリペアドステートメントを準備
    $sth = $dbh->prepare($sql);
    
    // パラメータをバインド
    $sth->bindParam(':price', $cardPrice);
    $sth->bindParam(':stock', $cardStock);
    $sth->bindParam(':id', $cardid); 
    
    // プリペアドステートメントを実行
    $sth->execute();

    // 成功を示すレスポンスを返す
    echo json_encode(array('status' => 'success', 'message' => 'デの更が完した'));

} catch (PDOException $e) {
    // エラーハンドリング
    echo json_encode(array('status' => 'error', 'message' => 'データベースの更新に失敗しました: ' . $e->getMessage()));
}
?>
