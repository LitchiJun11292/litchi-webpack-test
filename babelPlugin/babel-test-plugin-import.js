module.exports = function ({ types: t }) {
    return {
      visitor: {
        ImportDeclaration(path) {
          if (path.node.source.value !== "MODULE") {
            return;
          }
  
          // 如果是空导入则直接删除掉
          const specs = path.node.specifiers;
          if (specs.length === 0) {
            path.remove();
            return;
          }
  
          // 判断是否包含了默认导入和命名空间导入
          if (
            specs.some(
              (i) =>
                t.isImportDefaultSpecifier(i) || t.isImportNamespaceSpecifier(i)
            )
          ) {
            // 抛出错误，Babel会展示出错的代码帧
            throw path.buildCodeFrameError("不能使用默认导入或命名空间导入");
          }
  
          // 转换命名导入
          const imports = [];
          for (const spec of specs) {
            const named = MODULE + "/" + spec.imported.name;
            const local = spec.local;
            imports.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(local)],
                t.stringLiteral(named)
              )
            );
            imports.push(
              t.importDeclaration([], t.stringLiteral(`${named}/style.css`))
            );
          }
          // 替换原有的导入语句
          path.replaceWithMultiple(imports);
        },
      },
    };
  };
  