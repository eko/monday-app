const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('./proto/monday.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: ['node_modules/google-proto-files', 'proto']
})
const packageObject = grpc.loadPackageDefinition(packageDefinition)

var client = new packageObject.monday.MondayService('127.0.0.1:52314', grpc.credentials.createInsecure())

module.exports = {
    client,
}
