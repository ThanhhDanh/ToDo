package routes

import (
	"be/src/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(router *gin.Engine) {
	router.POST("/tasks", controllers.CreateTask)
	router.GET("/tasks", controllers.GetTasks)
	router.PUT("/tasks/:id", controllers.UpdateTask)
	router.DELETE("/tasks/:id", controllers.DeleteTask)
}
