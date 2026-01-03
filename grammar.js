module.exports = grammar({
  name: "axe",

  extras: $ => [
    /\s/,
    $.comment
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.use_stmt,
      $.platform_block,
      $.pub_stmt,
      $.def_stmt,
      $.model_stmt,
      $.enum_stmt,
      $.foreign_stmt,
      $.test_block,
      $.opaque_stmt,
      $.unsafe_stmt,
      $.overload_stmt,
      $.if_stmt,
      $.loop_stmt,
      $.for_stmt,
      $.parallel_for_stmt,
      $.single_stmt,
      $.return_stmt,
      $.break_stmt,
      $.expression_stmt
    ),

    expression_stmt: $ => seq($.expression, optional(";")),

    comment: $ => token(choice(
      seq("///", /.*/),
      seq("//", /.*/)
    )),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    type_identifier: $ => /[A-Z][a-zA-Z0-9_]*/,

    number: $ => /\d+/,

    string: $ => choice(
      seq('"', repeat(choice($.escape_sequence, token.immediate(/[^"\\\n]/))), '"'),
      seq("'", repeat(choice($.escape_sequence, token.immediate(/[^'\\\n]/))), "'")
    ),

    escape_sequence: $ => token.immediate(
      seq("\\", choice(
        /["'\\nrt]/,
        /x[0-9a-fA-F]{2}/,
        /u\{[0-9a-fA-F]+\}/
      ))
    ),

    use_stmt: $ => seq(
      "use",
      field("module", choice($.string, $.identifier)),
      optional(seq("(", commaSep($.identifier), ")")),
      ";"
    ),

    platform_block: $ => seq(
      "platform",
      $.identifier,
      $.block
    ),

    pub_stmt: $ => seq(
      "pub",
      choice(
        $.def_stmt,
        $.model_stmt,
        $.enum_stmt
      )
    ),

    def_stmt: $ => seq(
      "def",
      field("name", $.identifier),
      optional($.parameter_list),
      optional(seq(":", $.type_expression)),
      $.block
    ),

    overload_stmt: $ => seq(
      "overload",
      field("name", $.identifier),
      $.parameter_list,
      $.block
    ),

    model_stmt: $ => seq(
      "model",
      field("name", $.type_identifier),
      $.block
    ),

    enum_stmt: $ => seq(
      "enum",
      field("name", $.type_identifier),
      "{",
      repeat($.enum_variant),
      "}"
    ),

    enum_variant: $ => seq(
      $.type_identifier,
      ";"
    ),

    foreign_stmt: $ => seq(
      "foreign",
      "{",
      repeat1(seq($.identifier, optional(","))),
      "}"
    ),

    test_block: $ => seq(
      "test",
      $.block
    ),

    opaque_stmt: $ => seq(
      "opaque",
      $.block
    ),

    unsafe_stmt: $ => seq(
      "unsafe",
      $.block
    ),

    if_stmt: $ => seq(
      "if",
      field("condition", $.expression),
      $.block,
      repeat($.elif_clause),
      optional($.else_clause)
    ),

    elif_clause: $ => seq(
      "elif",
      field("condition", $.expression),
      $.block
    ),

    else_clause: $ => seq(
      "else",
      $.block
    ),

    loop_stmt: $ => seq(
      "loop",
      $.block
    ),

    for_stmt: $ => seq(
      "for",
      $.block
    ),

    parallel_for_stmt: $ => seq(
      "parallel",
      "for",
      $.block
    ),

    single_stmt: $ => seq(
      "single",
      $.block
    ),

    return_stmt: $ => seq(
      "return",
      optional($.expression),
      ";"
    ),
    
    break_stmt: $ => seq(
      "break",
      optional(";")
    ),

    block: $ => seq(
      "{",
      repeat($._statement),
      "}"
    ),

    parameter_list: $ => seq(
      "(",
      commaSep($.parameter),
      ")"
    ),

    parameter: $ => seq(
      $.identifier,
      optional(seq(":", $.type_expression))
    ),

    type_expression: $ => choice(
      $.type_identifier,
      seq("list", "(", $.type_expression, ")")
    ),

    expression: $ => choice(
      $.binary_expression,
      $.unary_expression,
      $.list_literal,
      $.identifier,
      $.number,
      $.string
    ),

    unary_expression: $ => choice(
      $.mut_expr,
      $.val_expr,
      $.extern_expr
    ),

    mut_expr: $ => seq("mut", $.identifier),
    val_expr: $ => seq("val", $.identifier),
    extern_expr: $ => seq("extern", $.identifier),

    binary_expression: $ => prec.left(seq(
      $.expression,
      choice("and", "or"),
      $.expression
    )),

    list_literal: $ => seq(
      "[",
      optional(commaSep($.expression)),
      "]"
    ),
  }
});

function commaSep(rule) {
  return seq(rule, repeat(seq(",", rule)));
}
