# ToDo
To Do App
- todofe (Front-End)
1. Hướng dẫn triển khai Frontend (React)
   1.1 Cài đặt môi trường
   
   Cần cài đặt Node.js và npm/yarn.
   
   Tải và cài đặt Node.js: https://nodejs.org/
   
   1.2 Cài đặt dependencies
   
   cd ../frontend
   
   npm install

   1.3 Chỉnh sửa cấu hình API

   Mở file frontend/src/configs/APIs.js và cập nhật URL backend:

   const BASE_URL = "http://localhost:8080"; // Hoặc URL server của bạn

   1.4 Chạy ứng dụng React

   npm start

   Ứng dụng sẽ chạy tại http://localhost:3000

- todobe (Backend)
2. Hướng dẫn triển khai Backend (Golang)

  2.1 Cài đặt môi trường

  Trước tiên, cần cài đặt Golang.

  Tải và cài đặt Golang từ: https://go.dev/dl/

  2.2 Clone project & cài đặt dependencies

  # Clone repo

  git clone https://github.com/ThanhhDanh/ToDo.git

  cd ToDo/backend

  2.3 Chạy server

  # Chạy ứng dụng

  go run main.go

  Server sẽ chạy tại http://localhost:3000

