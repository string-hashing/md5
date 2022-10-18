import test from 'ava';
import {alloc} from '@array-like/alloc';
import {product} from '@set-theory/cartesian-product';
import * as ascii from '@codec-bytes/ascii';

import * as hash from '#module';

function macro(t, [[md5name, md5], [string, expected]]) {
	const digest = md5(ascii.encode(string), string.length * 8, alloc(16));

	t.deepEqual(digest, expected, `${md5name} ${string}`);
}

macro.title = (title, [[f], [x, y]]) =>
	title ?? `${f}(${JSON.stringify(x)}) == ${JSON.stringify(y)}`;

const inputs = product(
	[
		[
			['md5', hash.md5],
			['md5fast', hash.md5fast],
		],

		[
			[
				'',
				[
					0xd4, 0x1d, 0x8c, 0xd9, 0x8f, 0x00, 0xb2, 0x04, 0xe9, 0x80, 0x09,
					0x98, 0xec, 0xf8, 0x42, 0x7e,
				],
			],
			[
				'The quick brown fox jumps over the lazy dog',
				[
					0x9e, 0x10, 0x7d, 0x9d, 0x37, 0x2b, 0xb6, 0x82, 0x6b, 0xd8, 0x1d,
					0x35, 0x42, 0xa4, 0x19, 0xd6,
				],
			],
			[
				'The quick brown fox jumps over the lazy dog.',
				[
					0xe4, 0xd9, 0x09, 0xc2, 0x90, 0xd0, 0xfb, 0x1c, 0xa0, 0x68, 0xff,
					0xad, 0xdf, 0x22, 0xcb, 0xd0,
				],
			],
			[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				[
					0xdb, 0x89, 0xbb, 0x5c, 0xea, 0xb8, 0x7f, 0x9c, 0x0f, 0xcc, 0x2a,
					0xb3, 0x6c, 0x18, 0x9c, 0x2c,
				],
			],
			[
				'apple',
				[
					0x1f, 0x38, 0x70, 0xbe, 0x27, 0x4f, 0x6c, 0x49, 0xb3, 0xe3, 0x1a,
					0x0c, 0x67, 0x28, 0x95, 0x7f,
				],
			],
			[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
				[
					0x52, 0x13, 0x81, 0x8e, 0xc8, 0x7e, 0x04, 0xc4, 0x4d, 0x75, 0xb0,
					0x0f, 0x79, 0xb2, 0x31, 0x10,
				],
			],
			[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
				[
					0x58, 0x19, 0xec, 0xac, 0xdd, 0x85, 0x51, 0xd1, 0x08, 0xe4, 0xfe,
					0x83, 0xbe, 0x10, 0x20, 0x0e,
				],
			],
			[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do e',
				[
					0xd6, 0x6e, 0xea, 0x96, 0x8b, 0x0c, 0x65, 0xfb, 0xb8, 0x00, 0xbc,
					0x5a, 0xbb, 0x35, 0xcb, 0x4e,
				],
			],
		],
	],
	1,
);

for (const x of inputs) test(macro, x);
