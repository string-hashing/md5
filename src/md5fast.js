import {get32, lil32, add32} from '@arithmetic-type/uint32';

function cycle(x, k) {
	let a = x[0];
	let b = x[1];
	let c = x[2];
	let d = x[3];

	a = ff(a, b, c, d, k[0], 7, -680_876_936);
	d = ff(d, a, b, c, k[1], 12, -389_564_586);
	c = ff(c, d, a, b, k[2], 17, 606_105_819);
	b = ff(b, c, d, a, k[3], 22, -1_044_525_330);
	a = ff(a, b, c, d, k[4], 7, -176_418_897);
	d = ff(d, a, b, c, k[5], 12, 1_200_080_426);
	c = ff(c, d, a, b, k[6], 17, -1_473_231_341);
	b = ff(b, c, d, a, k[7], 22, -45_705_983);
	a = ff(a, b, c, d, k[8], 7, 1_770_035_416);
	d = ff(d, a, b, c, k[9], 12, -1_958_414_417);
	c = ff(c, d, a, b, k[10], 17, -42_063);
	b = ff(b, c, d, a, k[11], 22, -1_990_404_162);
	a = ff(a, b, c, d, k[12], 7, 1_804_603_682);
	d = ff(d, a, b, c, k[13], 12, -40_341_101);
	c = ff(c, d, a, b, k[14], 17, -1_502_002_290);
	b = ff(b, c, d, a, k[15], 22, 1_236_535_329);

	a = gg(a, b, c, d, k[1], 5, -165_796_510);
	d = gg(d, a, b, c, k[6], 9, -1_069_501_632);
	c = gg(c, d, a, b, k[11], 14, 643_717_713);
	b = gg(b, c, d, a, k[0], 20, -373_897_302);
	a = gg(a, b, c, d, k[5], 5, -701_558_691);
	d = gg(d, a, b, c, k[10], 9, 38_016_083);
	c = gg(c, d, a, b, k[15], 14, -660_478_335);
	b = gg(b, c, d, a, k[4], 20, -405_537_848);
	a = gg(a, b, c, d, k[9], 5, 568_446_438);
	d = gg(d, a, b, c, k[14], 9, -1_019_803_690);
	c = gg(c, d, a, b, k[3], 14, -187_363_961);
	b = gg(b, c, d, a, k[8], 20, 1_163_531_501);
	a = gg(a, b, c, d, k[13], 5, -1_444_681_467);
	d = gg(d, a, b, c, k[2], 9, -51_403_784);
	c = gg(c, d, a, b, k[7], 14, 1_735_328_473);
	b = gg(b, c, d, a, k[12], 20, -1_926_607_734);

	a = hh(a, b, c, d, k[5], 4, -378_558);
	d = hh(d, a, b, c, k[8], 11, -2_022_574_463);
	c = hh(c, d, a, b, k[11], 16, 1_839_030_562);
	b = hh(b, c, d, a, k[14], 23, -35_309_556);
	a = hh(a, b, c, d, k[1], 4, -1_530_992_060);
	d = hh(d, a, b, c, k[4], 11, 1_272_893_353);
	c = hh(c, d, a, b, k[7], 16, -155_497_632);
	b = hh(b, c, d, a, k[10], 23, -1_094_730_640);
	a = hh(a, b, c, d, k[13], 4, 681_279_174);
	d = hh(d, a, b, c, k[0], 11, -358_537_222);
	c = hh(c, d, a, b, k[3], 16, -722_521_979);
	b = hh(b, c, d, a, k[6], 23, 76_029_189);
	a = hh(a, b, c, d, k[9], 4, -640_364_487);
	d = hh(d, a, b, c, k[12], 11, -421_815_835);
	c = hh(c, d, a, b, k[15], 16, 530_742_520);
	b = hh(b, c, d, a, k[2], 23, -995_338_651);

	a = ii(a, b, c, d, k[0], 6, -198_630_844);
	d = ii(d, a, b, c, k[7], 10, 1_126_891_415);
	c = ii(c, d, a, b, k[14], 15, -1_416_354_905);
	b = ii(b, c, d, a, k[5], 21, -57_434_055);
	a = ii(a, b, c, d, k[12], 6, 1_700_485_571);
	d = ii(d, a, b, c, k[3], 10, -1_894_986_606);
	c = ii(c, d, a, b, k[10], 15, -1_051_523);
	b = ii(b, c, d, a, k[1], 21, -2_054_922_799);
	a = ii(a, b, c, d, k[8], 6, 1_873_313_359);
	d = ii(d, a, b, c, k[15], 10, -30_611_744);
	c = ii(c, d, a, b, k[6], 15, -1_560_198_380);
	b = ii(b, c, d, a, k[13], 21, 1_309_151_649);
	a = ii(a, b, c, d, k[4], 6, -145_523_070);
	d = ii(d, a, b, c, k[11], 10, -1_120_210_379);
	c = ii(c, d, a, b, k[2], 15, 718_787_259);
	b = ii(b, c, d, a, k[9], 21, -343_485_551);

	x[0] = add32(a, x[0]);
	x[1] = add32(b, x[1]);
	x[2] = add32(c, x[2]);
	x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
	a = add32(add32(a, q), add32(x, t));
	return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
	return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
	return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
	return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
	return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function call(h, data, o) {
	// Break chunk into sixteen 32-bit little-endian words w[i], 0 ≤ i ≤ 15

	const w = [
		lil32(data, o + 0),
		lil32(data, o + 4),
		lil32(data, o + 8),
		lil32(data, o + 12),
		lil32(data, o + 16),
		lil32(data, o + 20),
		lil32(data, o + 24),
		lil32(data, o + 28),
		lil32(data, o + 32),
		lil32(data, o + 36),
		lil32(data, o + 40),
		lil32(data, o + 44),
		lil32(data, o + 48),
		lil32(data, o + 52),
		lil32(data, o + 56),
		lil32(data, o + 60),
	];

	cycle(h, w);
}

/**
 * MD5 inlined implementation
 */

export function md5fast(bytes, n, digest) {
	// PREPARE

	const q = (n / 8) | 0;
	const z = q * 8;
	const u = n - z;

	// Append the bit '1' to the message
	const last = u > 0 ? bytes[q] & (~0 << (7 - u)) : 0x80;

	// Initialize state
	const h = [
		get32(0x67_45_23_01),
		get32(0xef_cd_ab_89),
		get32(0x98_ba_dc_fe),
		get32(0x10_32_54_76),
	];

	// Process the message in successive 512-bit chunks:
	// break message into 512-bit chunks

	const m = (n / 512) | 0;
	const y = ((n - 512 * m) / 8) | 0;

	// For each chunk
	let o = 0;

	for (let j = 0; j < m; ++j, o += 64) {
		call(h, bytes, o);
	}

	let tail = [];

	for (let j = 0; j < y; ++j) {
		tail.push(bytes[o + j]);
	}

	tail.push(last);

	// Append 0 ≤ k < 512 bits '0', so that the resulting
	// message length (in bits) is congruent to 448 (mod 512)
	let zeroes = ((448 - ((n + 1) % 512)) / 8) | 0;

	if (zeroes < 0) {
		for (let j = 0; j < -zeroes; ++j) {
			tail.push(0);
		}

		call(h, tail, 0);

		zeroes = 448 / 8;
		tail = [];
	}

	for (let j = 0; j < zeroes; ++j) {
		tail.push(0);
	}

	// Append length of message (before preparation), in bits,
	// as 64-bit little-endian integer

	tail.push(
		(n >>> 0) & 0xff,
		(n >>> 8) & 0xff,
		(n >>> 16) & 0xff,
		(n >>> 24) & 0xff,
		0,
		0,
		0,
		0,
	);

	call(h, tail, 0);

	digest[0] = (h[0] >>> 0) & 0xff;
	digest[1] = (h[0] >>> 8) & 0xff;
	digest[2] = (h[0] >>> 16) & 0xff;
	digest[3] = (h[0] >>> 24) & 0xff;
	digest[4] = (h[1] >>> 0) & 0xff;
	digest[5] = (h[1] >>> 8) & 0xff;
	digest[6] = (h[1] >>> 16) & 0xff;
	digest[7] = (h[1] >>> 24) & 0xff;
	digest[8] = (h[2] >>> 0) & 0xff;
	digest[9] = (h[2] >>> 8) & 0xff;
	digest[10] = (h[2] >>> 16) & 0xff;
	digest[11] = (h[2] >>> 24) & 0xff;
	digest[12] = (h[3] >>> 0) & 0xff;
	digest[13] = (h[3] >>> 8) & 0xff;
	digest[14] = (h[3] >>> 16) & 0xff;
	digest[15] = (h[3] >>> 24) & 0xff;

	return digest;
}
