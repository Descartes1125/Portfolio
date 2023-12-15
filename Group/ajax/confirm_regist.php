<?php
if (isset($_GET['customer_id']) && isset($_GET['tableData']) && isset($_GET['quantity']) && isset($_GET['itemid'])) {
    $customer_id = $_GET['customer_id'];
    $tableData = json_decode($_GET['tableData'], true);
    $quantities = $_GET['quantity'];
    $itemids = $_GET['itemid'];
    
    try {
        $dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
        $user = 'root';
        $password = '';

        $dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        // 顧客IDは既に $customer_id に代入されているので、再度取得する必要はありません
        // $customer = $_GET['customer_id'];

        $sql = 'SELECT MAX(order_number) as max_order_number FROM order_data';
        $sth = $dbh->prepare($sql);
        $sth->execute();
        $result = $sth->fetch(PDO::FETCH_ASSOC);

        // 新しい注文番号を計算
        $order_number = $result['max_order_number'] + 1;

        $date = date('Y-m-d H:i:s'); 

        // INSERT文の構文とプレースホルダーの指定
        $sql = 'INSERT INTO order_data (order_number, customer, date) VALUES (:order_number, :customer, :date)';
        $sth = $dbh->prepare($sql);

        // プレースホルダーに実際のデータをバインド
        $sth->bindParam(':order_number', $order_number, PDO::PARAM_INT);
        $sth->bindParam(':customer', $customer_id, PDO::PARAM_INT);
        $sth->bindParam(':date', $date, PDO::PARAM_STR);

        // クエリを実行
        $sth->execute();

        // order_item テーブルにデータを挿入
        $sql = 'INSERT INTO order_item (order_number, card_id, quantity) VALUES (:order_number, :card_id, :quantity)';
        $sth = $dbh->prepare($sql);

        // foreach ループでデータを挿入
        foreach ($itemids as $index => $itemid) {
            // プレースホルダーにデータをバインド
            $sth->bindParam(':order_number', $order_number, PDO::PARAM_INT);
            $sth->bindParam(':card_id', $itemid, PDO::PARAM_INT);
            $sth->bindParam(':quantity', $quantities[$index], PDO::PARAM_INT);
        
            // クエリを実行
            $sth->execute();

            $updateStockSql = 'UPDATE card_data SET stock = stock - :quantity WHERE card_id = :card_id';
            $updateStockSth = $dbh->prepare($updateStockSql);
            $updateStockSth->bindParam(':quantity', $quantities[$index], PDO::PARAM_INT);
            $updateStockSth->bindParam(':card_id', $itemid, PDO::PARAM_INT);
            $updateStockSth->execute();
        }

    } catch (PDOException $e) {
        print('エラー:'.$e->getMessage());
        die();
    }
} else {
    echo "Invalid request.";
}
?>
