<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* 初期状態でテーブルを非表示にする */
        .table-wrapper {
            display: none;
        }
    </style>
</head>
<body>
    <h2>注文一覧</h2>
    <?php
        try {
            // データベース接続
            $dsn = 'mysql:dbname=pokeca_shop;host=localhost;charset=utf8';
            $user = 'root';
            $password = '';

            $db = new PDO($dsn, $user, $password);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // SQL実行
            $sql = "SELECT order_data.order_id, order_data.order_number, customer_data.name, customer_data.address, customer_data.mail, order_data.date
                    FROM order_data
                    JOIN customer_data ON order_data.customer = customer_data.customer_id";

            $stmt = $db->query($sql);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <div class="accordion">
        <?php
            foreach ($result as $row) {
                echo "<div class='accordion-item'>";
                echo "<input type='checkbox' class='delete-checkbox' value='" . $row['order_id'] . "'>" . "<span class='toggle-button'>【注文番号】" . $row['order_number'] . "【名前】" . $row['name'] . "【住所】" . $row['address'] . "【メールアドレス】" . $row['mail'] . "</span>";
                echo "<div class='table-wrapper'>";
                echo "<table border=1>";
                // 各注文のデータを表示
                $sql_products = "SELECT order_item.card_id, card_data.card_name, order_item.quantity 
                                 FROM order_item 
                                 JOIN card_data ON order_item.card_id = card_data.card_id 
                                 WHERE order_number = :order_number";
                $stmt_products = $db->prepare($sql_products);
                $stmt_products->bindParam(':order_number', $row['order_number']);
                $stmt_products->execute();
                $products = $stmt_products->fetchAll(PDO::FETCH_ASSOC);
            
                foreach ($products as $product) {
                    
                    // 商品情報を繰り返し表示
                    echo "<tr>";
                    echo "<td width='30' align='center'>" . $product['card_id'] . "</td>";
                    echo "<td width='240'>" . $product['card_name'] . "</td>";
                    echo "<td width='40' align='center'>" . $product['quantity'] . "枚" . "</td>";
                    echo "</tr>";
                    }
                echo "</table>";
                echo "</div>"; // table-wrapper
                echo "</div>"; // accordion-item
                
            }
        } catch (PDOException $e) {
            // エラー処理
            echo "エラー発生：" . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8') . "<br>";
            die();
        }
        ?>
        <button class='delete'>キャンセル</button>
    </div>
    
    <script>
        // JavaScriptでアコーディオンの動作を設定
        document.addEventListener('DOMContentLoaded', function() {
            const toggleButtons = document.querySelectorAll('.toggle-button');
            const deleteButtons = document.querySelectorAll('.delete'); // 複数の削除ボタンがある場合は全て取得する

            toggleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tableWrapper = this.nextElementSibling;
                    tableWrapper.style.display = tableWrapper.style.display === 'none' ? 'block' : 'none';
                });
            });

            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener('click', function() {
                    const checkedCheckboxes = this.parentNode.querySelectorAll('.delete-checkbox:checked');
                    const orderIdsToDelete = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

                    // Ajaxリクエストを送信
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', './ajax/delete_order.php');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            const response = xhr.responseText;
                            if (response === 'success') {
                                location.reload();
                            } else {
                                console.error('削除に失敗しました');
                            }
                        }
                    };

                    // 注文IDをループして送信
                    orderIdsToDelete.forEach(orderId => {
                        xhr.send('orderId=' + orderId);
                    });
                });
            });
        });
    </script>
</body>
</html>