$(function(){
    $.ajax({
        url: './ajax/type_data.php',
        type: 'GET',
        dataType: 'json',
    }).done(function(data){
        // 通信成功時
        var html_response = '<div class="category">';
        
        // dataが配列であることを仮定して、各要素に対して処理
        $.each(data, function(index, item){
            html_response += '<input type="button" value="' + item.type_name + '" id="' + item.type + '_type">';
            });
    
        html_response += '</div>';
        $('.type_result').html(html_response); // 取得したHTMLを.resultに反映
    }).fail(function(data){
        // 通信失敗時
        alert('通信失敗！');
    });


    $.ajax({
        url: './ajax/card_data.php',
        type: 'GET',
        dataType: 'json',
    }).done(function(data){
        // 通信成功時
        var html_response = '<ul>';
        
        // dataが配列であることを仮定して、各要素に対して処理
        $.each(data, function(index, item){
            html_response +='<li class="card_wrapper">';
            var type = item.type;

            if(type == "trainers"){
                html_response += '<div class="' + type +'">';

            } else{
                html_response += '<div class="' + type +' hide">';

            };

            html_response += '<div class="img_wrapper"><img class="card_img" src="./img/' + item.image + '">';

            stock = item.stock ;
            if(stock < 1){
                html_response += '<img class="soldout" src="./img/shopping_urikiremashita_man.png"> ';

            };

            html_response += '</div> <p class= "card_price">￥' + item.price + '</p><p class="card_name">' + item.card_name +'</p>';

            if(stock > 0){
                
            html_response += '<p><input type="hidden" class="id_holder" value="' + item.card_id +'"><select name="stock" id="select_stock' + item.card_id +'">';

            // stock関数から在庫数を取得
            var stockCount = stock;

            // 在庫数分だけOptionをセレクトボックスに追加
            for (var i = 0; i <= stockCount && i <= 4; i++) {
            html_response +='<option  value="' + i + '">' + i + '枚</option>';
            };
            html_response += '</select><input type="button" id="Cartin_button" value="追加"></p></div></li>';
        };

        });
    
        html_response += '</ul>';
        $('.card_result').html(html_response); // 取得したHTMLを.resultに反映
        addClickListeners();
    }).fail(function(data){
        // 通信失敗時
        alert('通信失敗！');
    });
    
    $('#check_acount').click(function(){
        $.ajax({
            url: './ajax/login.php',
            type: 'GET',
            /* json形式で受け取るためdataTypeを変更 */
            dataType: 'json',
            data : {
                mail : $('.mail').val(),
                pass : $('.pass').val()
            }
        }).done(function(data){
            /* 通信成功時 */
            if (data.length === 0) {
                // 検索結果がない場合の処理
                $('.acount_choice').html('<p>アカウントが存在しません</p><p>メールアドレスかパスワードが間違っています</p>');
              } else{
            var html_response = '<select name="customer_id" id="customer_id-select">';
            $.each(data, function(index, item){
                html_response += '<option value="' + item.customer_id + '">'+ item.name + '/' + item.address + '</option>';
            });
            html_response += '</select>';

            $('.acount_choice').html(html_response); //取得したHTMLを.resultに反映
            const verify = $('#regist_order'); // jQueryオブジェクトに変換
            verify.removeClass("hide");
            }
        }).fail(function(data){
            /* 通信失敗時 */
            alert('通信失敗！');
                    
        });
    });

    $('#create_acount').click(function(){
        $.ajax({
            url: './ajax/regist.php',
            type: 'GET',
            /* json形式で受け取るためdataTypeを変更 */
            dataType: 'json',
            data : {
                name : $('#name_input').val(),
                mail : $('#mail_input').val(),
                adress :$('#adress_input').val(),
                pass : $('#pass_input').val()
            }
        }).done(function(data){
            /* 通信成功時 */
           
            var html_response = '<select name="customer_id" id="customer_id-confirm">';
            $.each(data, function(index, item){
                html_response += '<option value="' + item.customer_id + '">'+ item.name + '/' + item.address + '</option>';
            });
            html_response += '</select>';

            $('.acount_confirm').html(html_response); //取得したHTMLを.resultに反映
            const verify = $('#regist_order2'); // jQueryオブジェクトに変換
            verify.removeClass("hide");
            }
        ).fail(function(data){
            /* 通信失敗時 */
            alert('通信失敗！');
                    
        });
    });


$('#regist_order').click(function() {
    // テーブルのデータを取得
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const tableData = [];
    const quantities = []; // 追加
    const itemids = []; // 追加
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = {
            itemid: cells[0].querySelector('input').value,
            quantity: cells[2].textContent,
        };
        tableData.push(rowData);
        quantities.push(cells[2].textContent); // 追加
        itemids.push(cells[0].querySelector('input').value); // 追加
    }
    
    // Ajaxリクエストを送信
    $.ajax({
        url: './ajax/confirm_regist.php',
        type: 'GET',
        data: {
            customer_id: $('#customer_id-select').val(),
            tableData: JSON.stringify(tableData),
            quantity: quantities, // 追加
            itemid: itemids, // 追加
        }
    })
    .done(function(data) {
        /* 通信成功時 */
        alert('注文が確定しました。お買い上げありがとうございます.');
        location.reload();
        // ここで必要ならばページのリロードや他の処理を行う
    }).fail(function(data) {
        /* 通信失敗時 */
        alert('エラーが発生しました。');
    });
});




$('#regist_order2').click(function() {
    // テーブルのデータを取得
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const tableData = [];
    const quantities = []; // 追加
    const itemids = []; // 追加
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = {
            itemid: cells[0].querySelector('input').value,
            quantity: cells[2].textContent,
        };
        tableData.push(rowData);
        quantities.push(cells[2].textContent); // 追加
        itemids.push(cells[0].querySelector('input').value); // 追加
    }
    
    // Ajaxリクエストを送信
    $.ajax({
        url: './ajax/confirm_regist.php',
        type: 'GET',
        data: {
            customer_id: $('#customer_id-confirm').val(),
            tableData: JSON.stringify(tableData),
            quantity: quantities, // 追加
            itemid: itemids, // 追加
        }
    })
    .done(function(data) {
        /* 通信成功時 */
        alert('注文が確定しました。お買い上げありがとうございます.');
        // ここで必要ならばページのリロードや他の処理を行う
    }).fail(function(data) {
        /* 通信失敗時 */
        alert('エラーが発生しました。');
    });
});

});