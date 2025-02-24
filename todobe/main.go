package main

import (
	"be/src/routes"

	"be/src/utils"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
)

func main() {
	utils.InitRedis()
	r := gin.Default()

	// Middleware CORS: Cho phép frontend gọi API từ localhost:3000
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://your-frontend-url.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// Đăng ký routes
	routes.RegisterTaskRoutes(r)

	r.Run(":3000")
}
