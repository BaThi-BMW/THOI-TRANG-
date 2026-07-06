/**
 * VOGUE.VN - JavaScript Logic Control
 * Xử lý popup đăng nhập, gửi bình luận động và điều hướng link liên quan.
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. XỬ LÝ POPUP ĐĂNG NHẬP ---
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.getElementById("closeBtn");
    const loginForm = loginModal?.querySelector("form");

    if (loginBtn && loginModal) {
        // Mở popup khi nhấn "Đăng Ngập" trên Menu
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            loginModal.style.display = "flex";
        });

        // Đóng bằng nút dấu X
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                loginModal.style.display = "none";
            });
        }

        // Đóng khi click ra vùng trống ngoài biểu mẫu
        window.addEventListener("click", function (e) {
            if (e.target === loginModal) {
                loginModal.style.display = "none";
            }
        });
    }

    // Xử lý sự kiện gửi form Đăng nhập
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const emailInput = loginForm.querySelector("input[type='email']");
            
            if (emailInput) {
                alert(`Chào mừng thành viên [ ${emailInput.value} ] đã đăng nhập thành công!`);
                loginModal.style.display = "none";
                
                // Đổi trạng thái menu từ Đăng nhập thành Tài khoản
                if (loginBtn) loginBtn.textContent = "Tài Khoản";
                loginForm.reset();
            }
        });
    }


    // --- 2. XỬ LÝ THÊM BÌNH LUẬN ĐỘNG (Trang Chi Tiết) ---
    const commentForm = document.querySelector(".comment-form");
    const commentList = document.querySelector(".comment-list");

    if (commentForm && commentList) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const textarea = commentForm.querySelector("textarea");
            const content = textarea.value.trim();

            if (!content) {
                alert("Vui lòng gõ nội dung phản hồi!");
                return;
            }

            // Tạo cấu trúc phần tử bình luận mới
            const item = document.createElement("div");
            item.className = "comment-item";
            item.innerHTML = `
                <strong style="color: #ff3366;">Bạn (Vừa xong):</strong>
                <p style="font-size: 14px; margin-top: 5px;">${content}</p>
            `;

            // Chèn bình luận mới lên trên cùng danh sách
            commentList.insertBefore(item, commentList.firstChild);
            
            // Reset lại ô nhập liệu và thông báo
            textarea.value = "";
            alert("Bình luận của bạn đã được đăng công khai!");
        });
    }


    // --- 3. MÔ PHỎNG CLICK BÀI VIẾT LIÊN QUAN ---
    const relatedLinks = document.querySelectorAll(".related-links a");
    relatedLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.getAttribute("href") === "#") {
                e.preventDefault();
                alert(`Hệ thống đang tải bài viết liên quan:\n"${this.innerText}"`);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang mượt mà
            }
        });
    });
});