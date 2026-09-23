import React from "react";

// Rainbow bracket colors
const BRACKET_COLORS = ["#FFD700", "#DA70D6", "#179FFF"]; // gold, purple, blue

export function highlightLine(
  line: string,
  lineIndex: number,
  ext: string = "tsx"
): React.ReactNode[] {
  if (ext === "json") {
    return highlightJsonLine(line);
  }
  if (ext === "css" || ext === "scss" || ext === "sass") {
    return highlightCssLine(line);
  }
  if (ext === "md" || ext === "markdown") {
    return highlightMdLine(line);
  }
  if (ext === "py" || ext === "python") {
    return highlightPythonLine(line);
  }
  return highlightGenericCodeLine(line, ext);
}

function highlightPythonLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  const len = line.length;

  const PY_KEYWORDS = new Set([
    "def",
    "class",
    "import",
    "from",
    "as",
    "return",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "in",
    "is",
    "not",
    "and",
    "or",
    "try",
    "except",
    "finally",
    "raise",
    "with",
    "yield",
    "lambda",
    "pass",
    "break",
    "continue",
    "global",
    "nonlocal",
    "assert",
    "async",
    "await",
  ]);

  const PY_BUILTINS = new Set([
    "print",
    "len",
    "range",
    "int",
    "str",
    "float",
    "bool",
    "list",
    "dict",
    "set",
    "tuple",
    "open",
    "type",
    "isinstance",
    "enumerate",
    "zip",
    "map",
    "filter",
    "sum",
    "min",
    "max",
    "True",
    "False",
    "None",
    "__name__",
    "__main__",
  ]);

  let bracketLevel = 0;

  while (index < len) {
    const char = line[index];

    // Python comment #
    if (char === "#") {
      nodes.push(
        <span key={`py-comm-${index}`} style={{ color: "#6A9955" }}>
          {line.slice(index)}
        </span>
      );
      break;
    }

    // Python strings (quotes)
    if (char === '"' || char === "'") {
      const quote = char;
      let endIndex = index + 1;
      while (endIndex < len) {
        if (line[endIndex] === "\\") {
          endIndex += 2;
        } else if (line[endIndex] === quote) {
          endIndex++;
          break;
        } else {
          endIndex++;
        }
      }
      nodes.push(
        <span key={`py-str-${index}`} style={{ color: "#CE9178" }}>
          {line.slice(index, endIndex)}
        </span>
      );
      index = endIndex;
      continue;
    }

    // Brackets
    if (char === "(" || char === "{" || char === "[") {
      const color = BRACKET_COLORS[bracketLevel % BRACKET_COLORS.length];
      bracketLevel++;
      nodes.push(
        <span key={`py-bropen-${index}`} style={{ color }}>
          {char}
        </span>
      );
      index++;
      continue;
    }
    if (char === ")" || char === "}" || char === "]") {
      bracketLevel = Math.max(0, bracketLevel - 1);
      const color = BRACKET_COLORS[bracketLevel % BRACKET_COLORS.length];
      nodes.push(
        <span key={`py-brclose-${index}`} style={{ color }}>
          {char}
        </span>
      );
      index++;
      continue;
    }

    // Words
    if (/[A-Za-z0-9_$]/.test(char)) {
      let endIndex = index;
      while (endIndex < len && /[A-Za-z0-9_$]/.test(line[endIndex])) {
        endIndex++;
      }
      const word = line.slice(index, endIndex);

      let nextNonWhitespace = endIndex;
      while (nextNonWhitespace < len && /\s/.test(line[nextNonWhitespace])) {
        nextNonWhitespace++;
      }
      const nextChar = line[nextNonWhitespace];

      if (PY_KEYWORDS.has(word)) {
        nodes.push(
          <span key={`py-kw-${index}`} style={{ color: "#C678DD" }}>
            {word}
          </span>
        );
      } else if (PY_BUILTINS.has(word)) {
        nodes.push(
          <span key={`py-builtin-${index}`} style={{ color: "#4EC9B0" }}>
            {word}
          </span>
        );
      } else if (nextChar === "(") {
        nodes.push(
          <span key={`py-fn-${index}`} style={{ color: "#E5C07B" }}>
            {word}
          </span>
        );
      } else if (/^\d+$/.test(word)) {
        nodes.push(
          <span key={`py-num-${index}`} style={{ color: "#D19A66" }}>
            {word}
          </span>
        );
      } else {
        nodes.push(
          <span key={`py-id-${index}`} style={{ color: "#9CDCFE" }}>
            {word}
          </span>
        );
      }

      index = endIndex;
      continue;
    }

    nodes.push(
      <span key={`py-punct-${index}`} style={{ color: "#ABB2BF" }}>
        {char}
      </span>
    );
    index++;
  }

  return nodes;
}

