package main

import (
	"be/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Đăng ký routes
	routes.RegisterTaskRoutes(r)

	r.Run(":3000")
}
