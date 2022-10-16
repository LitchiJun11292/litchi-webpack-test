const path = require("path");
const fs = require("fs");

module.exports = function (source) {
  var callback = this.async();
  var packagePath = path.resolve(__dirname, "./../package.json");

  this.addDependency(packagePath);

  fs.readFile(packagePath, "utf-8", function (err, package) {
    if (err) return callback(err);
    //这里的 callback 相当于异步版的 return
    callback(null, `console.log(${package})` + "\n" + source);
  });
};
