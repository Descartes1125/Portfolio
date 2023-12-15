
$('#nextbtn').click(function () {
  // すべてのinput要素が空でないかチェック
  let allInputsFilled = true;
  $('input').each(function () {
    if ($(this).val().trim() === '') {
      allInputsFilled = false;
      return false;  // 1つでも空の場合はループを抜ける
    }
  });

  if (!allInputsFilled) {
    alert('全ての項目を入力してください。');
    return false;
  }

  // すべてのinput要素がerror_pointクラスを持っているかチェック
  let allInputsHaveErrorPoint = true;
  $('input').each(function () {
    if ($(this).hasClass('error_point')) {
      allInputsHaveErrorPoint = false;
      return false;  // 1つでも持っている場合はループを抜ける
    }
  });

  if (allInputsHaveErrorPoint) {

   if (confirm('送信してもいいですか？')) {
    // 「OK」をクリックした際の処理を記述
  } else {
    //キャンセルした場合
    //何も起きない
    return false;
  }


  }else{

  alert('正しく修正してください.');
  return false;
}
});





  /*名前のエラーチェック*/
  const inputElement = document.getElementById('Input_name');
  inputElement.addEventListener('blur', function() {
  const inputValue = inputElement.value.trim();
  const hasNumbersOrSymbols = /[0-9０-９!@＠#＃$＄%^％&＆*()（）,．。?？"“”：:{}｛｝|｜<>＜＞]/.test(inputValue);

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_name").removeClass("error_point");
    $("#name_error").addClass('hide');
    if (hasNumbersOrSymbols){
        $("#Input_name").addClass('error_point');
        $("#name_error2").removeClass("hide");
    } else {
        $("#Input_name").removeClass("error_point");
        $("#name_error2").addClass('hide');
    }
  } else {
    // 入力が空の場合の処理
    $("#Input_name").addClass('error_point');
    $("#name_error").removeClass("hide");
    $("#name_error2").addClass('hide');
  } 
});
/*年齢のエラーチェック*/

const inputAge = document.getElementById('Input_age');

inputAge.addEventListener('blur', function() {
  const inputValue = inputAge.value.trim();

  // 正規表現で数字（半角・全角）が含まれているかチェック
  const hasNumbers = /[0-9０-９]/.test(inputValue);

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_age").removeClass("error_point");
    $("#age_error").addClass('hide');
    if (hasNumbers) {
      // 数字が含まれる場合の処理
      $("#Input_age").removeClass("error_point");
      $("#age_error2").addClass('hide');
    } else {
      // 数字が含まれない場合の処理
      $("#Input_age").addClass('error_point');
      $("#age_error2").removeClass("hide");
    }
  } else {
    // 入力が空の場合の処理
    $("#Input_age").addClass('error_point');
    $("#age_error").removeClass("hide");
    $("#age_error2").addClass('hide');
  }
});

/* 郵便番号から住所を入力するAPI*/

const postalCodeInput = document.getElementById('Input_postal-code');
const addressInput = document.getElementById('Input_adress');
const cityInput = document.getElementById('Input_city');
const townareaInput = document.getElementById('Input_townarea');

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
          addressInput.value = addressData.address1;
          cityInput.value = addressData.address2;
          townareaInput.value = addressData.address3;
        } else {
          console.error('郵便番号から住所を取得できませんでした。');
        }
      })
      .catch(error => {
        console.error('APIリクエストエラー:', error);
      });
  }
});

