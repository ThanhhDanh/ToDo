package utils

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

var RedisClient *redis.Client

// Khởi tạo kết nối Redis
func InitRedis() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Đổi nếu Redis chạy trên server khác
		Password: "",               // Mặc định Redis không có mật khẩu
		DB:       0,                // Dùng database mặc định
	})

	// Kiểm tra kết nối
	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Fatalf("Không thể kết nối Redis: %v", err)
	}
	log.Println("✅ Đã kết nối Redis")
}
