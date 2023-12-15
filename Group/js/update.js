$(function(){

    // 更新ボタンがクリックされたときの処理
        $('#updateButton').on('click', function() {
            var cardid = $('#cardid').text().trim(); // カードIDを取得
            var cardPrice = $('#cardPrice input').val(); // 価格の更新値を取得
            var cardStock = $('#cardStock input').val(); // 在庫の更新値を取得

    // 更新データをオブジェクトにまとめる（サーバーに送信するデータ）
            var updateData = {
                id: cardid, // カードのIDを更新用のデータとして追加                        
                price: cardPrice,
                stock: cardStock
                // 他に必要な情報があればここに追加
            };

    // 1. データベースを更新するAjaxリクエストを作成
            $.ajax({
                url: './ajax/update.php', // サーバーサイドのAPIエンドポイントのURL
                type: 'POST', // または 'PUT', 'PATCH' など、HTTPリクエストの種類
                dataType: 'json',
                data: updateData, // 送信するデータ
            })
            .done(function(response) {
                // 更新が成功した場合の処理
                console.log('データベースの更新が完了しました。');
                // 成功メッセージを表示したり、モーダルを閉じたりします
            })

    // 2. 更新されたデータを取得するAjaxリクエストを作成
            $.ajax({
                url: './ajax/get_updated_data.php', // 更新されたデータを取得するAPIのエンドポイント
                type: 'GET',
                dataType: 'json',
                data: { id: cardid }, // 更新されたデータを取得するためのカードIDを送信
            })
            .done(function(updatedData) {
                // 更新されたデータを使ってページ上の要素を更新する処理を実装する
                // 例えば、該当するカード情報を特定し、更新された価格と在庫を反映するなど
                // ここに必要な処理を追加してください
                console.log('更新されたデータ:', updatedData);
            })
            .fail(function(xhr, status, error) {
                // 更新されたデータの取得に失敗した場合の処理
                console.error('更新されたデータの取得に失敗しました:', error);
            });
            })
            .fail(function(xhr, status, error) {
                // 更新が失敗した場合の処理
                console.error('データベースの更新に失敗しました:', error);
                // 失敗メッセージを表示したり、エラー処理を行います
            });
        });