function highlightGenericCodeLine(
  line: string,
  ext: string
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  const len = line.length;
  let bracketLevel = 0;

  // Language keywords set
  const KEYWORDS = new Set([
    "export",
    "default",
    "function",
    "return",
    "import",
    "from",
    "const",
    "let",
    "var",
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "break",
    "new",
    "class",
    "extends",
    "async",
    "await",
    "try",
    "catch",
    "finally",
    "throw",
    "typeof",
    "instanceof",
    "void",
    "this",
    "interface",
    "type",
    "as",
    "implements",
    "readonly",
    "enum",
    // C / C++ / Java / C#
    "public",
    "private",
    "protected",
    "static",
    "final",
    "package",
    "int",
    "float",
    "double",
    "char",
    "bool",
    "boolean",
    "include",
    "define",
    "struct",
    "union",
    "namespace",
    "using",
    "template",
    "auto",
    "nullptr",
    "cout",
    "cin",
    "endl",
    "printf",
    "scanf",
    "sizeof",
    // Kotlin / Go / Rust
    "fun",
    "val",
    "package",
    "when",
    "override",
    "companion",
    "data",
    "func",
    "package",
    "chan",
    "select",
    "defer",
    "go",
    "fallthrough",
    "fn",
    "let",
    "mut",
    "pub",
    "impl",
    "trait",
    "match",
    "use",
    "mod",
    "crate",
  ]);

  const BUILTIN_TYPES = new Set([
    "string",
    "number",
    "boolean",
    "any",
    "void",
    "null",
    "undefined",
    "never",
    "unknown",
    "object",
    "Record",
    "Promise",
    "Array",
    "LayoutProps",
    "Metadata",
    "ReactNode",
    "FC",
    "PropsWithChildren",
    "String",
    "Integer",
    "Boolean",
    "List",
    "Map",
    "Set",
    "System",
    "out",
    "println",
  ]);

  while (index < len) {
    const char = line[index];

    // C/Java/JS comment //
    if (char === "/" && line[index + 1] === "/") {
      nodes.push(
        <span key={`comment-${index}`} style={{ color: "#6A9955" }}>
          {line.slice(index)}
        </span>
      );
      break;
    }

    // Shell comment #
    if (char === "#" && (ext === "sh" || ext === "bash" || ext === "zsh")) {
      nodes.push(
        <span key={`sh-comment-${index}`} style={{ color: "#6A9955" }}>
          {line.slice(index)}
        </span>
      );
      break;
    }

    // C Preprocessor directive #include, #define
    if (
      char === "#" &&
      (ext === "c" || ext === "cpp" || ext === "h" || ext === "hpp")
    ) {
      let endIndex = index;
      while (endIndex < len && !/\s/.test(line[endIndex])) endIndex++;
      nodes.push(
        <span key={`prep-${index}`} style={{ color: "#C678DD" }}>
          {line.slice(index, endIndex)}
        </span>
      );
      index = endIndex;
      continue;
    }

    // Strings
    if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      let endIndex = index + 1;
      while (endIndex < len) {
        if (line[endIndex] === "\\") {
          endIndex += 2;
        } else if (line[endIndex] === quote) {
          endIndex++;
          break;
        } else {
          endIndex++;
        }
      }
      const str = line.slice(index, endIndex);
      nodes.push(
        <span key={`str-${index}`} style={{ color: "#CE9178" }}>
          {str}
        </span>
      );
      index = endIndex;
      continue;
    }

    // Bracket pair colorization
    if (char === "(" || char === "{" || char === "[") {
      const color = BRACKET_COLORS[bracketLevel % BRACKET_COLORS.length];
      bracketLevel++;
      nodes.push(
        <span key={`bracket-open-${index}`} style={{ color }}>
          {char}
        </span>
      );
      index++;
      continue;
    }
    if (char === ")" || char === "}" || char === "]") {
      bracketLevel = Math.max(0, bracketLevel - 1);
      const color = BRACKET_COLORS[bracketLevel % BRACKET_COLORS.length];
      nodes.push(
        <span key={`bracket-close-${index}`} style={{ color }}>
          {char}
        </span>
      );
      index++;
      continue;
    }

    // JSX / HTML Tags
    if (char === "<" && (ext === "tsx" || ext === "jsx" || ext === "html")) {
      const matchClose = line.slice(index).match(/^<\/([A-Za-z0-9_.-]+)>/);
      if (matchClose) {
        nodes.push(
          <span key={`tag-open-close-${index}`} style={{ color: "#808080" }}>
            &lt;/
          </span>
        );
        nodes.push(
          <span key={`tag-close-name-${index}`} style={{ color: "#E06C75" }}>
            {matchClose[1]}
          </span>
        );
        nodes.push(
          <span key={`tag-close-bracket-${index}`} style={{ color: "#808080" }}>
            &gt;
          </span>
        );
        index += matchClose[0].length;
        continue;
      }

      const matchOpen = line.slice(index).match(/^<([A-Za-z0-9_.-]+)/);
      if (matchOpen) {
        nodes.push(
          <span key={`tag-bracket-${index}`} style={{ color: "#808080" }}>
            &lt;
          </span>
        );
        const tagName = matchOpen[1];
        const isComponent = tagName[0] === tagName[0].toUpperCase();
        nodes.push(
          <span
            key={`tag-name-${index}`}
            style={{ color: isComponent ? "#4EC9B0" : "#E06C75" }}
          >
            {tagName}
          </span>
        );
        index += matchOpen[0].length;
        continue;
      }

      nodes.push(
        <span key={`punct-${index}`} style={{ color: "#808080" }}>
          &lt;
        </span>
      );
      index++;
      continue;
    }

    if (char === ">" && (ext === "tsx" || ext === "jsx" || ext === "html")) {
      nodes.push(
        <span key={`punct-${index}`} style={{ color: "#808080" }}>
          &gt;
        </span>
      );
      index++;
      continue;
    }

    // Identifiers & words
    if (/[A-Za-z0-9_$]/.test(char)) {
      let endIndex = index;
      while (endIndex < len && /[A-Za-z0-9_$]/.test(line[endIndex])) {
        endIndex++;
      }
      const word = line.slice(index, endIndex);

      let nextNonWhitespace = endIndex;
      while (nextNonWhitespace < len && /\s/.test(line[nextNonWhitespace])) {
        nextNonWhitespace++;
      }
      const nextChar = line[nextNonWhitespace];

      if (KEYWORDS.has(word)) {
        nodes.push(
          <span key={`kw-${index}`} style={{ color: "#C678DD" }}>
            {word}
          </span>
        );
      } else if (
        BUILTIN_TYPES.has(word) ||
        /^[A-Z][a-zA-Z0-9]*Props/.test(word)
      ) {
        nodes.push(
          <span key={`type-${index}`} style={{ color: "#4EC9B0" }}>
            {word}
          </span>
        );
      } else if (nextChar === "(") {
        nodes.push(
          <span key={`fn-${index}`} style={{ color: "#E5C07B" }}>
            {word}
          </span>
        );
      } else if (nextChar === "=") {
        nodes.push(
          <span key={`attr-${index}`} style={{ color: "#9CDCFE" }}>
            {word}
          </span>
        );
      } else if (/^\d+$/.test(word)) {
        nodes.push(
          <span key={`num-${index}`} style={{ color: "#D19A66" }}>
            {word}
          </span>
        );
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
        nodes.push(
          <span key={`pascal-${index}`} style={{ color: "#4EC9B0" }}>
            {word}
          </span>
        );
      } else {
        nodes.push(
          <span key={`id-${index}`} style={{ color: "#9CDCFE" }}>
            {word}
          </span>
        );
      }

      index = endIndex;
      continue;
    }

    nodes.push(
      <span key={`raw-${index}`} style={{ color: "#ABB2BF" }}>
        {char}
      </span>
    );
    index++;
  }

  return nodes;
}

function highlightJsonLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  const len = line.length;

  while (index < len) {
    const char = line[index];
    if (char === '"') {
      let endIndex = index + 1;
      while (endIndex < len) {
        if (line[endIndex] === "\\") {
          endIndex += 2;
        } else if (line[endIndex] === '"') {
          endIndex++;
          break;
        } else {
          endIndex++;
        }
      }
      const str = line.slice(index, endIndex);
      let nextPos = endIndex;
      while (nextPos < len && /\s/.test(line[nextPos])) nextPos++;
      const isKey = line[nextPos] === ":";

      nodes.push(
        <span
          key={`json-str-${index}`}
          style={{ color: isKey ? "#9CDCFE" : "#CE9178" }}
        >
          {str}
        </span>
      );
      index = endIndex;
      continue;
    }

    if (char === "{" || char === "}" || char === "[" || char === "]") {
      nodes.push(
        <span key={`json-br-${index}`} style={{ color: "#FFD700" }}>
          {char}
        </span>
      );
      index++;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let endIndex = index;
      while (endIndex < len && /[0-9.]/.test(line[endIndex])) endIndex++;
      nodes.push(
        <span key={`json-num-${index}`} style={{ color: "#B5CEA8" }}>
          {line.slice(index, endIndex)}
        </span>
      );
      index = endIndex;
      continue;
    }

    nodes.push(
      <span key={`json-raw-${index}`} style={{ color: "#D4D4D4" }}>
        {char}
      </span>
    );
    index++;
  }

  return nodes;
}

function highlightCssLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  const len = line.length;

  while (index < len) {
    const char = line[index];
    if (char === "@") {
      let endIndex = index;
      while (endIndex < len && /[a-zA-Z-]/.test(line[endIndex])) endIndex++;
      nodes.push(
        <span key={`css-at-${index}`} style={{ color: "#C678DD" }}>
          {line.slice(index, endIndex)}
        </span>
      );
      index = endIndex;
      continue;
    }

    if (char === '"' || char === "'") {
      const q = char;
      let endIndex = index + 1;
      while (endIndex < len && line[endIndex] !== q) endIndex++;
      if (endIndex < len) endIndex++;
      nodes.push(
        <span key={`css-str-${index}`} style={{ color: "#CE9178" }}>
          {line.slice(index, endIndex)}
        </span>
      );
      index = endIndex;
      continue;
    }

    if (char === "{" || char === "}") {
      nodes.push(
        <span key={`css-br-${index}`} style={{ color: "#FFD700" }}>
          {char}
        </span>
      );
      index++;
      continue;
    }

    if (char === ":") {
      nodes.push(
        <span key={`css-colon-${index}`} style={{ color: "#ABB2BF" }}>
          :
        </span>
      );
      index++;
      continue;
    }

    nodes.push(
      <span key={`css-raw-${index}`} style={{ color: "#9CDCFE" }}>
        {char}
      </span>
    );
    index++;
  }
  return nodes;
}

function highlightMdLine(line: string): React.ReactNode[] {
  if (line.startsWith("#")) {
    return [
      <span key="md-h" style={{ color: "#61AFEF", fontWeight: "bold" }}>
        {line}
      </span>,
    ];
  }
  if (line.startsWith("- ") || line.startsWith("* ")) {
    return [
      <span key="md-bullet" style={{ color: "#E06C75" }}>
        {line.slice(0, 2)}
      </span>,
      <span key="md-text" style={{ color: "#ABB2BF" }}>
        {line.slice(2)}
      </span>,
    ];
  }
  return [
    <span key="md-raw" style={{ color: "#ABB2BF" }}>
      {line}
    </span>,
  ];
}
