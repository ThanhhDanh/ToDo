package main

import (
	"be/src/routes"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()

	// Middleware CORS: Cho phép frontend gọi API từ localhost:3000
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://to-do-thanhhdanh.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Đăng ký routes
	routes.RegisterTaskRoutes(r)

	r.Run(":3000")
}
