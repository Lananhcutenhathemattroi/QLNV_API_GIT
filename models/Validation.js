var Validation = function () {
    //value:giá trị người dùng nhập từ input
    //name: Tên thuộc tính kiểm tra
    //selectorError: thẻ mà mình sẽ hiển thị lỗi
    this.kiemTraRong = function (value,name,selectorError) {
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            document.querySelector(selectorError).className = 'alert alert-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }
    this.kiemTraTatKyTu = function (value,name,selectorError) {
        //Chuỗi định dạng kiểm tra tất cả là ký tự không có số hay ký tự đặc biệt
        var regexLetter = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/; 
        if(!regexLetter.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraEmail = function (value,name,selectorError) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaLaSo = function (value,name,selectorError) {
        var regexAllNumber = /^[0-9]+$/;
        if(!regexAllNumber.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function (value,name,selectorError,minValue,maxValue) {
        if(Number(value)<minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue +' đến '+ maxValue + ' !';
            return false;
        }
        document.querySelector(selectorError).innerHTML ='';
        return true;
    }

    this.kiemTraDoDai = function (value,name,selectorError,minLength,maxLength) {
        if(value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ' từ '+ minLength + ' đến ' + maxLength +' ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}