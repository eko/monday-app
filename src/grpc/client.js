const grpc = require('grpc')

var mondayProto = grpc.load('./proto/monday.proto')
var client = new mondayProto.monday.MondayService('127.0.0.1:52314', grpc.credentials.createInsecure())

module.exports = {
    client,
}
