//名前
const inputName = document.getElementById('name_input');

inputName.addEventListener('keydown',validateName);
inputName.addEventListener('keyup',validateName);
inputName.addEventListener('change',validateName);
inputName.addEventListener('blur',validateName);

function validateName(){
  const inputValue = inputName.value.trim();
  const hasNumbersOrSymbols = /[0-9０-９!@＠#＃$＄%^％&＆*()（）,．。?？"“”：:{}｛｝|｜<>＜＞]/.test(inputValue);
  
  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $(inputName).removeClass('error_point');
    $(inputName).addClass('checkok');
    $("#name_error").hide();
    $("#name_error2").hide();

    if (hasNumbersOrSymbols){
        $(inputName).addClass('error_point');
        $(inputName).removeClass('checkok');
        $("#name_error2").show();
    } else {
        $(inputName).removeClass("error_point");
        $(inputName).addClass('checkok');
        $("#name_error").hide();
        $("#name_error2").hide();
    } 
  } else {
    // 入力が空の場合の処理
    $(inputName).addClass('error_point');
    $(inputName).removeClass("checkok");
    $("#name_error").show();
  } 
}

//メールアドレス
const inputMail = document.getElementById('mail_input');

inputMail.addEventListener('keydown',validateMail);
inputMail.addEventListener('keyup',validateMail);
inputMail.addEventListener('change',validateMail);
inputMail.addEventListener('blur',validateMail);

function validateMail(){
  const inputValue = inputMail.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
  const hasInvalidChars = /[一-龯ぁ-ん]/.test(inputValue); // 漢字とひらがな
  const hasSymbols = /[!#＃$＄%^％&＆*()（）,。?？"“”：:{}｛｝|｜<>＜＞]/u.test(inputValue);

  if (inputValue !== '') {
      // 入力が空でない場合の処理
      $(inputMail).removeClass("error_point");
      $(inputMail).addClass('checkok');
      $("#mail_error").hide();
      $("#mail_error2").hide();
    
      if (emailPattern && !hasInvalidChars && !hasSymbols){
        $(inputMail).removeClass('error_point');
        $(inputMail).addClass('checkok');
        $("#mail_error").hide();
        $("#mail_error2").hide();
      } else {
        $(inputMail).addClass('error_point');
        $(inputMail).removeClass('checkok');
        $("#mail_error").hide();
        $("#mail_error2").show();
      }
  } else {
    // 入力が空の場合の処理
    $(inputMail).addClass('error_point');
    $(inputMail).removeClass('checkok');
    $("#mail_error").show();
    $("#mail_error2").hide();
  }  
}



//郵便番号
const inputPostCode = document.getElementById('postal_input');

inputPostCode.addEventListener('keydown',validatePostCode);
inputPostCode.addEventListener('keyup',validatePostCode);
inputPostCode.addEventListener('change',validatePostCode);
inputPostCode.addEventListener('blur',validatePostCode);

function validatePostCode(){
  const inputValue = inputPostCode.value.trim();
  const hasValidChars = /^[0-9０-９ー-]/.test(inputValue);
  
  if (inputValue !== '') {
    if (inputValue.length < 7 || !hasValidChars) {
      $(inputPostCode).removeClass('checkok');
      $(inputPostCode).addClass('error_point');
      $("#postal_error2").show();
    } else {
      $(inputPostCode).removeClass("error_point");
      $(inputPostCode).addClass('checkok');
      $("#postal_error").hide();
      $("#postal_error2").hide();
    }
  } else {
    $(inputPostCode).addClass('error_point');
    $(inputPostCode).removeClass('checkok');
    $("#postal_error").show();

  }
}

//住所
const inputAddress = document.getElementById('adress_input');

inputAddress.addEventListener('keydown',validateAddress);
inputAddress.addEventListener('keyup',validateAddress);
inputAddress.addEventListener('change',validateAddress);
inputAddress.addEventListener('blur',validateAddress);

function validateAddress(){
  const inputValue = inputAddress.value.trim();
  const hasSymbols = /[!#＃$＄%^％&＆*()（）,。?？"“”：:{}｛｝|｜<>＜＞]/u.test(inputValue);

  
  if (inputValue !== '') {
    // 入力が空でない場合の処理
    $(inputAddress).removeClass('error_point');
    $(inputAddress).addClass('checkok');
    $("#address_error").hide();

    if (hasSymbols){
        $(inputAddress).addClass('error_point');
        $(inputAddress).removeClass('checkok');
        $("#address_error").hide();
        $("#address_error2").show();
    } else {
        $(inputAddress).removeClass("error_point");
        $(inputAddress).addClass('checkok');
        $("#address_error").hide();
        $("#address_error2").hide();
    } 
  } else {
    // 入力が空の場合の処理
    $(inputAddress).addClass('error_point');
    $(inputAddress).removeClass("checkok");
    $("#address_error").show();
  } 
}

//パス
const inputPassCode = document.getElementById('pass_input');

inputPassCode.addEventListener('keydown',validatePassCode);
inputPassCode.addEventListener('keyup',validatePassCode);
inputPassCode.addEventListener('change',validatePassCode);
inputPassCode.addEventListener('blur',validatePassCode);

function validatePassCode(){
  const inputValue = inputPassCode.value.trim();
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/; //大文字、小文字、数字、それ以外、各1文字以上含まれているか

  if (inputValue !== '') {
    // 入力が空でない場合の処理 8文字未満でないか確認
    if (inputValue.length < 8){
      $(inputPassCode).removeClass('checkok');
      $(inputPassCode).addClass('error_point');
      $("#pass_error2").show();
      $("#pass_error3").hide();
    } else {
      //　条件に合っているか確認
      if(passwordPattern.test(inputValue)){
        $(inputPassCode).removeClass("error_point");
        $(inputPassCode).addClass('checkok');
        $("#pass_error").hide();
        $("#pass_error2").hide();
        $("#pass_error3").hide();
      } else {
        $(inputPassCode).addClass('error_point');
        $(inputPassCode).removeClass('checkok');
        $("#pass_error3").show();
        $("#pass_error2").hide();
      }
    }
  } else {
    // 入力が空の場合の処理
    $(inputPassCode).addClass('error_point');
    $(inputPassCode).removeClass('checkok');
    $("#pass_error").show();
  }  
}  
