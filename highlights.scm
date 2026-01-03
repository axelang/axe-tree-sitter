;; Keywords
((use_stmt) @keyword)
((pub_stmt) @keyword)
((def_stmt) @keyword)
((model_stmt) @keyword)
((foreign_stmt) @keyword)
((platform_block) @keyword)
((test_block) @keyword)

;; Comments
((comment) @comment)

;; Identifiers
((identifier) @variable)
((type_identifier) @type)

;; Strings
((string) @string)

;; Numbers
((number) @number)

;; Function names (from def_stmt)
((def_stmt
  name: (identifier) @function))

;; Blocks
((block) @punctuation.bracket)
