package controllers

import (
	"be/src/models"
	"net/http"
	"sync"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
)

var (
	tasks    = make(map[string]models.Task) // Lưu dữ liệu trong bộ nhớ
	taskLock sync.Mutex
)

// Tạo task mới
func CreateTask(c *gin.Context) {
	var newTask models.Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	if newTask.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	taskLock.Lock()
	newTask.ID = uuid.New().String() // Tạo UUID thay vì số nguyên
	tasks[newTask.ID] = newTask
	taskLock.Unlock()

	c.JSON(http.StatusCreated, gin.H{"id": newTask.ID})
}

// Lấy danh sách tasks
func GetTasks(c *gin.Context) {
	taskLock.Lock()
	defer taskLock.Unlock()

	taskList := []models.Task{}
	for _, task := range tasks {
		taskList = append(taskList, task)
	}

	c.JSON(http.StatusOK, taskList)
}

// Cập nhật trạng thái task
func UpdateTask(c *gin.Context) {
	id := c.Param("id")

	taskLock.Lock()
	defer taskLock.Unlock()

	task, exists := tasks[id]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var updateData struct {
		Completed bool `json:"completed"`
	}
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	task.Completed = updateData.Completed
	tasks[id] = task
	c.JSON(http.StatusOK, task)
}

// Xóa task
func DeleteTask(c *gin.Context) {
	id := c.Param("id")

	taskLock.Lock()
	defer taskLock.Unlock()

	if _, exists := tasks[id]; exists {
		delete(tasks, id)
		c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
		return
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}
