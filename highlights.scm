[
  "use"
  "pub"
  "def"
  "model"
  "enum"
  "foreign"
  "platform"
  "test"
  "opaque"
  "unsafe"
  "overload"
  "if"
  "elif"
  "else"
  "loop"
  "for"
  "parallel"
  "single"
  "return"
  "break"
  "mut"
  "val"
  "extern"
] @keyword

[
  "and"
  "or"
] @operator

(comment) @comment
(identifier) @variable
(type_identifier) @type

(def_stmt
  name: (identifier) @function)

(overload_stmt
  name: (identifier) @function)

(enum_stmt
  name: (type_identifier) @type)

(enum_variant
  (type_identifier) @constant)

(string) @string
(number) @number
(list_literal) @constant

(type_expression
  (type_identifier) @type)

[
  "{"
  "}"
  "("
  ")"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ";"
] @punctuation.delimiter

[
  ":"
] @operator
