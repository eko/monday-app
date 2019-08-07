package ui

// BufferView is a view structure that keeps logs into a buffer
type BufferView struct {
	buffer []byte
}

func (b *BufferView) Write(bytes []byte) {
	b.buffer = append(b.buffer, bytes...)
}

func (b *BufferView) ReadAll() []byte {
	return b.buffer
}
