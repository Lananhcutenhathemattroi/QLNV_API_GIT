//Khai báo sự kiện khi người dùng click vào nút xác nhận

var validate = new Validation();
var mangSinhVien = []; //Mảng chứa nội dung sinh viên được người dùng thêm vào sau khi nhập liệu

document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo đối tượng chứa dữ liệu nhập từ người dùng

    let maNhanVien = document.querySelector('#maNhanVien').value;
    let tenNhanVien = document.querySelector('#tenNhanVien').value;
    let luongCoBan = document.querySelector('#luongCoBan').value;
    let soGioLam = document.querySelector('#soGioLam').value;
    let sel = document.querySelector('#chucVu');
    let heSoChucVu = sel.value;
    let chucVu = sel.options[sel.selectedIndex].text;
    

    //----------------Kiểm tra dữ liệu hợp lệ ----------------
    // -------Kiểm tra rổng-----------
    let valid = true;

    valid &= validate.kiemTraRong(maNhanVien, 'Mã nhân viên', '#kiemTraRong-maNhanVien') 
    & validate.kiemTraRong(tenNhanVien, 'Tên sinh viên', '#kiemTraRong-tenNhanVien') 
    & validate.kiemTraRong(luongCoBan, 'Lương cơ bản', '#kiemTraRong-luongCoBan')
    & validate.kiemTraRong(soGioLam,'Số giờ làm', '#kiemTraRong-soGioLam');

    // Kiểm tra định dạng
    valid &= validate.kiemTraTatKyTu(tenNhanVien, 'Tên nhân viên', '#kiemTraDinhDang-tenNhanVien');
    //Kiểm tra độ dai

    valid &= validate.kiemTraDoDai(maNhanVien,'Mã nhân viên','#kiemTraDoDai-maNhanVien',4,6);

    valid &= validate.kiemTraGiaTri(luongCoBan,'Lương cơ bản' ,'#kiemTraGiaTri-luongCoBan',1000000,20000000)
    & validate.kiemTraGiaTri(soGioLam,'Số giờ làm','#kiemTraGiaTri-soGioLam',50,150);
    


    if (!valid) {
        return;
    }

    const dataNhanVien = {
        "maNhanVien": maNhanVien,
        "tenNhanVien":tenNhanVien,
        "chucVu": chucVu,
        "heSoChucVu": heSoChucVu,
        "luongCoBan": luongCoBan,
        "soGioLamTrongThang": soGioLam
        }
    axios({
        method: "POST",
        url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        data: dataNhanVien
    }).then(res => {
        loadDuLieuNhanVien();
    }).catch(err => {
        console.log(err);
    })
    }


    var renderTableNhanVien = function (arrSinhVien) {
        var noiDungTable = '';
        for (var i = 0; i < arrSinhVien.length; i++) {
            //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangSinhVien
            var sv = new SinhVien();
            sv.maNhanVien = arrSinhVien[i].maNhanVien;
            sv.tenNhanVien = arrSinhVien[i].tenNhanVien;
        sv.chucVu = arrSinhVien[i].chucVu;
        sv.heSoChucVu = arrSinhVien[i].heSoChucVu;
        sv.luongCoBan = arrSinhVien[i].luongCoBan
        sv.soGioLam = arrSinhVien[i].soGioLamTrongThang;
        noiDungTable += `
                <tr>
                    <td>${sv.maNhanVien}</td>
                    <td>${sv.tenNhanVien}</td>
                    <td>${sv.chucVu}</td>
                    <td>${sv.luongCoBan}</td>
                    <td>${sv.tinhLuong()}</td>
                    <td>${sv.soGioLam}</td>
                    <td>${sv.xepLoaiNhanVien()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maNhanVien}')">Xóa</button>  
                        <button class="btn btn-success" onclick="layThongTinNhanVien('${sv.maNhanVien}')">Chỉnh Sửa</button>    
                    </td>
                </tr> 
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
    console.log(noiDungTable);
}


//Định nghĩa hàm khi nút xóa sinh viên click
var xoaSinhVien = function (maSV) {
    // alert(maSV);
    axios({
        method: 'DELETE',
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien='+ maSV,
    }).then(res => {loadDuLieuNhanVien();})
    .catch(err => {console.log(err);})
}
const layThongTinNhanVien = function(maSV){
    document.querySelector("#maNhanVien").disabled = true;
    document.querySelector("#btnXacNhan").disabled = true;
    document.querySelector("#btnCapNhat").disabled = false;
    axios({
        method: 'GET',
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien='+ maSV
    }).then(res => {xuatThongTinNhanVien(res.data);})
    .catch(err => {console.log(err);})
}
const xuatThongTinNhanVien = function(dataXuat){
    document.querySelector('#maNhanVien').value = dataXuat.maNhanVien;
    document.querySelector('#tenNhanVien').value = dataXuat.tenNhanVien;
    document.querySelector('#chucVu').value = dataXuat.heSoChucVu;
    document.querySelector('#luongCoBan').value = dataXuat.luongCoBan;
    document.querySelector('#soGioLam').value = dataXuat.soGioLamTrongThang;
}

document.querySelector('#btnCapNhat').onclick = function(){
    let maNhanVien = document.querySelector('#maNhanVien').value;
    let tenNhanVien = document.querySelector('#tenNhanVien').value;
    let luongCoBan = document.querySelector('#luongCoBan').value;
    let soGioLam = document.querySelector('#soGioLam').value;
    let sel = document.querySelector('#chucVu');
    let heSoChucVu = sel.value;
    let chucVu = sel.options[sel.selectedIndex].text;
    const dataNhanVien = {
        "maNhanVien": maNhanVien,
        "tenNhanVien":tenNhanVien,
        "chucVu": chucVu,
        "heSoChucVu": heSoChucVu,
        "luongCoBan": luongCoBan,
        "soGioLamTrongThang": soGioLam
    };
    axios({
        method: 'PUT',
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+ maNhanVien,
        data: dataNhanVien
    }).then(res => {
        console.log("success");
        loadDuLieuNhanVien()})
    .catch( err => {console.log(err);})

}


//--------------ADD------------------
const loadDuLieuNhanVien = function(){
    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET'
    }).then(res => {renderTableNhanVien(res.data);})
    .catch(err => {err})

}
loadDuLieuNhanVien();
