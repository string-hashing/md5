:question: [@string-hashing/md5](https://string-hashing.github.io/md5)
==

MD5 bytestring hashing for JavaScript.
See [docs](https://string-hashing.github.io/md5/index.html).

```js
import {alloc} from '@array-like/alloc';
import * as ascii from '@codec-bytes/ascii';
import * as base16 from '@codec-bytes/base16';
import {md5} from '@string-hashing/md5';
const string = 'The quick brown fox jumps over the lazy dog';
const bytes = ascii.encode(string);
const digest = md5(bytes, bytes.length * 8, alloc(16));
digest; // [0x9e, 0x10, 0x7d, 0x9d, 0x37, 0x2b, 0xb6, 0x82, 0x6b, 0xd8, ...]
base16.decode(digest); // '9E107D9D372BB6826BD81D3542A419D6'
```

[![License](https://img.shields.io/github/license/string-hashing/md5.svg)](https://raw.githubusercontent.com/string-hashing/md5/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@string-hashing/md5.svg)](https://www.npmjs.org/package/@string-hashing/md5)
[![Tests](https://img.shields.io/github/workflow/status/string-hashing/md5/ci?event=push&label=tests)](https://github.com/string-hashing/md5/actions/workflows/ci.yml?query=branch:main)
[![Dependencies](https://img.shields.io/librariesio/github/string-hashing/md5.svg)](https://github.com/string-hashing/md5/network/dependencies)
[![GitHub issues](https://img.shields.io/github/issues/string-hashing/md5.svg)](https://github.com/string-hashing/md5/issues)
[![Downloads](https://img.shields.io/npm/dm/@string-hashing/md5.svg)](https://www.npmjs.org/package/@string-hashing/md5)

[![Code issues](https://img.shields.io/codeclimate/issues/string-hashing/md5.svg)](https://codeclimate.com/github/string-hashing/md5/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/string-hashing/md5.svg)](https://codeclimate.com/github/string-hashing/md5/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/string-hashing/md5/main.svg)](https://codecov.io/gh/string-hashing/md5)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/string-hashing/md5.svg)](https://codeclimate.com/github/string-hashing/md5/trends/technical_debt)
[![Documentation](https://string-hashing.github.io/md5/badge.svg)](https://string-hashing.github.io/md5/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@string-hashing/md5)](https://bundlephobia.com/result?p=@string-hashing/md5)
