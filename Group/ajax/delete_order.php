<?php
// データベース接続
$dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
$user = 'root';
$password = '';

try {
    $db = new PDO($dsn, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->beginTransaction();

    // 注文IDを受け取る
    $orderId = $_POST['orderId']; // JavaScriptから送信された注文ID

    // 削除用のSQL文を準備
    $sql_order = "DELETE FROM order_data WHERE order_id = :orderId";
    $sql_order_item = "DELETE FROM order_item WHERE order_number = :orderNumber";
    $sql_select_quantity = "SELECT quantity, card_id FROM order_item WHERE order_number = :orderNumber";
    $sql_select_stock = "SELECT stock FROM card_data WHERE card_id = :cardId";
    $sql_update_stock = "UPDATE card_data SET stock = :newStock WHERE card_id = :cardId";

    // 注文データを削除
    $stmt_order = $db->prepare($sql_order);
    $stmt_order->bindParam(':orderId', $orderId);
    $stmt_order->execute();

    // 注文アイテムの数量を取得
    $stmt_select_quantity = $db->prepare($sql_select_quantity);
    $stmt_select_quantity->bindParam(':orderNumber', $orderId);
    $stmt_select_quantity->execute();
    $orderItems = $stmt_select_quantity->fetchAll(PDO::FETCH_ASSOC);

    // カードデータの在庫を更新
    foreach ($orderItems as $orderItem) {
        $stmt_select_stock = $db->prepare($sql_select_stock);
        $stmt_select_stock->bindParam(':cardId', $orderItem['card_id']);
        $stmt_select_stock->execute();
        $cardData = $stmt_select_stock->fetch(PDO::FETCH_ASSOC);

        $newStock = $cardData['stock'] + $orderItem['quantity'];

        $stmt_update_stock = $db->prepare($sql_update_stock);
        $stmt_update_stock->bindParam(':newStock', $newStock);
        $stmt_update_stock->bindParam(':cardId', $orderItem['card_id']);
        $stmt_update_stock->execute();
    }

    // 注文アイテムを削除
    $stmt_order_item = $db->prepare($sql_order_item);
    $stmt_order_item->bindParam(':orderNumber', $orderId);
    $stmt_order_item->execute();

    // トランザクションをコミット
    $db->commit();

    // 成功のレスポンスを返す
    echo "success";
} catch (PDOException $e) {
    // エラー発生時にはロールバックし、エラーを出力
    $db->rollBack();
    echo "エラー発生：" . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
    die();
}