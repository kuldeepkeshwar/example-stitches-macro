const { createMacro } = require('babel-plugin-macros');
const { addNamed } = require('@babel/helper-module-imports');


const source = '@stitches/react';

function stitchesMacro({ references, babel, state }) {
  const program = state.file.path;

  const imports = {};

  Object.keys(references).forEach((refName) => {
    const id = addNamed(program, refName, source, { nameHint: refName });

    imports[refName] = id.name;
    references[refName].forEach((referencePath) => {
      referencePath.node.name = id.name;
    });
    
  });

  babel.traverse(
    program.parent,
    babelPlugin(babel, { imports }).visitor,
    undefined,
    state,
  );
}

function babelPlugin(babel, options = {}) {
  const { types: t } = babel;
  return {
    name: 'transform-stitches',
    visitor: {
      MemberExpression: {
        exit(path) {
          const node = path.node;

          if (
            !t.isIdentifier(node.object) ||
            node.object.name!=="styled"
          ) {
            return;
          }
          
          let property = node.property;
          if (t.isIdentifier(property)) {
            property = t.stringLiteral(property.name);
          }

          if (/[A-Z]/.test(property.value)) {
            property.value = property.value
              .replace(/[A-Z]/g, '-$&')
              .toLowerCase();
          }
		      const args= path.parentPath.node.arguments;	
          path.parentPath.replaceWith(t.callExpression(node.object, [property,...args]));
        },
      },
    },
  };
}
module.exports = createMacro(stitchesMacro);