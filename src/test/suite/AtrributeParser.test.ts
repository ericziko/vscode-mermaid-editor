import * as assert from 'assert';

import AtrributeParser from '../../AttributeParser';

suite('AttributeParser Tests', function() {
  const backgroundColorAcceptableDiagrams = [
    `
    sequenceDiagram
    %% @config{./sample_config.json}
    %% @backgroundColor{#ff0000}
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @config{./sample_config.json}
    Alice->>John: Hello
    Alice->>John: Bye
    %%          @backgroundColor{#ff0000}
    `,
    `
    %%@backgroundColor{#ff0000}
    sequenceDiagram
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @backgroundColor{#ff0000}
    %% @backgroundColor{#123456}
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @backgroundColor{ #ff0000 }
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @backgroundColor{    #ff0000     } <- this is background color
    Alice->>John: Hello
    Alice->>John: Bye
    `
  ];

  const configAcceptableDiagrams = [
    `
    sequenceDiagram
    %% @config{./test_config.json}
    %% @backgroundColor{#ff0000}
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @backgroundColor{#ff0000}
    Alice->>John: Hello
    Alice->>John: Bye
    %%          @config{./test_config.json}
    `,
    `
    %%@config{./test_config.json}
    sequenceDiagram
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @config{./test_config.json}
    %% @config{./dummy_config.json}
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @config{ ./test_config.json }
    Alice->>John: Hello
    Alice->>John: Bye
    `,
    `
    sequenceDiagram
    %% @config{    ./test_config.json     } <- this is config file
    Alice->>John: Hello
    Alice->>John: Bye
    `
  ];

  test('parseBackgrondColor should return correct color code', () => {
    for (const diagram of backgroundColorAcceptableDiagrams) {
      const bgColor = AtrributeParser.parseBackgroundColor(diagram);
      assert.equal(bgColor, '#ff0000');
    }
  });

  test('parseBackgrondColor should return empty string', () => {
    const diagram = `
    sequenceDiagram
    %% @backgroundColor  {#ff0000}
    Alice->>John: Hello
    Alice->>John: Bye
    `;
    const bgColor = AtrributeParser.parseBackgroundColor(diagram);
    assert.equal(bgColor, '');
  });

  test('parseConfig should return correct color code', () => {
    for (const diagram of configAcceptableDiagrams) {
      const config = AtrributeParser.parseConfig(diagram);
      assert.equal(config, './test_config.json');
    }
  });

  test('parseConfig should return empty string', () => {
    const diagram = `
    sequenceDiagram
    %% @config  {./test_config.json}
    Alice->>John: Hello
    Alice->>John: Bye
    `;
    const config = AtrributeParser.parseConfig(diagram);
    assert.equal(config, '');
  });
});