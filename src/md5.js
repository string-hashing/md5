import {get32, add32, rotl32, lil32} from '@arithmetic-type/uint32';

function cycle(h, k, r, w) {
	// Initialize hash value for this chunk:
	let a = h[0];
	let b = h[1];
	let c = h[2];
	let d = h[3];

	// Main loop
	for (let i = 0; i < 64; ++i) {
		let f;
		let g;

		if (i < 16) {
			f = (b & c) | (~b & d);
			g = i;
		} else if (i < 32) {
			f = (d & b) | (~d & c);
			g = (5 * i + 1) % 16;
		} else if (i < 48) {
			f = b ^ c ^ d;
			g = (3 * i + 5) % 16;
		} else {
			f = c ^ (b | ~d);
			g = (7 * i) % 16;
		}

		const t = d;
		d = c;
		c = b;
		b = add32(b, rotl32(add32(add32(a, f), add32(k[i], w[g])), r[i]));
		a = t;
	}

	// Add this chunk's hash to result so far:
	h[0] = add32(h[0], a);
	h[1] = add32(h[1], b);
	h[2] = add32(h[2], c);
	h[3] = add32(h[3], d);
}

function call(h, k, r, data, o) {
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

	cycle(h, k, r, w);
}

/**
 * MD5
 */
export function md5(bytes, n, digest) {
	const k = [
		get32(0xd7_6a_a4_78),
		get32(0xe8_c7_b7_56),
		get32(0x24_20_70_db),
		get32(0xc1_bd_ce_ee),
		get32(0xf5_7c_0f_af),
		get32(0x47_87_c6_2a),
		get32(0xa8_30_46_13),
		get32(0xfd_46_95_01),
		get32(0x69_80_98_d8),
		get32(0x8b_44_f7_af),
		get32(0xff_ff_5b_b1),
		get32(0x89_5c_d7_be),
		get32(0x6b_90_11_22),
		get32(0xfd_98_71_93),
		get32(0xa6_79_43_8e),
		get32(0x49_b4_08_21),
		get32(0xf6_1e_25_62),
		get32(0xc0_40_b3_40),
		get32(0x26_5e_5a_51),
		get32(0xe9_b6_c7_aa),
		get32(0xd6_2f_10_5d),
		get32(0x02_44_14_53),
		get32(0xd8_a1_e6_81),
		get32(0xe7_d3_fb_c8),
		get32(0x21_e1_cd_e6),
		get32(0xc3_37_07_d6),
		get32(0xf4_d5_0d_87),
		get32(0x45_5a_14_ed),
		get32(0xa9_e3_e9_05),
		get32(0xfc_ef_a3_f8),
		get32(0x67_6f_02_d9),
		get32(0x8d_2a_4c_8a),
		get32(0xff_fa_39_42),
		get32(0x87_71_f6_81),
		get32(0x6d_9d_61_22),
		get32(0xfd_e5_38_0c),
		get32(0xa4_be_ea_44),
		get32(0x4b_de_cf_a9),
		get32(0xf6_bb_4b_60),
		get32(0xbe_bf_bc_70),
		get32(0x28_9b_7e_c6),
		get32(0xea_a1_27_fa),
		get32(0xd4_ef_30_85),
		get32(0x04_88_1d_05),
		get32(0xd9_d4_d0_39),
		get32(0xe6_db_99_e5),
		get32(0x1f_a2_7c_f8),
		get32(0xc4_ac_56_65),
		get32(0xf4_29_22_44),
		get32(0x43_2a_ff_97),
		get32(0xab_94_23_a7),
		get32(0xfc_93_a0_39),
		get32(0x65_5b_59_c3),
		get32(0x8f_0c_cc_92),
		get32(0xff_ef_f4_7d),
		get32(0x85_84_5d_d1),
		get32(0x6f_a8_7e_4f),
		get32(0xfe_2c_e6_e0),
		get32(0xa3_01_43_14),
		get32(0x4e_08_11_a1),
		get32(0xf7_53_7e_82),
		get32(0xbd_3a_f2_35),
		get32(0x2a_d7_d2_bb),
		get32(0xeb_86_d3_91),
	];

	const r = [
		7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
		9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
		16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
		15, 21,
	];

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

	// Offset in data
	let o = 0;

	// For each chunk
	for (let j = 0; j < m; ++j, o += 64) {
		call(h, k, r, bytes, o);
	}

	// Last bytes + padding + length
	let tail = [];

	// Last bytes
	for (let j = 0; j < y; ++j) {
		tail.push(bytes[o + j]);
	}

	// Special care taken for the very last byte which could
	// have been modified if n is not a multiple of 8
	tail.push(last);

	// Append 0 ≤ k < 512 bits '0', so that the resulting
	// message length (in bits) is congruent to 448 (mod 512)
	let zeroes = ((448 - ((n + 1) % 512)) / 8) | 0;

	if (zeroes < 0) {
		// We need an additional block as there is
		// not enough space left to append
		// the length of the data in bits

		for (let j = 0; j < -zeroes; ++j) {
			tail.push(0);
		}

		call(h, k, r, tail, 0);

		zeroes = 448 / 8;
		tail = [];
	}

	// Pad with zeroes
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

	call(h, k, r, tail, 0);

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
