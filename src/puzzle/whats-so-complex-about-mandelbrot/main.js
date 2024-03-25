
var hypot = function(x, y) {

	var a = Math.abs(x);
	var b = Math.abs(y);

	if (a < 3000 && b < 3000) {
		return Math.sqrt(a * a + b * b);
	}

	if (a < b) {
		a = b;
		b = x / y;
	} else {
		b = y / x;
	}
	return a * Math.sqrt(1 + b * b);
};

function logHypot(a, b) {

	var _a = Math.abs(a);
	var _b = Math.abs(b);

	if (a === 0) {
		return Math.log(_b);
	}

	if (b === 0) {
		return Math.log(_a);
	}

	if (_a < 3000 && _b < 3000) {
		return Math.log(a * a + b * b) * 0.5;
	}

	return Math.log(a / Math.cos(Math.atan2(b, a)));
}

var parse = function(a, b) {

	var z = {'re': 0, 'im': 0};

	if (a === undefined || a === null) {
		z.re =
			z.im = 0;
	} else if (b !== undefined) {
		z.re = a;
		z.im = b;
	} else
		switch (typeof a) {

			case 'object':

				if ('im' in a && 're' in a) {
					z.re = a.re;
					z.im = a.im;
				} else if ('abs' in a && 'arg' in a) {
					if (!Number.isFinite(a.abs) && Number.isFinite(a.arg)) {
						return Complex.INFINITY;
					}
					z.re = a.abs * Math.cos(a.arg);
					z.im = a.abs * Math.sin(a.arg);
				} else if ('r' in a && 'phi' in a) {
					if (!Number.isFinite(a.r) && Number.isFinite(a.phi)) {
						return Complex.INFINITY;
					}
					z.re = a.r * Math.cos(a.phi);
					z.im = a.r * Math.sin(a.phi);
				} else if (a.length === 2) { // Quick array check
					z.re = a[0];
					z.im = a[1];
				} else {
					throw SyntaxError('Invalid Param');
				}

				break;

			case 'string':

				z.im = /* void */
					z.re = 0;

				var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
				var plus = 1;
				var minus = 0;

				if (tokens === null) {
					throw SyntaxError('Invalid Param');
				}

				for (var i = 0; i < tokens.length; i++) {

					var c = tokens[i];

					if (c === ' ' || c === '\t' || c === '\n') {
						/* void */
					} else if (c === '+') {
						plus++;
					} else if (c === '-') {
						minus++;
					} else if (c === 'i' || c === 'I') {

						if (plus + minus === 0) {
							throw SyntaxError('Invalid Param');
						}

						if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
							z.im += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
							i++;
						} else {
							z.im += parseFloat((minus % 2 ? '-' : '') + '1');
						}
						plus = minus = 0;

					} else {

						if (plus + minus === 0 || isNaN(c)) {
							throw SyntaxError('Invalid Param');
						}

						if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
							z.im += parseFloat((minus % 2 ? '-' : '') + c);
							i++;
						} else {
							z.re += parseFloat((minus % 2 ? '-' : '') + c);
						}
						plus = minus = 0;
					}
				}

				if (plus + minus > 0) {
					throw SyntaxError('Invalid Param');
				}
				break;

			case 'number':
				z.im = 0;
				z.re = a;
				break;

			default:
				parser_exit();
		}

	return z;
};

function Complex(a, b) {

	if (!(this instanceof Complex)) {
		return new Complex(a, b);
	}

	var z = parse(a, b);

	this.re = z.re;
	this.im = z.im;
}

Complex.prototype = {

	're': 0,
	'im': 0,

	'add': function(a, b) {

		var z = new Complex(a, b);

		if (this.isInfinite() && z.isInfinite()) {
			return Complex.NAN;
		}

		if (this.isInfinite() || z.isInfinite()) {
			return Complex.INFINITY;
		}

		return new Complex(
			this.re + z.re,
			this.im + z.im);
	},

	'pow': function(a, b) {

		var z = new Complex(a, b);

		a = this.re;
		b = this.im;

		if (z.isZero()) {
			return Complex.ONE;
		}

		if (z.im === 0) {

			if (b === 0 && a >= 0) {

				return new Complex(Math.pow(a, z.re), 0);

			} else if (a === 0) {

				switch ((z.re % 4 + 4) % 4) {
					case 0:
						return new Complex(Math.pow(b, z.re), 0);
					case 1:
						return new Complex(0, Math.pow(b, z.re));
					case 2:
						return new Complex(-Math.pow(b, z.re), 0);
					case 3:
						return new Complex(0, -Math.pow(b, z.re));
				}
			}
		}

		if (a === 0 && b === 0 && z.re > 0 && z.im >= 0) {
			return Complex.ZERO;
		}

		var arg = Math.atan2(b, a);
		var loh = logHypot(a, b);

		a = Math.exp(z.re * loh - z.im * arg);
		b = z.im * loh + z.re * arg;
		return new Complex(
			a * Math.cos(b),
			a * Math.sin(b));
	},

	'abs': function() {

		return hypot(this.re, this.im);
	},

	'isNaN': function() {
		return isNaN(this.re) || isNaN(this.im);
	},

	'isZero': function() {
		return (
			(this.re === 0 || this.re === -0) &&
			(this.im === 0 || this.im === -0)
		);
	},

	'isFinite': function() {
		return isFinite(this.re) && isFinite(this.im);
	},

	'isInfinite': function() {
		return !(this['isNaN']() || this['isFinite']());
	}
};

var c = new Complex(readline());
var m = parseInt(readline());

var f = new Complex("0+0i");
var iterate = 0;
while(iterate < m){
	if(f.abs() > 2) break;
	f = f.pow(2).add(c);
	iterate++;
}

print(iterate);