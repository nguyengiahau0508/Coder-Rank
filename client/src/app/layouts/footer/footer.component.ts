import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="m-4 bg-dark-blue text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About TDMU -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-light-blue">Đại học Thủ Dầu Một</h3>
            <p class="text-sm">
              Đại học Thủ Dầu Một cam kết đào tạo nguồn nhân lực chất lượng cao, thúc đẩy nghiên cứu khoa học và phát triển cộng đồng bền vững tại Bình Dương và cả nước.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-light-blue">Liên kết nhanh</h3>
            <ul class="text-sm space-y-2">
              <li><a href="https://tdmu.edu.vn" target="_blank" class="hover:text-light-blue transition-colors">Trang chủ TDMU</a></li>
              <li><a href="https://tdmu.edu.vn/academics" target="_blank" class="hover:text-light-blue transition-colors">Chương trình đào tạo</a></li>
              <li><a href="https://tdmu.edu.vn/research" target="_blank" class="hover:text-light-blue transition-colors">Nghiên cứu khoa học</a></li>
              <li><a href="https://tdmu.edu.vn/admissions" target="_blank" class="hover:text-light-blue transition-colors">Tuyển sinh</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-light-blue">Liên hệ</h3>
            <ul class="text-sm space-y-2">
              <li>Địa chỉ: Số 6, Trần Văn Ơn, Phú Hòa, Thủ Dầu Một, Bình Dương</li>
              <li>Email: <a href="mailto:info@tdmu.edu.vn" class="hover:text-light-blue transition-colors">tdmu.edu.vn</a></li>
              <li>Hotline: <a href="tel:+842743822483" class="hover:text-light-blue transition-colors">+84 274 382 2483</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
          <p>© 2025 Đại học Thủ Dầu Một. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }
    .bg-dark-blue {
      background-color: #19223C;
    }
    .text-light-blue {
      color: #67A4AC;
    }
    .text-white {
      color: #FFFFFF;
    }
  `
})
export class FooterComponent { }
