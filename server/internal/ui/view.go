package ui

import (
	"fmt"
)

// View is the UI view structure
type View struct {
	name   string
	title  string
	buffer *BufferView
}

// NewView returns a new instance of a view
func NewView(name, title string) *View {
	return &View{
		name:   name,
		title:  title,
		buffer: &BufferView{},
	}
}

// GetName returns the name of the view
func (v View) GetName() string {
	return v.name
}

// GetTitle returns the title of the view
func (v View) GetTitle() string {
	return v.title
}

// GetView returns the logs retention view structure
func (v View) GetView() *BufferView {
	return v.buffer
}

// Write allows to write a string to the view
func (v View) Write(str string) {
	v.buffer.Write([]byte(str))
}

// Writef allows to write a string to the view with some given arguments
func (v View) Writef(str string, args ...interface{}) {
	v.buffer.Write([]byte(fmt.Sprintf(str, args...)))
}