//メールアドレスのエラーチェック
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  const emailInput = document.getElementById('Input_mail-adress');
  
  emailInput.addEventListener('blur', function() {
    const emailToCheck = emailInput.value;
  
    if (emailToCheck.trim() === '') {
      //メールアドレスが入力されていません
      $("#Input_mail-adress").addClass('error_point');
      $("#mail_adress-error1").removeClass("hide");
      $("#mail_adress-error2").addClass("hide");

    } else if (validateEmail(emailToCheck)) {
      //有効なメールアドレス
      $("#Input_mail-adress").removeClass("error_point");
      $("#mail_adress-error1").addClass("hide");
      $("#mail_adress-error2").addClass("hide");
    } else {
      //無効なメールアドレス
      $("#Input_mail-adress").addClass('error_point');
      $("#mail_adress-error2").removeClass("hide");
      $("#mail_adress-error1").addClass("hide");
    }
  });
  
  const inputpostalcode = document.getElementById('Input_postal-code');
  inputpostalcode.addEventListener('blur', function() {
  const inputValue = inputpostalcode.value.trim();
  const hasNumbersOrSymbols = /[0-9０-９ー-]/.test(inputValue);

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_postal-code").removeClass("error_point");
    $("#postal_code-error1").addClass('hide');
    if (hasNumbersOrSymbols){
      $("#Input_postal-code").removeClass("error_point");
      $("#postal_code-error2").addClass('hide');
      $("#Input_adress").removeClass("error_point");
      $("#adress1_error").addClass('hide');
      $("#Input_city").removeClass("error_point");
      $("#adress2_error").addClass('hide');
      $("#Input_townarea").removeClass("error_point");
    $("#adress3_error").addClass('hide');
    } else {
      $("#Input_postal-code").addClass('error_point');
      $("#postal_code-error2").removeClass("hide");
        
    }
  } else {
    // 入力が空の場合の処理
    $("#Input_postal-code").addClass('error_point');
    $("#postal_code-error1").removeClass("hide");
    $("#postal_code-error2").addClass('hide');
  } 
});


const inputadress1 = document.getElementById('Input_adress');
inputadress1.addEventListener('blur', function() {
  const inputValue = inputadress1.value.trim();

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_adress").removeClass("error_point");
    $("#adress1_error").addClass('hide');
      return;
  } 
    // 入力が空の場合の処理
    $("#Input_adress").addClass('error_point');
    $("#adress1_error").removeClass("hide");
  
});


const inputadress2 = document.getElementById('Input_city');
inputadress2.addEventListener('blur', function() {
  const inputValue = inputadress2.value.trim();

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_city").removeClass("error_point");
    $("#adress2_error").addClass('hide');
      return;
  } 
    // 入力が空の場合の処理
    $("#Input_city").addClass('error_point');
    $("#adress2_error").removeClass("hide");
  
});


const inputadress3 = document.getElementById('Input_townarea');
inputadress3.addEventListener('blur', function() {
  const inputValue = inputadress3.value.trim();

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_townarea").removeClass("error_point");
    $("#adress3_error").addClass('hide');
      return;
  } 
    // 入力が空の場合の処理
    $("#Input_townarea").addClass('error_point');
    $("#adress3_error").removeClass("hide");
  
});

const numberPattern = /^\d{14,16}$/;

function validateNumberLength(inputNumber) {  
  return numberPattern.test(inputNumber);
}

const inputcreditnumber = document.getElementById('Input_credit-number');
inputcreditnumber.addEventListener('blur', function() {
  const inputValue = inputcreditnumber.value.trim();


  if (inputValue !== '') {
    $("#Input_credit-number").removeClass("error_point");
    $("#credit_number-error1").addClass('hide');
    
    if (validateNumberLength(inputValue)) {
      // 正
      $("#Input_credit-number").removeClass("error_point");
      $("#credit_number-error2").addClass('hide');
    } else {
      // 負
      $("#Input_credit-number").addClass('error_point');
      $("#credit_number-error2").removeClass("hide");
    }
  } else {
    // 入力が空の場合の処理
      $("#Input_credit-number").addClass('error_point');
      $("#credit_number-error1").removeClass("hide");
      $("#credit_number-error2").addClass('hide');
  }




});


const password = document.getElementById('Input_password');
password.addEventListener('blur', function() {
  const inputValue = password.value.trim();

  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $("#Input_password").removeClass("error_point");
    $("#password_error").addClass('hide');
      return;
  } 
    // 入力が空の場合の処理
    $("#Input_password").addClass('error_point');
    $("#password_error").removeClass("hide");
  
});


$(document).ready(function() {
  $('#password_ckbtn').mousedown(function() {
    const inputElement = $('#Input_password');
    inputElement.attr('type', 'text');
  });

  $(document).mouseup(function() {
    const inputElement = $('#Input_password');
    inputElement.attr('type', 'password');
  });
});





