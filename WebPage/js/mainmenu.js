$(document).ready(function () {
    // 初めにhidden-text_1を表示する
    $("#hidden-text_1").removeClass('hide');
  
    // クリックイベントを設定
    $("#btn_1").click(function() {
      changetab(1);
    });
  
    $("#btn_2").click(function() {
      changetab(2);
    });
  
    $("#btn_3").click(function() {
      changetab(3);
    });
  
    $("#btn_4").click(function() {
      changetab(4);
    });
  
    $("#btn_5").click(function() {
      changetab(5);
    });
  });
  
  let lastClickedIndex = 1;
  
  function changetab(index) {
    // Hide the previously clicked element
    $(`#hidden-text_${lastClickedIndex}`).addClass('hide');
  
    // Show the clicked element
    $(`#hidden-text_${index}`).removeClass('hide');
  
    // Update the lastClickedIndex
    lastClickedIndex = index;
  }
  
  function changeImage(isMouseOver) {
    const image = document.getElementById('image');
    if (isMouseOver) {
      image.src = "./img/gekimetu.jpg";  // マウスオーバー時の画像のパス
    } else {
      image.src = './img/humetu.jpg';  // マウスアウト時の画像のパス
    }
  }




  // 表のスクリプト
  function addClickListeners() {
    const submitButtons = document.querySelectorAll('.submit_btn');
  
    submitButtons.forEach((button, index) => {
      button.addEventListener('click', (event) => {
        const targetLi = event.target.closest('li');
        const itemId = targetLi ? targetLi.id : '';
  
        if (!itemId) {
          console.error('Could not find item ID.');
          return;
        }
  
        const itemName = targetLi.querySelector('img').alt;
        const price = parseInt(targetLi.querySelector('.price').textContent);
        const quantityInput = targetLi.querySelector('.quantity');
        const quantity = validateQuantity(quantityInput.value, quantityInput.min, quantityInput.max);        
  
        const taxRate = 0.1;  // 10%の消費税率を仮定
  
        const totalPriceExcludingTax = price * quantity;
        const taxAmount = Math.round(totalPriceExcludingTax * taxRate);
        const totalPriceWithTax = totalPriceExcludingTax + taxAmount;
  
        // すでに同じ名前のアイテムが存在するかチェック
        const existingRow = findRowByItemName(itemName);
       
        if (existingRow) {
          // すでに存在する場合は値を更新
          updateRow(existingRow, price, quantity, taxAmount, totalPriceWithTax);
        } else {
          // 存在しない場合は新しい行を追加
          addNewRow(itemName, price, quantity, taxAmount, totalPriceWithTax);
        }
  
        // 総合計を更新
        updateTotalPrice();
      });
    });
  }
  function validateQuantity(inputValue, min, max) {
    let quantity = parseInt(inputValue);
  
    // 最小値未満の場合は最小値に合わせる
    if (quantity < parseInt(min)) {
      quantity = parseInt(min);
    }
  
    // 最大値を超える場合は最大値に合わせる
    if (quantity > parseInt(max)) {
      quantity = parseInt(max);
    }
  
    return quantity;
  }
  function findRowByItemName(itemName) {
    const table = document.getElementById('buyitem').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0 && cells[0].textContent === itemName) {
        return rows[i];
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
  
    itemCell.textContent = itemName;
    priceCell.textContent ="￥"+ price;
    quantityCell.textContent = quantity;
    taxCell.textContent ="￥"+  taxAmount;
    totalCell.textContent ="￥"+  totalPriceWithTax;
    updateTotalPrice(); // 総合計を更新
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
  
  
  addClickListeners();
  