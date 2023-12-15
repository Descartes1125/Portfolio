$(function(){
    $.ajax({
        url: './ajax/card_data.php',
        type: 'GET',
        dataType: 'json',
    }).done(function(data){
        var html_response = '<tbody>';

        html_response += '<tr>';
        html_response += '<th>カード</th>';
        html_response += '<th>id</th>';
        html_response += '<th>カード名</th>';
        html_response += '<th>タイプ</th>';
        html_response += '<th>価格</th>';
        html_response += '<th>在庫</th>';
        html_response += '</tr>';

        $.each(data, function(index, item){
            
            html_response +='<tr>';
            html_response +='<td>' + '<div class="img_wrapper"><img class="card_img" src="./img/' +  item.image + '"></td>';
            html_response +='<td>' + item.card_id + '</td>';           
            html_response +='<td>' + item.card_name + '</td>';
            html_response +='<td>' + item.type_name + '</td>';
            html_response +='<td>' + item.price + '</td>';
            html_response +='<td>' + item.stock + '</td>';
            stock = item.stock ;
            if(stock < 1){
                html_response += '<td><img class="soldout" src="./img/shopping_urikiremashita_man.png"></td>';
            };
            html_response +='</div></tr>';
            });
            
        html_response += '</tbody>';
        $('.results').html(html_response); // 取得したHTMLを.resultに反映
    }).fail(function(data){
        // 通信失敗時
        alert('通信失敗！');
    });

    
        // カード画像がクリックされたときの処理
        $(document).on('click', '.card_img', function() {

                        var cardSrc = $(this).attr('src');
                        var cardName = $(this).closest('tr').find('td:eq(2)').text();
                        var cardType = $(this).closest('tr').find('td:eq(3)').text();
                        var cardPrice = $(this).closest('tr').find('td:eq(4)').text().trim();
                        var cardStock = $(this).closest('tr').find('td:eq(5)').text().trim();
                        var cardid = $(this).closest('tr').find('td:eq(1)').text(); // カードのIDを取得
                        

            // モーダルにカード情報をセット
                        $('#selectedCard').attr('src', cardSrc);
                        $('#cardid').html('<div>' + cardid + '</div>');
                        $('#cardName').html('<p>' + cardName + '</p>');
                        $('#cardType').html('<p>' + cardType + '</p>');
                        $('#cardPrice').html('<input type="text" value="' + cardPrice.trim() + '">');
                        $('#cardStock').html('<input type="text" value="' + cardStock.trim() + '">');

                        

            const modal = $("#js-modal");
            const overlay = $("#js-overlay");
            const close = $("#js-close");
    
            modal.addClass("open"); // modalクラスにopenクラス付与
            overlay.addClass("open"); // overlayクラスにopenクラス付与
            });

            // closeボタンがクリックされたときの処理
                $('#js-close').on('click', function () {
                    const modal = $("#js-modal");
                    const overlay = $("#js-overlay");

                    modal.removeClass("open"); // modalからopenクラスを外す
                    overlay.removeClass("open"); // overlayからopenクラスを外す
                });
            });