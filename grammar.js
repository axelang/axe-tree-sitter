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
      $.foreign_stmt,
      $.test_block,
      $.expression
    ),

    comment: $ => token(choice(
      seq("///", /.*/),
      seq("//", /.*/)
    )),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    type_identifier: $ => /[A-Z][a-zA-Z0-9_]*/,

    string: $ => /"[^"]*"/,

    number: $ => /\d+/,

    use_stmt: $ => seq(
      "use",
      field("module", choice($.string, $.identifier)),
      optional(seq("(", commaSep($.identifier), ")")),
      ";"
    ),

    platform_block: $ => seq(
      "platform",
      $.identifier,
      "{",
      repeat($._statement),
      "}"
    ),

    pub_stmt: $ => seq(
      "pub",
      choice($.def_stmt, $.model_stmt)
    ),

    def_stmt: $ => seq(
      "def",
      field("name", $.identifier),
      optional(seq("(", commaSep($.identifier), ")")),
      optional(seq(":", $.type_identifier)),
      $.block
    ),

    model_stmt: $ => seq(
      "model",
      field("name", $.type_identifier),
      $.block
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

    block: $ => seq(
      "{",
      repeat($._statement),
      "}"
    ),

    expression: $ => choice(
      $.identifier,
      $.number,
      $.string
    )
  }
});

function commaSep(rule) {
  return seq(rule, repeat(seq(",", rule)));
}
