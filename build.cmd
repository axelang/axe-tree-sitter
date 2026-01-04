npm install
npx tree-sitter generate
gcc -shared -o axe.dll -fPIC src/parser.c
