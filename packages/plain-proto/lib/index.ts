import protoLoader = require('@grpc/proto-loader');
// import grpcLibrary = require('grpc');
// OR
import grpcLibrary = require('@grpc/grpc-js');
protoLoader.load(protoFileName, options).then(packageDefinition => {
    const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
});
// OR
const packageDefinition = protoLoader.loadSync(protoFileName, options);
const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
