;; Keywords
((use_stmt) @keyword)
((pub_stmt) @keyword)
((def_stmt) @keyword)
((model_stmt) @keyword)
((foreign_stmt) @keyword)
((platform_block) @keyword)
((test_block) @keyword)
((opaque_stmt) @keyword)
((unsafe_stmt) @keyword)
((mut_expr) @keyword)
((val_expr) @keyword)
((extern_expr) @keyword)

;; Comments
((comment) @comment)

;; Identifiers
((identifier) @variable)
((type_identifier) @type)

;; Strings
((string) @string)

;; Numbers
((number) @number)

;; Function names
((def_stmt
  name: (identifier) @function))

;; Blocks / brackets
((block) @punctuation.bracket)

;; Type expressions
((type_expression
  (type_identifier) @type))

;; List literals
((list_literal) @constant)
