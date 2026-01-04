(comment) @comment
(keyword_use) @keyword
(keyword_pub) @keyword
(keyword_def) @keyword
(keyword_val) @keyword
(keyword_mut) @keyword
(keyword_model) @keyword
(keyword_macro) @keyword
(keyword_raw) @keyword
(keyword_list) @keyword
(keyword_put) @keyword
(keyword_foreign) @keyword
(keyword_extern) @keyword
(keyword_enum) @keyword
(keyword_union) @keyword
(keyword_overload) @keyword
(keyword_if) @keyword.control
(keyword_elif) @keyword.control
(keyword_else) @keyword.control
(keyword_when) @keyword.control
(keyword_is) @keyword.control
(keyword_for) @keyword.control
(keyword_in) @keyword.control
(keyword_switch) @keyword.control
(keyword_case) @keyword.control
(keyword_default) @keyword.control
(keyword_loop) @keyword.control
(keyword_parallel) @keyword.control
(keyword_single) @keyword.control
(keyword_return) @keyword.control
(keyword_break) @keyword.control
(keyword_continue) @keyword.control
(keyword_defer) @keyword.control
(keyword_test) @keyword.control
(keyword_assert) @keyword.control
(keyword_platform) @keyword.control

(keyword_and) @keyword.operator
(keyword_or) @keyword.operator
(keyword_mod) @keyword.operator
(keyword_to) @keyword.operator
(keyword_ref) @keyword.storage.modifier
(keyword_ref_of) @keyword.storage.modifier
(keyword_addr_of) @keyword.storage.modifier
(keyword_cast) @keyword.storage.modifier
(keyword_unsafe) @keyword.storage.modifier

(identifier) @variable

(type_identifier) @type

(def_stmt
  name: (identifier) @function)

(macro_stmt
  name: (identifier) @function.macro)

(call_expression
  function: (identifier) @function.call)

(parameter
  (identifier) @variable.parameter)

(field_declaration
  name: (identifier) @variable.other.member)

(field_expression
  (identifier) @variable.other.member)

(primitive_type) @type.builtin

(pointer_type) @type.builtin

(string) @string

(char) @string.special

(number) @constant.numeric.integer

(float) @constant.numeric.float

(boolean) @constant.builtin.boolean

(nil) @constant.builtin

((identifier) @constant
  (#match? @constant "^[A-Z_][A-Z0-9_]*$"))
