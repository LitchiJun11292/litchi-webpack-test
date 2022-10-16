module.exports = function ({ types: t }) {
    return {
      visitor: {
        // VariableDeclarator(path, state) {
        //   if (path.node.id.name == "a") {
        //     path.node.id = t.identifier("b");
        //   }
        // },
        MemberExpression(path, state) {
          console.log(path.node.object.name, "path");
          if (
            path.node.object.name == "window" &&
            path.node.property.name == "a"
          ) {
            path.node.property = t.identifier("b");
          }
        },
      },
    };
  };
  