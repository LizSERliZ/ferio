let isEditing = false;

function toggleEditMode() {
    isEditing = !isEditing;
    const editableElements = [document.getElementById('user-name'), document.getElementById('user-bio')];
    
    editableElements.forEach(el => {
        el.contentEditable = isEditing;
        el.style.border = isEditing ? '1px dashed #999' : 'none';
    });

    document.getElementById('edit-btn').innerText = isEditing ? 'Cancel' : 'Edit information';
    document.getElementById('save-btn').style.display = isEditing ? 'inline-block' : 'none';
}

function saveData() {
    const name = document.getElementById('user-name').innerText;
    const bio = document.getElementById('user-bio').innerText;

    localStorage.setItem('portfolio_name', name);
    localStorage.setItem('portfolio_bio', bio);

    alert('Saved!');
    toggleEditMode();
}

window.onload = function() {
    if (localStorage.getItem('portfolio_name')) {
        document.getElementById('user-name').innerText = localStorage.getItem('portfolio_name');
    }
    if (localStorage.getItem('portfolio_bio')) {
        document.getElementById('user-bio').innerText = localStorage.getItem('portfolio_bio');
    }
};

// ฟังก์ชันเมื่อกด See More ในหมวดที่เลือก
function expandCategory(category) {
    const mainContainer = document.getElementById('main-portfolio');
    const cols = {
        music: document.getElementById('col-music'),
        video: document.getElementById('col-video'),
        photo: document.getElementById('col-photo')
    };

    // ซ่อนหมวดหมู่อื่นๆ ทั้งหมด
    Object.keys(cols).forEach(key => {
        if (key !== category) {
            cols[key].style.display = 'none';
        }
    });

    // แสดงรายการเพิ่มเติมในหมวดที่เลือก
    const selectedCol = cols[category];
    const hiddenItems = selectedCol.querySelectorAll('.extra-item');
    hiddenItems.forEach(item => item.classList.remove('hidden'));

    // ซ่อนปุ่ม See More ในคอลัมน์นั้น
    selectedCol.querySelector('.see-more-btn').style.display = 'none';

    // เปิดโหมดขยายเต็มหน้า
    mainContainer.classList.add('expanded-mode');
    document.getElementById('reset-view-btn').style.display = 'inline-block';
}

// ฟังก์ชันรีเซ็ตกลับมาแสดงทั้ง 3 หมวดพร้อมกัน
function showAllCategories() {
    const mainContainer = document.getElementById('main-portfolio');
    const cols = document.querySelectorAll('.media-column');

    cols.forEach(col => {
        col.style.display = 'block';
        col.querySelector('.see-more-btn').style.display = 'block';
        
        // ซ่อนการ์ดเสริมกลับไป
        const extraItems = col.querySelectorAll('.extra-item');
        extraItems.forEach(item => item.classList.add('hidden'));
    });

    mainContainer.classList.remove('expanded-mode');
    document.getElementById('reset-view-btn').style.display = 'none';
}
function showAllCategories() {
    const mainContainer = document.getElementById('main-portfolio');
    const cols = document.querySelectorAll('.media-column');

    cols.forEach(col => {
        col.style.display = 'flex'; // คืนค่ากลับเป็น flex เพื่อรักษาทรงความสูงเท่ากัน
        
        const seeMoreBtn = col.querySelector('.see-more-btn');
        if (seeMoreBtn) seeMoreBtn.style.display = 'block';
        
        // ซ่อนการ์ดเสริม
        const extraItems = col.querySelectorAll('.extra-item');
        extraItems.forEach(item => item.classList.add('hidden'));
    });

    if (mainContainer) mainContainer.classList.remove('expanded-mode');
    
    const resetBtn = document.getElementById('reset-view-btn');
    if (resetBtn) resetBtn.style.display = 'none';
}