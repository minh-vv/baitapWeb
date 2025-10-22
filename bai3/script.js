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
});

