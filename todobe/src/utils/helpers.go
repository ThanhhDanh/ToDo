package utils

import "strconv"

// Chuyển string sang int
func StringToInt(s string) int {
	num, err := strconv.Atoi(s)
	if err != nil {
		return -1
	}
	return num
}
