//Khai báo lớp đối tượng trong javascript Class (Prototype)
var SinhVien = function () {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.luongCoBan = '';
    this.heSoChucVu = '';
    this.soGioLam = '';
    this.tinhLuong = function () {
        //this trong đối tượng trả về đối tượng
        
            return luong = this.luongCoBan* this.heSoChucVu;   
    };
   this.xepLoaiNhanVien = function () {

        //Tính điểm trung bình gán cho 1 biến
        var tinhGioLam = this.soGioLam;
        if (tinhGioLam >= 50 && tinhGioLam <=80) {
            return 'Nhân viên trung bình';
        } else if (tinhGioLam > 80 && tinhGioLam <= 100) {
            return 'Nhân viên khá';
        } else if (tinhGioLam > 100 && tinhGioLam <= 120) {
            return 'Nhân viên giỏi';
        } else if(tinhGioLam > 120){
            return 'Nhân viên xuất sắc';
        }else{
            return 'Không xác định';
        }
    }
}