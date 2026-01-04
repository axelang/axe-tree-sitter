module.exports = grammar({
  name: 'axe',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.use_stmt,
      $.pub_stmt,
      $.def_stmt,
      $.model_stmt,
      $.enum_stmt,
      $.union_stmt,
      $.foreign_stmt,
      $.platform_stmt,
      $.test_stmt,
      $.val_stmt,
      $.mut_stmt,
      $.macro_stmt,
      $.extern_stmt,
      $.if_stmt,
      $.when_stmt,
      $.for_stmt,
      $.switch_stmt,
      $.loop_stmt,
      $.parallel_stmt,
      $.single_stmt,
      $.return_stmt,
      $.break_stmt,
      $.continue_stmt,
      $.defer_stmt,
      $.assert_stmt,
      $.raw_block,
      $.expression_stmt,
    ),

    comment: $ => choice(
      token(seq('//', /.*/)),
      token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'))
    ),

    use_stmt: $ => seq(alias('use', $.keyword_use), $.identifier),

    pub_stmt: $ => seq(alias('pub', $.keyword_pub), $._statement),

    def_stmt: $ => prec.right(seq(
      alias('def', $.keyword_def),
      field('name', $.identifier),
      optional($.parameter_list),
      optional(seq(':', $._type)),
      optional($.block)
    )),

    overload_stmt: $ => seq(alias('overload', $.keyword_overload), $.def_stmt),

    model_stmt: $ => seq(
      alias('model', $.keyword_model),
      field('name', $.type_identifier),
      optional($.model_body)
    ),

    model_body: $ => seq(
      '{',
      repeat(choice(
        $.field_declaration,
        $.def_stmt,
      )),
      '}'
    ),

    field_declaration: $ => seq(
      field('name', $.identifier),
      ':',
      $._type,
      optional(seq('=', $._expression))
    ),

    enum_stmt: $ => seq(
      alias('enum', $.keyword_enum),
      $.type_identifier,
      '{',
      repeat(seq($.identifier, optional(','))),
      '}'
    ),

    union_stmt: $ => seq(
      alias('union', $.keyword_union),
      $.type_identifier,
      '{',
      repeat(seq($._type, optional(','))),
      '}'
    ),

    foreign_stmt: $ => seq(
      alias('foreign', $.keyword_foreign),
      choice($.def_stmt, $.val_stmt)
    ),

    extern_stmt: $ => seq(
      alias('extern', $.keyword_extern),
      choice($.def_stmt, $.val_stmt)
    ),

    platform_stmt: $ => seq(
      alias('platform', $.keyword_platform),
      $.string,
      $.block
    ),

    test_stmt: $ => seq(
      alias('test', $.keyword_test),
      $.string,
      $.block
    ),

    val_stmt: $ => seq(
      alias('val', $.keyword_val),
      $.identifier,
      optional(seq(':', $._type)),
      '=',
      $._expression
    ),

    mut_stmt: $ => seq(
      alias('mut', $.keyword_mut),
      $.identifier,
      optional(seq(':', $._type)),
      optional(seq('=', $._expression))
    ),

    macro_stmt: $ => prec.right(seq(
      alias('macro', $.keyword_macro),
      field('name', $.identifier),
      optional($.parameter_list),
      optional(seq(':', $._type)),
      optional($.block)
    )),

    parameter_list: $ => seq(
      '(',
      optional(seq(
        $.parameter,
        repeat(seq(',', $.parameter)),
        optional(',')
      )),
      ')'
    ),

    parameter: $ => seq(
      $.identifier,
      ':',
      $._type
    ),

    if_stmt: $ => seq(
      alias('if', $.keyword_if),
      $._expression,
      $.block,
      repeat($.elif_clause),
      optional($.else_clause)
    ),

    elif_clause: $ => seq(alias('elif', $.keyword_elif), $._expression, $.block),
    else_clause: $ => seq(alias('else', $.keyword_else), $.block),

    when_stmt: $ => seq(
      alias('when', $.keyword_when),
      $._expression,
      alias('is', $.keyword_is),
      $._type,
      $.block,
      optional($.else_clause)
    ),

    for_stmt: $ => seq(
      alias('for', $.keyword_for),
      $.identifier,
      alias('in', $.keyword_in),
      $._expression,
      $.block
    ),

    switch_stmt: $ => seq(
      alias('switch', $.keyword_switch),
      $._expression,
      '{',
      repeat($.case_clause),
      optional($.default_clause),
      '}'
    ),

    case_clause: $ => seq(alias('case', $.keyword_case), $._expression, ':', repeat($._statement)),
    default_clause: $ => seq(alias('default', $.keyword_default), ':', repeat($._statement)),

    loop_stmt: $ => seq(alias('loop', $.keyword_loop), $.block),

    parallel_stmt: $ => seq(alias('parallel', $.keyword_parallel), $.block),
    single_stmt: $ => seq(alias('single', $.keyword_single), $.block),

    return_stmt: $ => prec.right(seq(alias('return', $.keyword_return), optional($._expression))),
    break_stmt: $ => alias('break', $.keyword_break),
    continue_stmt: $ => alias('continue', $.keyword_continue),
    defer_stmt: $ => seq(alias('defer', $.keyword_defer), $._statement),
    assert_stmt: $ => seq(alias('assert', $.keyword_assert), $._expression),

    raw_block: $ => seq(
      alias('raw', $.keyword_raw),
      '{',
      optional($.raw_content),
      '}'
    ),

    raw_content: $ => repeat1(choice(
      /[^{}]+/,
      seq('{', optional($.raw_content), '}')
    )),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    expression_stmt: $ => $._expression,

    _expression: $ => choice(
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      $.index_expression,
      $.field_expression,
      $.cast_expression,
      $.ref_expression,
      $.ref_of_expression,
      $.addr_of_expression,
      $.list_expression,
      $.put_expression,
      $.unsafe_expression,
      $.parenthesized_expression,
      $.identifier,
      $.type_identifier,
      $.number,
      $.float,
      $.string,
      $.char,
      $.boolean,
      $.nil,
    ),

    binary_expression: $ => choice(
      prec.left(7, seq($._expression, '*', $._expression)),
      prec.left(7, seq($._expression, '/', $._expression)),
      prec.left(7, seq($._expression, '%', $._expression)),
      prec.left(7, seq($._expression, alias('mod', $.keyword_mod), $._expression)),
      prec.left(6, seq($._expression, '+', $._expression)),
      prec.left(6, seq($._expression, '-', $._expression)),
      prec.left(6, seq($._expression, alias('to', $.keyword_to), $._expression)),
      prec.left(5, seq($._expression, '<', $._expression)),
      prec.left(5, seq($._expression, '>', $._expression)),
      prec.left(5, seq($._expression, '<=', $._expression)),
      prec.left(5, seq($._expression, '>=', $._expression)),
      prec.left(4, seq($._expression, '==', $._expression)),
      prec.left(4, seq($._expression, '!=', $._expression)),
      prec.left(3, seq($._expression, alias('and', $.keyword_and), $._expression)),
      prec.left(2, seq($._expression, alias('or', $.keyword_or), $._expression)),
    ),

    unary_expression: $ => choice(
      prec(8, seq('-', $._expression)),
      prec(8, seq('+', $._expression)),
    ),

    call_expression: $ => prec(10, seq(
      field('function', $._expression),
      $.argument_list
    )),

    argument_list: $ => seq(
      '(',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(',')
      )),
      ')'
    ),

    index_expression: $ => prec(10, seq(
      $._expression,
      '[',
      $._expression,
      ']'
    )),

    field_expression: $ => prec(10, seq(
      $._expression,
      '.',
      $.identifier
    )),

    cast_expression: $ => seq(
      alias('cast', $.keyword_cast),
      '(',
      $._expression,
      ',',
      $._type,
      ')'
    ),

    ref_expression: $ => seq(alias('ref', $.keyword_ref), $._expression),
    ref_of_expression: $ => seq(alias('ref_of', $.keyword_ref_of), $._expression),
    addr_of_expression: $ => seq(alias('addr_of', $.keyword_addr_of), $._expression),

    list_expression: $ => seq(
      alias('list', $.keyword_list),
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(',')
      )),
      ']'
    ),

    put_expression: $ => seq(alias('put', $.keyword_put), $._expression),

    unsafe_expression: $ => seq(alias('unsafe', $.keyword_unsafe), $.block),

    parenthesized_expression: $ => seq('(', $._expression, ')'),

    _type: $ => choice(
      $.primitive_type,
      $.pointer_type,
      $.type_identifier,
      $.generic_type,
    ),

    primitive_type: $ => choice(
      'u8', 'i8', 'u16', 'i16', 'u32', 'i32', 'u64', 'i64',
      'f32', 'f64', 'bool', 'char', 'void', 'usize',
      'generic', 'untyped'
    ),

    pointer_type: $ => seq($._type, '*'),

    generic_type: $ => seq(
      $.type_identifier,
      '<',
      $._type,
      repeat(seq(',', $._type)),
      '>'
    ),

    string: $ => choice(
      seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\]/, /\\./)), "'"),
      seq('`', repeat(choice(/[^`\\]/, /\\./)), '`')
    ),

    char: $ => token(seq("'", choice(/[^'\\]/, /\\./), "'")),

    number: $ => /\d+/,
    float: $ => /\d+\.\d+([eE][+-]?\d+)?/,

    boolean: $ => choice('true', 'false'),
    nil: $ => 'nil',

    identifier: $ => /[a-z_][a-zA-Z0-9_]*/,
    type_identifier: $ => /[A-Z][a-zA-Z0-9_]*/,
  }
});
