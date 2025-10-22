// TÌM KIẾM SẢN PHẨM 

// Lấy các phần tử cần thiết
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Gắn sự kiện click cho nút tìm
searchBtn.addEventListener('click', searchProducts);

// Cũng cho phép tìm kiếm khi nhấn Enter trong ô input
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Hàm xử lý tìm kiếm
function searchProducts() {
    // Lấy giá trị từ ô input và chuyển về chữ thường
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Lấy tất cả sản phẩm
    const products = document.querySelectorAll('.product-item');
    
    // Duyệt qua từng sản phẩm
    products.forEach(function(product) {
        // Lấy tên sản phẩm (trong thẻ h3)
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        // Kiểm tra tên có chứa từ khóa tìm kiếm không
        if (productName.includes(searchTerm)) {
            // Nếu có, hiển thị sản phẩm
            product.style.display = '';
        } else {
            // Nếu không, ẩn sản phẩm
            product.style.display = 'none';
        }
    });
    
    // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
    if (searchTerm === '') {
        products.forEach(function(product) {
            product.style.display = '';
        });
    }
}

// Tìm kiếm real-time khi người dùng gõ
searchInput.addEventListener('input', searchProducts);


// ===== XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM =====

// Lấy phần tử form và nút
const addProductForm = document.getElementById('addProductForm');
const addProductBtn = document.getElementById('addProductBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Gắn sự kiện click cho nút "Thêm sản phẩm"
addProductBtn.addEventListener('click', function() {
    // Toggle (ẩn/hiện) form bằng classList
    addProductForm.classList.toggle('hidden');
});

// Xử lý nút "Hủy" - ẩn form khi click
cancelBtn.addEventListener('click', function() {
    addProductForm.classList.add('hidden');
    // Reset form khi hủy
    addProductForm.reset();
    // Xóa thông báo lỗi
    document.getElementById('errorMsg').textContent = '';
});


// ===== XỬ LÝ THÊM SẢN PHẨM MỚI =====

// Lấy các phần tử của form
const productNameInput = document.getElementById('productName');
const productDescInput = document.getElementById('productDesc');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const errorMsg = document.getElementById('errorMsg');
const productsContainer = document.getElementById('products-container');

// Hàm validate dữ liệu
function validateProductData(name, price, desc) {
    // Kiểm tra tên sản phẩm không được rỗng
    if (!name || name.trim() === '') {
        return 'Tên sản phẩm không được để trống!';
    }
    
    // Kiểm tra tên không quá ngắn
    if (name.trim().length < 3) {
        return 'Tên sản phẩm phải có ít nhất 3 ký tự!';
    }
    
    // Kiểm tra giá phải là số hợp lệ
    if (!price || isNaN(price)) {
        return 'Giá sản phẩm phải là số!';
    }
    
    // Kiểm tra giá phải lớn hơn 0
    if (parseFloat(price) <= 0) {
        return 'Giá sản phẩm phải lớn hơn 0!';
    }
    
    // Kiểm tra mô tả không được quá ngắn
    if (!desc || desc.trim().length < 10) {
        return 'Mô tả sản phẩm phải có ít nhất 10 ký tự!';
    }
    
    // Nếu tất cả đều hợp lệ
    return null;
}

// Hàm tạo sản phẩm mới
function createProductElement(name, desc, price, image) {
    // Tạo thẻ article mới
    const article = document.createElement('article');
    article.className = 'product-item';
    
    // Tạo nội dung HTML cho sản phẩm
    article.innerHTML = `
        <img src="${image || 'https://via.placeholder.com/200x300'}" alt="${name}" width="200" height="300">
        <h3>${name}</h3>
        <p>${desc}</p>
        <p class="price"><strong>Giá: ${parseInt(price).toLocaleString('vi-VN')} VNĐ</strong></p>
    `;
    
    return article;
}

// Xử lý sự kiện submit form
addProductForm.addEventListener('submit', function(event) {
    // Ngăn form submit mặc định (tránh reload trang)
    event.preventDefault();
    
    // Lấy giá trị từ các trường input
    const name = productNameInput.value;
    const desc = productDescInput.value;
    const price = productPriceInput.value;
    const image = productImageInput.value;
    
    // Validate dữ liệu
    const error = validateProductData(name, price, desc);
    
    // Nếu có lỗi, hiển thị thông báo
    if (error) {
        errorMsg.textContent = error;
        return; // Dừng lại, không thêm sản phẩm
    }
    
    // Xóa thông báo lỗi (nếu có)
    errorMsg.textContent = '';
    
    // Tạo phần tử sản phẩm mới
    const newProduct = createProductElement(name, desc, price, image);
    
    // Thêm sản phẩm vào đầu danh sách
    productsContainer.insertBefore(newProduct, productsContainer.firstChild);
    
    // Reset form
    addProductForm.reset();
    
    // Ẩn form
    addProductForm.classList.add('hidden');
    
    // Hiển thị thông báo thành công (tuỳ chọn)
    alert('Thêm sản phẩm thành công!');
});

