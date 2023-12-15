$(function () {
   

    $(document).on('click', '#Dark_type', function() {
        toggleElements('.Dark');
    });

    $(document).on('click', '#Water_type', function() {
        toggleElements('.Water');
    });

    $(document).on('click', '#trainers_type', function() {
        toggleElements('.trainers');
    });

    $(document).on('click', '#Grass_type', function() {
        toggleElements('.Grass');
    });
    $(document).on('click', '#Fire_type', function() {
        toggleElements('.Fire');
    });
    $(document).on('click', '#Electric_type', function() {
        toggleElements('.Electric');
    });
    $(document).on('click', '#Psychic_type', function() {
        toggleElements('.Psychic');
    });
    $(document).on('click', '#Fighting_type', function() {
        toggleElements('.Fighting');
    });
    $(document).on('click', '#Steel_type', function() {
        toggleElements('.Steel');
    });
    $(document).on('click', '#Fairy_type', function() {
        toggleElements('.Fairy');
    });
    $(document).on('click', '#Dragon_type', function() {
        toggleElements('.Dragon');
    });
    $(document).on('click', '#Normal_type', function() {
        toggleElements('.Normal');
    });
    $(document).on('click', '#SAR_type', function() {
        toggleElements('.SAR');
    });

    function toggleElements(className) {
        var elements = document.querySelectorAll(className);

        elements.forEach(function (element) {
            element.classList.toggle('hide');
        });
    }
});
function addClickListeners() {
    const addButtonList = document.querySelectorAll('.card_wrapper #Cartin_button');
  
    addButtonList.forEach((button, index) => {
      button.addEventListener('click', (event) => {
        const targetLi = event.target.closest('.card_wrapper');
        const itemID = targetLi.querySelector('.id_holder').value;
        const itemName = '<input type="hidden" value="' + itemID + '">' + targetLi.querySelector('.card_name').textContent;

        const price = parseInt(targetLi.querySelector('.card_price').textContent.slice(1)); // 価格は '￥xxx' の形式と仮定
        const quantityInput = targetLi.querySelector('select');
        const quantity = quantityInput.value; 
  
        const taxRate = 0.1; // 10%の消費税率を仮定
  
        const totalPriceExcludingTax = price * quantity;
        const taxAmount = Math.round(totalPriceExcludingTax * taxRate);
        const totalPriceWithTax = totalPriceExcludingTax + taxAmount;
  
        // すでに同じ名前のアイテムが存在するかチェック
        const existingRow = findRowByItemName(itemName);

        if (quantity === "0") {
          // Quantityが0の場合、対象行を削除
          if (existingRow) {
              deleteRow(existingRow);
          }
      } else{
        
  
        if (existingRow) {
          // すでに存在する場合は値を更新
          updateRow(existingRow, price, quantity, taxAmount, totalPriceWithTax);
        } else {
          // 存在しない場合は新しい行を追加
          addNewRow(itemName, price, quantity, taxAmount, totalPriceWithTax);
        }
  }
        // 総合計を更新
        updateTotalPrice();
      });
    });
  }
  function findRowByItemName(itemName) {
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length > 0) {
            const existingItemName = cells[0].innerHTML; // HTML をそのまま取得
            if (existingItemName.includes(itemName)) {
                return rows[i];
            }
        }
    }

    return null;
}


  
  
  function updateRow(row, price, quantity, taxAmount, totalPriceWithTax) {
    const cells = row.getElementsByTagName('td');
    if (cells.length >= 5) {
      cells[1].textContent ="￥"+  price;
      cells[2].textContent = quantity;
      cells[3].textContent ="￥"+  taxAmount;
      cells[4].textContent ="￥"+  totalPriceWithTax;
      updateTotalPrice(); // 総合計を更新
    }
  }
  
  function addNewRow(itemName, price, quantity, taxAmount, totalPriceWithTax) {
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(-1);
  
    const itemCell = newRow.insertCell(0);
    const priceCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);
    const taxCell = newRow.insertCell(3);
    const totalCell = newRow.insertCell(4);
  
    itemCell.innerHTML = itemName;
    priceCell.textContent ="￥"+ price;
    quantityCell.textContent = quantity;
    taxCell.textContent ="￥"+  taxAmount;
    totalCell.textContent ="￥"+  totalPriceWithTax;
    updateTotalPrice(); // 総合計を更新
  }
  function deleteRow(row) {
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    table.removeChild(row);
}
  
  function updateTotalPrice() {
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    let total = 0;
  
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      if (cells.length >= 5) {
        // 「￥」を除去して数値に変換
        const totalPrice = parseFloat(cells[4].textContent.replace('￥', ''));
        if (!isNaN(totalPrice)) {
          total += totalPrice;
        }
      }
    }
  
    // 総合計を更新
    const totalCell = document.querySelector('#totalPrice');
    if (totalCell) {
      totalCell.textContent = '￥' + total; // 小数点以下2桁まで表示
    }
  }
  $('#order_confirm').click(function () {
    const confirm_b = $('#user_choice'); // jQueryオブジェクトに変換
    confirm_b.removeClass("hide");
  });
  
   $('#Yes_button').click(function () {
    const confirm_a = $('.user_regist'); // jQueryオブジェクトに変換
    confirm_a.removeClass("hide");
    const confirm_b = $('.login'); // jQueryオブジェクトに変換
    confirm_b.addClass("hide");
  });
  $('#No_button').click(function () {
    const confirm_a = $('.user_regist'); // jQueryオブジェクトに変換
    confirm_a.addClass("hide");
    const confirm_b = $('.login'); // jQueryオブジェクトに変換
    confirm_b.removeClass("hide");
  });

const postalCodeInput = document.getElementById('postal_input');
const addressInput = document.getElementById('adress_input');

postalCodeInput.addEventListener('blur', function() {
  const postalCode = postalCodeInput.value.trim();

  // 郵便番号が入力されているかチェック
  if (postalCode !== '') {
    // 郵便番号APIを利用して住所を取得
    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          // 取得した住所を各Inputに自動入力
          const addressData = data.results[0];
          addressInput.value = addressData.address1+addressData.address2+addressData.address3;
        } else {
          console.error('郵便番号から住所を取得できませんでした。');
        }
      })
      .catch(error => {
        console.error('APIリクエストエラー:', error);
      });
  }
});
function preventEnterSubmitAndMoveNext(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      let inputs = document.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {
          if (inputs[i] === event.target) {
              if (i + 1 < inputs.length) {
                  inputs[i + 1].focus();
                  break;
              }
          }
      }
      return false;
  }
}