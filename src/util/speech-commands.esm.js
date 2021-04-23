/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import {
	util,
	dispose,
	io,
	tidy,
	zeros,
	Tensor,
	tensor4d,
	unstack,
	max,
	slice,
	scalar,
	backend,
	moments,
	div,
	sub,
	add,
	sqrt,
	tensor1d,
	tensor3d,
	squeeze,
	oneHot,
	cast,
	stack,
	mul,
	tensor2d,
	mean,
	argMax,
	tensor,
	gather,
} from "@tensorflow/tfjs-core";
import { array, zip } from "@tensorflow/tfjs-data";
import { loadLayersModel, model, sequential, layers } from "@tensorflow/tfjs-layers";
var extendStatics = function (e, t) {
	return (extendStatics =
		Object.setPrototypeOf ||
		({ __proto__: [] } instanceof Array &&
			function (e, t) {
				e.__proto__ = t;
			}) ||
		function (e, t) {
			for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
		})(e, t);
};
function __extends(e, t) {
	function r() {
		this.constructor = e;
	}
	extendStatics(e, t),
		(e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r()));
}
var __assign = function () {
	return (__assign =
		Object.assign ||
		function (e) {
			for (var t, r = 1, n = arguments.length; r < n; r++)
				for (var a in (t = arguments[r]))
					Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
			return e;
		}).apply(this, arguments);
};
function __awaiter(e, t, r, n) {
	return new (r || (r = Promise))(function (a, i) {
		function o(e) {
			try {
				l(n.next(e));
			} catch (e) {
				i(e);
			}
		}
		function s(e) {
			try {
				l(n.throw(e));
			} catch (e) {
				i(e);
			}
		}
		function l(e) {
			var t;
			e.done
				? a(e.value)
				: ((t = e.value),
				  t instanceof r
						? t
						: new r(function (e) {
								e(t);
						  })).then(o, s);
		}
		l((n = n.apply(e, t || [])).next());
	});
}
function __generator(e, t) {
	var r,
		n,
		a,
		i,
		o = {
			label: 0,
			sent: function () {
				if (1 & a[0]) throw a[1];
				return a[1];
			},
			trys: [],
			ops: [],
		};
	return (
		(i = { next: s(0), throw: s(1), return: s(2) }),
		"function" == typeof Symbol &&
			(i[Symbol.iterator] = function () {
				return this;
			}),
		i
	);
	function s(i) {
		return function (s) {
			return (function (i) {
				if (r) throw new TypeError("Generator is already executing.");
				for (; o; )
					try {
						if (
							((r = 1),
							n &&
								(a =
									2 & i[0]
										? n.return
										: i[0]
										? n.throw || ((a = n.return) && a.call(n), 0)
										: n.next) &&
								!(a = a.call(n, i[1])).done)
						)
							return a;
						switch (((n = 0), a && (i = [2 & i[0], a.value]), i[0])) {
							case 0:
							case 1:
								a = i;
								break;
							case 4:
								return o.label++, { value: i[1], done: !1 };
							case 5:
								o.label++, (n = i[1]), (i = [0]);
								continue;
							case 7:
								(i = o.ops.pop()), o.trys.pop();
								continue;
							default:
								if (
									!(a = (a = o.trys).length > 0 && a[a.length - 1]) &&
									(6 === i[0] || 2 === i[0])
								) {
									o = 0;
									continue;
								}
								if (3 === i[0] && (!a || (i[1] > a[0] && i[1] < a[3]))) {
									o.label = i[1];
									break;
								}
								if (6 === i[0] && o.label < a[1]) {
									(o.label = a[1]), (a = i);
									break;
								}
								if (a && o.label < a[2]) {
									(o.label = a[2]), o.ops.push(i);
									break;
								}
								a[2] && o.ops.pop(), o.trys.pop();
								continue;
						}
						i = t.call(e, o);
					} catch (e) {
						(i = [6, e]), (n = 0);
					} finally {
						r = a = 0;
					}
				if (5 & i[0]) throw i[1];
				return { value: i[0] ? i[1] : void 0, done: !0 };
			})([i, s]);
		};
	}
}
function __values(e) {
	var t = "function" == typeof Symbol && Symbol.iterator,
		r = t && e[t],
		n = 0;
	if (r) return r.call(e);
	if (e && "number" == typeof e.length)
		return {
			next: function () {
				return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
			},
		};
	throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(e, t) {
	var r = "function" == typeof Symbol && e[Symbol.iterator];
	if (!r) return e;
	var n,
		a,
		i = r.call(e),
		o = [];
	try {
		for (; (void 0 === t || t-- > 0) && !(n = i.next()).done; ) o.push(n.value);
	} catch (e) {
		a = { error: e };
	} finally {
		try {
			n && !n.done && (r = i.return) && r.call(i);
		} finally {
			if (a) throw a.error;
		}
	}
	return o;
}
function __spread() {
	for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(__read(arguments[t]));
	return e;
}
function loadMetadataJson(e) {
	return __awaiter(this, void 0, void 0, function () {
		var t, r, n, a, i, o, s, l;
		return __generator(this, function (u) {
			switch (u.label) {
				case 0:
					return (
						(t = "http://"),
						(r = "https://"),
						(n = "file://"),
						0 !== e.indexOf(t) && 0 !== e.indexOf(r) ? [3, 3] : [4, fetch(e)]
					);
				case 1:
					return [4, u.sent().json()];
				case 2:
					return [2, u.sent()];
				case 3:
					return 0 !== e.indexOf(n)
						? [3, 5]
						: ((a = require("fs")),
						  (i = require("util").promisify),
						  (o = i(a.readFile)),
						  (l = (s = JSON).parse),
						  [4, o(e.slice(n.length), { encoding: "utf-8" })]);
				case 4:
					return [2, l.apply(s, [u.sent()])];
				case 5:
					throw new Error(
						"Unsupported URL scheme in metadata URL: " +
							e +
							". Supported schemes are: http://, https://, and (node.js-only) file://"
					);
			}
		});
	});
}
var EPSILON = null;
function normalize(e) {
	return (
		null == EPSILON && (EPSILON = backend().epsilon()),
		tidy(function () {
			var t = moments(e),
				r = t.mean,
				n = t.variance;
			return div(sub(e, r), add(sqrt(n), EPSILON));
		})
	);
}
function normalizeFloat32Array(e) {
	if (e.length < 2)
		throw new Error("Cannot normalize a Float32Array with fewer than 2 elements.");
	return (
		null == EPSILON && (EPSILON = backend().epsilon()),
		tidy(function () {
			var t = moments(tensor1d(e)),
				r = t.mean,
				n = t.variance,
				a = r.arraySync(),
				i = Math.sqrt(n.arraySync()),
				o = Array.from(e).map(function (e) {
					return (e - a) / (i + EPSILON);
				});
			return new Float32Array(o);
		})
	);
}
function getAudioContextConstructor() {
	return window.AudioContext || window.webkitAudioContext;
}
function getAudioMediaStream(e) {
	return __awaiter(this, void 0, void 0, function () {
		return __generator(this, function (t) {
			return [2, navigator.mediaDevices.getUserMedia({ audio: null == e || e, video: !1 })];
		});
	});
}
function playRawAudio(e, t) {
	var r = new (window.AudioContext || window.webkitAudioContext)(),
		n = r.createBuffer(1, e.data.length, e.sampleRateHz);
	n.getChannelData(0).set(e.data);
	var a = r.createBufferSource();
	(a.buffer = n),
		a.connect(r.destination),
		a.start(),
		(a.onended = function () {
			null != t && t();
		});
}
var BrowserFftFeatureExtractor = (function () {
	function e(e) {
		var t = this;
		if (null == e)
			throw new Error(
				"Required configuration object is missing for BrowserFftFeatureExtractor constructor"
			);
		if (null == e.spectrogramCallback)
			throw new Error("spectrogramCallback cannot be null or undefined");
		if (!(e.numFramesPerSpectrogram > 0))
			throw new Error(
				"Invalid value in numFramesPerSpectrogram: " + e.numFramesPerSpectrogram
			);
		if (e.suppressionTimeMillis < 0)
			throw new Error(
				"Expected suppressionTimeMillis to be >= 0, but got " + e.suppressionTimeMillis
			);
		if (
			((this.suppressionTimeMillis = e.suppressionTimeMillis),
			(this.spectrogramCallback = e.spectrogramCallback),
			(this.numFrames = e.numFramesPerSpectrogram),
			(this.sampleRateHz = e.sampleRateHz || 44100),
			(this.fftSize = e.fftSize || 1024),
			(this.frameDurationMillis = (this.fftSize / this.sampleRateHz) * 1e3),
			(this.columnTruncateLength = e.columnTruncateLength || this.fftSize),
			(this.overlapFactor = e.overlapFactor),
			(this.includeRawAudio = e.includeRawAudio),
			util.assert(this.overlapFactor >= 0 && this.overlapFactor < 1, function () {
				return "Expected overlapFactor to be >= 0 and < 1, but got " + t.overlapFactor;
			}),
			this.columnTruncateLength > this.fftSize)
		)
			throw new Error(
				"columnTruncateLength " +
					this.columnTruncateLength +
					" exceeds fftSize (" +
					this.fftSize +
					")."
			);
		this.audioContextConstructor = getAudioContextConstructor();
	}
	return (
		(e.prototype.start = function (e) {
			return __awaiter(this, void 0, void 0, function () {
				var t, r, n;
				return __generator(this, function (a) {
					switch (a.label) {
						case 0:
							if (null != this.frameIntervalTask)
								throw new Error(
									"Cannot start already-started BrowserFftFeatureExtractor"
								);
							return (t = this), [4, getAudioMediaStream(e)];
						case 1:
							return (
								(t.stream = a.sent()),
								(this.audioContext = new this.audioContextConstructor({
									sampleRate: this.sampleRateHz,
								})),
								(r = this.audioContext.createMediaStreamSource(this.stream)),
								(this.analyser = this.audioContext.createAnalyser()),
								(this.analyser.fftSize = 2 * this.fftSize),
								(this.analyser.smoothingTimeConstant = 0),
								r.connect(this.analyser),
								(this.freqDataQueue = []),
								(this.freqData = new Float32Array(this.fftSize)),
								this.includeRawAudio &&
									((this.timeDataQueue = []),
									(this.timeData = new Float32Array(this.fftSize))),
								(n = Math.max(
									1,
									Math.round(this.numFrames * (1 - this.overlapFactor))
								)),
								(this.tracker = new Tracker(
									n,
									Math.round(
										this.suppressionTimeMillis / this.frameDurationMillis
									)
								)),
								(this.frameIntervalTask = setInterval(
									this.onAudioFrame.bind(this),
									(this.fftSize / this.sampleRateHz) * 1e3
								)),
								[2]
							);
					}
				});
			});
		}),
		(e.prototype.onAudioFrame = function () {
			return __awaiter(this, void 0, void 0, function () {
				var e, t, r, n;
				return __generator(this, function (a) {
					switch (a.label) {
						case 0:
							return (
								this.analyser.getFloatFrequencyData(this.freqData),
								this.freqData[0] === -1 / 0
									? [2]
									: (this.freqDataQueue.push(
											this.freqData.slice(0, this.columnTruncateLength)
									  ),
									  this.includeRawAudio &&
											(this.analyser.getFloatTimeDomainData(this.timeData),
											this.timeDataQueue.push(this.timeData.slice())),
									  this.freqDataQueue.length > this.numFrames &&
											this.freqDataQueue.shift(),
									  this.tracker.tick()
											? ((e = flattenQueue(this.freqDataQueue)),
											  (t = getInputTensorFromFrequencyData(e, [
													1,
													this.numFrames,
													this.columnTruncateLength,
													1,
											  ])),
											  (r = void 0),
											  this.includeRawAudio &&
													((n = flattenQueue(this.timeDataQueue)),
													(r = getInputTensorFromFrequencyData(n, [
														1,
														this.numFrames * this.fftSize,
													]))),
											  [4, this.spectrogramCallback(t, r)])
											: [3, 2])
							);
						case 1:
							a.sent() && this.tracker.suppress(), dispose([t, r]), (a.label = 2);
						case 2:
							return [2];
					}
				});
			});
		}),
		(e.prototype.stop = function () {
			return __awaiter(this, void 0, void 0, function () {
				return __generator(this, function (e) {
					if (null == this.frameIntervalTask)
						throw new Error(
							"Cannot stop because there is no ongoing streaming activity."
						);
					return (
						clearInterval(this.frameIntervalTask),
						(this.frameIntervalTask = null),
						this.analyser.disconnect(),
						this.audioContext.close(),
						null != this.stream &&
							this.stream.getTracks().length > 0 &&
							this.stream.getTracks()[0].stop(),
						[2]
					);
				});
			});
		}),
		(e.prototype.setConfig = function (e) {
			throw new Error("setConfig() is not implemented for BrowserFftFeatureExtractor.");
		}),
		(e.prototype.getFeatures = function () {
			throw new Error(
				"getFeatures() is not implemented for BrowserFftFeatureExtractor. Use the spectrogramCallback field of the constructor config instead."
			);
		}),
		e
	);
})();
function flattenQueue(e) {
	var t = e[0].length,
		r = new Float32Array(e.length * t);
	return (
		e.forEach(function (e, n) {
			return r.set(e, n * t);
		}),
		r
	);
}
function getInputTensorFromFrequencyData(e, t) {
	var r = new Float32Array(util.sizeFromShape(t));
	return r.set(e, r.length - e.length), tensor(r, t);
}
var Tracker = (function () {
	function e(e, t) {
		var r = this;
		(this.period = e),
			(this.suppressionTime = null == t ? 0 : t),
			(this.counter = 0),
			util.assert(this.period > 0, function () {
				return "Expected period to be positive, but got " + r.period;
			});
	}
	return (
		(e.prototype.tick = function () {
			return (
				this.counter++,
				this.counter % this.period == 0 &&
					(null == this.suppressionOnset ||
						this.counter - this.suppressionOnset > this.suppressionTime)
			);
		}),
		(e.prototype.suppress = function () {
			this.suppressionOnset = this.counter;
		}),
		e
	);
})();
function concatenateArrayBuffers(e) {
	var t = 0;
	e.forEach(function (e) {
		t += e.byteLength;
	});
	var r = new Uint8Array(t),
		n = 0;
	return (
		e.forEach(function (e) {
			r.set(new Uint8Array(e), n), (n += e.byteLength);
		}),
		r.buffer
	);
}
function concatenateFloat32Arrays(e) {
	var t = 0;
	e.forEach(function (e) {
		return (t += e.length);
	});
	var r = new Float32Array(t),
		n = 0;
	return (
		e.forEach(function (e) {
			r.set(e, n), (n += e.length);
		}),
		r
	);
}
function string2ArrayBuffer(e) {
	if (null == e) throw new Error("Received null or undefind string");
	for (
		var t = unescape(encodeURIComponent(e)), r = new Uint8Array(t.length), n = 0;
		n < t.length;
		++n
	)
		r[n] = t.charCodeAt(n);
	return r.buffer;
}
function arrayBuffer2String(e) {
	if (null == e) throw new Error("Received null or undefind buffer");
	var t = new Uint8Array(e);
	return decodeURIComponent(escape(String.fromCharCode.apply(String, __spread(t))));
}
function getUID() {
	function e() {
		return Math.floor(65536 * (1 + Math.random()))
			.toString(16)
			.substring(1);
	}
	return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
}
function getRandomInteger(e, t) {
	return Math.floor((t - e) * Math.random()) + e;
}
function balancedTrainValSplit(e, t, r) {
	return (
		util.assert(r > 0 && r < 1, function () {
			return "validationSplit is expected to be >0 and <1, but got " + r;
		}),
		tidy(function () {
			for (var n = argMax(t, -1).dataSync(), a = [], i = 0; i < n.length; ++i) {
				var o = n[i];
				null == a[o] && (a[o] = []), a[o].push(i);
			}
			var s = a.length,
				l = [],
				u = [];
			a.map(function (e) {
				return util.shuffle(e);
			});
			for (i = 0; i < s; ++i)
				for (var c = a[i], h = Math.round(c.length * (1 - r)), d = 0; d < c.length; ++d)
					d < h ? l.push(c[d]) : u.push(c[d]);
			return {
				trainXs: gather(e, l),
				trainYs: gather(t, l),
				valXs: gather(e, u),
				valYs: gather(t, u),
			};
		})
	);
}
function balancedTrainValSplitNumArrays(e, t, r) {
	var n, a, i, o, s, l, u, c;
	util.assert(r > 0 && r < 1, function () {
		return "validationSplit is expected to be >0 and <1, but got " + r;
	});
	for (var h = !Array.isArray(e[0]), d = t, p = [], f = 0; f < d.length; ++f) {
		var m = d[f];
		null == p[m] && (p[m] = []), p[m].push(f);
	}
	var g = p.length,
		v = [],
		y = [];
	p.map(function (e) {
		return util.shuffle(e);
	});
	for (f = 0; f < g; ++f)
		for (var w = p[f], b = Math.round(w.length * (1 - r)), _ = 0; _ < w.length; ++_)
			_ < b ? v.push(w[_]) : y.push(w[_]);
	if (h) {
		var S = [],
			E = [],
			x = [],
			A = [];
		try {
			for (var T = __values(v), I = T.next(); !I.done; I = T.next()) {
				var D = I.value;
				S.push(e[D]), E.push(t[D]);
			}
		} catch (e) {
			n = { error: e };
		} finally {
			try {
				I && !I.done && (a = T.return) && a.call(T);
			} finally {
				if (n) throw n.error;
			}
		}
		try {
			for (var F = __values(y), O = F.next(); !O.done; O = F.next()) {
				D = O.value;
				x.push(e[D]), A.push(t[D]);
			}
		} catch (e) {
			i = { error: e };
		} finally {
			try {
				O && !O.done && (o = F.return) && o.call(F);
			} finally {
				if (i) throw i.error;
			}
		}
		return { trainXs: S, trainYs: E, valXs: x, valYs: A };
	}
	(S = []), (E = []), (x = []), (A = []);
	try {
		for (var M = __values(v), z = M.next(); !z.done; z = M.next()) {
			D = z.value;
			S.push(e[D]), E.push(t[D]);
		}
	} catch (e) {
		s = { error: e };
	} finally {
		try {
			z && !z.done && (l = M.return) && l.call(M);
		} finally {
			if (s) throw s.error;
		}
	}
	try {
		for (var R = __values(y), L = R.next(); !L.done; L = R.next()) {
			D = L.value;
			x.push(e[D]), A.push(t[D]);
		}
	} catch (e) {
		u = { error: e };
	} finally {
		try {
			L && !L.done && (c = R.return) && c.call(R);
		} finally {
			if (u) throw u.error;
		}
	}
	return { trainXs: S, trainYs: E, valXs: x, valYs: A };
}
var DATASET_SERIALIZATION_DESCRIPTOR = "TFJSSCDS",
	DATASET_SERIALIZATION_VERSION = 1,
	BACKGROUND_NOISE_TAG = "_background_noise_",
	Dataset = (function () {
		function e(e) {
			if (((this.examples = {}), (this.label2Ids = {}), null != e))
				for (
					var t = arrayBuffer2SerializedExamples(e), r = 0, n = 0;
					n < t.manifest.length;
					++n
				) {
					var a = t.manifest[n],
						i = a.spectrogramNumFrames * a.spectrogramFrameSize;
					null != a.rawAudioNumSamples && (i += a.rawAudioNumSamples),
						(i *= 4),
						this.addExample(
							deserializeExample({ spec: a, data: t.data.slice(r, r + i) })
						),
						(r += i);
				}
		}
		return (
			(e.prototype.addExample = function (e) {
				util.assert(null != e, function () {
					return "Got null or undefined example";
				}),
					util.assert(null != e.label && e.label.length > 0, function () {
						return (
							"Expected label to be a non-empty string, but got " +
							JSON.stringify(e.label)
						);
					});
				var t = getUID();
				return (
					(this.examples[t] = e),
					e.label in this.label2Ids || (this.label2Ids[e.label] = []),
					this.label2Ids[e.label].push(t),
					t
				);
			}),
			(e.prototype.merge = function (e) {
				var t, r, n, a;
				util.assert(e !== this, function () {
					return "Cannot merge a dataset into itself";
				});
				var i = e.getVocabulary();
				try {
					for (var o = __values(i), s = o.next(); !s.done; s = o.next()) {
						var l = s.value,
							u = e.getExamples(l);
						try {
							for (
								var c = ((n = void 0), __values(u)), h = c.next();
								!h.done;
								h = c.next()
							) {
								var d = h.value;
								this.addExample(d.example);
							}
						} catch (e) {
							n = { error: e };
						} finally {
							try {
								h && !h.done && (a = c.return) && a.call(c);
							} finally {
								if (n) throw n.error;
							}
						}
					}
				} catch (e) {
					t = { error: e };
				} finally {
					try {
						s && !s.done && (r = o.return) && r.call(o);
					} finally {
						if (t) throw t.error;
					}
				}
			}),
			(e.prototype.getExampleCounts = function () {
				var e = {};
				for (var t in this.examples) {
					var r = this.examples[t];
					r.label in e || (e[r.label] = 0), e[r.label]++;
				}
				return e;
			}),
			(e.prototype.getExamples = function (e) {
				var t = this;
				util.assert(null != e, function () {
					return "Expected label to be a string, but got " + JSON.stringify(e);
				}),
					util.assert(e in this.label2Ids, function () {
						return 'No example of label "' + e + '" exists in dataset';
					});
				var r = [];
				return (
					this.label2Ids[e].forEach(function (e) {
						r.push({ uid: e, example: t.examples[e] });
					}),
					r
				);
			}),
			(e.prototype.getData = function (e, t) {
				var r = this;
				util.assert(this.size() > 0, function () {
					return "Cannot get spectrograms as tensors because the dataset is empty";
				});
				var n = this.getVocabulary();
				null != e
					? util.assert(-1 !== n.indexOf(e), function () {
							return (
								"Label " +
								e +
								" is not in the vocabulary (" +
								JSON.stringify(n) +
								")"
							);
					  })
					: util.assert(n.length > 1, function () {
							return (
								"One-hot encoding of labels requires the vocabulary to have at least two words, but it has only " +
								n.length +
								" word."
							);
					  }),
					null == t && (t = {});
				var a,
					i,
					o = this.getSortedUniqueNumFrames();
				1 === o.length
					? ((a = null == t.numFrames ? o[0] : t.numFrames),
					  (i = null == t.hopFrames ? 1 : t.hopFrames))
					: ((a = t.numFrames),
					  util.assert(null != a && Number.isInteger(a) && a > 0, function () {
							return (
								"There are " +
								o.length +
								" unique lengths among the " +
								r.size() +
								" examples of this Dataset, hence numFrames is required. But it is not provided."
							);
					  }),
					  util.assert(a <= o[0], function () {
							return (
								"numFrames (" +
								a +
								") exceeds the minimum numFrames (" +
								o[0] +
								") among the examples of the Dataset."
							);
					  }),
					  (i = t.hopFrames),
					  util.assert(null != i && Number.isInteger(i) && i > 0, function () {
							return (
								"There are " +
								o.length +
								" unique lengths among the " +
								r.size() +
								" examples of this Dataset, hence hopFrames is required. But it is not provided."
							);
					  }));
				var s = null == t.normalize || t.normalize;
				return tidy(function () {
					for (var o, l, u, c = [], h = [], d = [], p = 0; p < n.length; ++p) {
						var f = n[p];
						if (null == e || f === e) {
							var m = r.label2Ids[f],
								g = function (n) {
									var o,
										l,
										m = r.examples[n].spectrogram,
										g = m.frameSize;
									null == u
										? (u = g)
										: util.assert(g === u, function () {
												return (
													"Mismatch in frameSize  (" +
													g +
													" vs " +
													u +
													")"
												);
										  });
									var v = m.data.length / g,
										y = null;
									f !== BACKGROUND_NOISE_TAG &&
										(y =
											null == m.keyFrameIndex
												? getMaxIntensityFrameIndex(m).dataSync()[0]
												: m.keyFrameIndex);
									var w = tensor3d(m.data, [v, g, 1]),
										b = getValidWindows(v, y, a, i),
										_ = function (r) {
											var n = tidy(function () {
												var e = slice(
													w,
													[r[0], 0, 0],
													[r[1] - r[0], -1, -1]
												);
												return s ? normalize(e) : e;
											});
											t.getDataset ? h.push(n.dataSync()) : c.push(n),
												null == e && d.push(p);
										};
									try {
										for (
											var S = ((o = void 0), __values(b)), E = S.next();
											!E.done;
											E = S.next()
										) {
											_(E.value);
										}
									} catch (e) {
										o = { error: e };
									} finally {
										try {
											E && !E.done && (l = S.return) && l.call(S);
										} finally {
											if (o) throw o.error;
										}
									}
									dispose(w);
								};
							try {
								for (
									var v = ((o = void 0), __values(m)), y = v.next();
									!y.done;
									y = v.next()
								) {
									g(y.value);
								}
							} catch (e) {
								o = { error: e };
							} finally {
								try {
									y && !y.done && (l = v.return) && l.call(v);
								} finally {
									if (o) throw o.error;
								}
							}
						}
					}
					null != t.augmentByMixingNoiseRatio &&
						r.augmentByMixingNoise(
							t.getDataset ? h : c,
							d,
							t.augmentByMixingNoiseRatio
						);
					var w = null == t.shuffle || t.shuffle;
					if (t.getDataset) {
						var b = null == t.datasetBatchSize ? 32 : t.datasetBatchSize,
							_ = null == t.datasetValidationSplit ? 0.15 : t.datasetValidationSplit;
						util.assert(_ > 0 && _ < 1, function () {
							return "Invalid dataset validation split: " + _;
						});
						var S = h.map(function (e, t) {
							return [e, d[t]];
						});
						util.shuffle(S),
							(h = S.map(function (e) {
								return e[0];
							}));
						var E = S.map(function (e) {
								return e[1];
							}),
							x = balancedTrainValSplitNumArrays(h, E, _),
							A = x.trainXs,
							T = x.trainYs,
							I = x.valXs,
							D = x.valYs,
							F = array(A).map(function (e) {
								return tensor3d(e, [a, u, 1]);
							}),
							O = array(T).map(function (e) {
								return squeeze(oneHot([e], n.length), [0]);
							}),
							M = zip({ xs: F, ys: O });
						w && (M = M.shuffle(h.length)), (M = M.batch(b).prefetch(4));
						var z = array(I).map(function (e) {
								return tensor3d(e, [a, u, 1]);
							}),
							R = array(D).map(function (e) {
								return squeeze(oneHot([e], n.length), [0]);
							}),
							L = zip({ xs: z, ys: R });
						return [M, (L = L.batch(b).prefetch(4))];
					}
					if (w) {
						var N = [];
						c.forEach(function (e, t) {
							N.push({ x: e, y: d[t] });
						}),
							util.shuffle(N),
							(c = N.map(function (e) {
								return e.x;
							})),
							(d = N.map(function (e) {
								return e.y;
							}));
					}
					var C =
						null == e
							? cast(oneHot(tensor1d(d, "int32"), n.length), "float32")
							: void 0;
					return { xs: stack(c), ys: C };
				});
			}),
			(e.prototype.augmentByMixingNoise = function (e, t, r) {
				var n, a;
				if (null == e || 0 === e.length)
					throw new Error("Cannot perform augmentation because data is null or empty");
				for (
					var i = e[0] instanceof Float32Array,
						o = this.getVocabulary(),
						s = [],
						l = [],
						u = 0;
					u < t.length;
					++u
				)
					o[t[u]] === BACKGROUND_NOISE_TAG ? s.push(u) : l.push(u);
				if (0 === s.length)
					throw new Error(
						"Cannot perform augmentation by mixing with noise when there is no example with label " +
							BACKGROUND_NOISE_TAG
					);
				var c = [],
					h = [],
					d = function (n) {
						var a = s[getRandomInteger(0, s.length)],
							o = i ? tensor1d(e[n]) : e[n],
							l = i ? tensor1d(e[a]) : e[a],
							u = tidy(function () {
								return normalize(add(o, mul(l, r)));
							});
						i ? c.push(u.dataSync()) : c.push(u), h.push(t[n]);
					};
				try {
					for (var p = __values(l), f = p.next(); !f.done; f = p.next()) {
						d(f.value);
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						f && !f.done && (a = p.return) && a.call(p);
					} finally {
						if (n) throw n.error;
					}
				}
				console.log("Data augmentation: mixing noise: added " + c.length + " examples"),
					c.forEach(function (t) {
						return e.push(t);
					}),
					t.push.apply(t, __spread(h));
			}),
			(e.prototype.getSortedUniqueNumFrames = function () {
				for (var e, t, r = new Set(), n = this.getVocabulary(), a = 0; a < n.length; ++a) {
					var i = n[a],
						o = this.label2Ids[i];
					try {
						for (
							var s = ((e = void 0), __values(o)), l = s.next();
							!l.done;
							l = s.next()
						) {
							var u = l.value,
								c = this.examples[u].spectrogram,
								h = c.data.length / c.frameSize;
							r.add(h);
						}
					} catch (t) {
						e = { error: t };
					} finally {
						try {
							l && !l.done && (t = s.return) && t.call(s);
						} finally {
							if (e) throw e.error;
						}
					}
				}
				var d = __spread(r);
				return d.sort(), d;
			}),
			(e.prototype.removeExample = function (e) {
				if (!(e in this.examples)) throw new Error("Nonexistent example UID: " + e);
				var t = this.examples[e].label;
				delete this.examples[e];
				var r = this.label2Ids[t].indexOf(e);
				this.label2Ids[t].splice(r, 1),
					0 === this.label2Ids[t].length && delete this.label2Ids[t];
			}),
			(e.prototype.setExampleKeyFrameIndex = function (e, t) {
				if (!(e in this.examples)) throw new Error("Nonexistent example UID: " + e);
				var r = this.examples[e].spectrogram,
					n = r.data.length / r.frameSize;
				util.assert(t >= 0 && t < n && Number.isInteger(t), function () {
					return (
						"Invalid keyFrameIndex: " +
						t +
						". Must be >= 0, < " +
						n +
						", and an integer."
					);
				}),
					(r.keyFrameIndex = t);
			}),
			(e.prototype.size = function () {
				return Object.keys(this.examples).length;
			}),
			(e.prototype.durationMillis = function () {
				var e = 0;
				for (var t in this.examples) {
					var r = this.examples[t].spectrogram,
						n = 23.22 | r.frameDurationMillis;
					e += (r.data.length / r.frameSize) * n;
				}
				return e;
			}),
			(e.prototype.empty = function () {
				return 0 === this.size();
			}),
			(e.prototype.clear = function () {
				this.examples = {};
			}),
			(e.prototype.getVocabulary = function () {
				var e = new Set();
				for (var t in this.examples) {
					var r = this.examples[t];
					e.add(r.label);
				}
				var n = __spread(e);
				return n.sort(), n;
			}),
			(e.prototype.serialize = function (e) {
				var t,
					r,
					n,
					a,
					i = this.getVocabulary();
				util.assert(!this.empty(), function () {
					return "Cannot serialize empty Dataset";
				}),
					null != e &&
						(Array.isArray(e) || (e = [e]),
						e.forEach(function (e) {
							if (-1 === i.indexOf(e))
								throw new Error(
									'Word label "' +
										e +
										'" does not exist in the vocabulary of this dataset. The vocabulary is: ' +
										JSON.stringify(i) +
										"."
								);
						}));
				var o = [],
					s = [];
				try {
					for (var l = __values(i), u = l.next(); !u.done; u = l.next()) {
						var c = u.value;
						if (null == e || -1 !== e.indexOf(c)) {
							var h = this.label2Ids[c];
							try {
								for (
									var d = ((n = void 0), __values(h)), p = d.next();
									!p.done;
									p = d.next()
								) {
									var f = p.value,
										m = serializeExample(this.examples[f]);
									o.push(m.spec), s.push(m.data);
								}
							} catch (e) {
								n = { error: e };
							} finally {
								try {
									p && !p.done && (a = d.return) && a.call(d);
								} finally {
									if (n) throw n.error;
								}
							}
						}
					}
				} catch (e) {
					t = { error: e };
				} finally {
					try {
						u && !u.done && (r = l.return) && r.call(l);
					} finally {
						if (t) throw t.error;
					}
				}
				return serializedExamples2ArrayBuffer({
					manifest: o,
					data: concatenateArrayBuffers(s),
				});
			}),
			e
		);
	})();
function serializeExample(e) {
	var t = null != e.rawAudio,
		r = {
			label: e.label,
			spectrogramNumFrames: e.spectrogram.data.length / e.spectrogram.frameSize,
			spectrogramFrameSize: e.spectrogram.frameSize,
		};
	null != e.spectrogram.keyFrameIndex &&
		(r.spectrogramKeyFrameIndex = e.spectrogram.keyFrameIndex);
	var n = e.spectrogram.data.buffer.slice(0);
	return (
		t &&
			((r.rawAudioNumSamples = e.rawAudio.data.length),
			(r.rawAudioSampleRateHz = e.rawAudio.sampleRateHz),
			(n = concatenateArrayBuffers([n, e.rawAudio.data.buffer]))),
		{ spec: r, data: n }
	);
}
function deserializeExample(e) {
	var t = {
		frameSize: e.spec.spectrogramFrameSize,
		data: new Float32Array(
			e.data.slice(0, 4 * e.spec.spectrogramFrameSize * e.spec.spectrogramNumFrames)
		),
	};
	null != e.spec.spectrogramKeyFrameIndex && (t.keyFrameIndex = e.spec.spectrogramKeyFrameIndex);
	var r = { label: e.spec.label, spectrogram: t };
	return (
		null != e.spec.rawAudioNumSamples &&
			(r.rawAudio = {
				sampleRateHz: e.spec.rawAudioSampleRateHz,
				data: new Float32Array(
					e.data.slice(4 * e.spec.spectrogramFrameSize * e.spec.spectrogramNumFrames)
				),
			}),
		r
	);
}
function serializedExamples2ArrayBuffer(e) {
	var t = string2ArrayBuffer(JSON.stringify(e.manifest)),
		r = string2ArrayBuffer(DATASET_SERIALIZATION_DESCRIPTOR),
		n = new Uint32Array([DATASET_SERIALIZATION_VERSION]),
		a = new Uint32Array([t.byteLength]);
	return concatenateArrayBuffers([concatenateArrayBuffers([r, n.buffer, a.buffer]), t, e.data]);
}
function arrayBuffer2SerializedExamples(e) {
	util.assert(null != e, function () {
		return "Received null or undefined buffer";
	});
	var t = 0,
		r = arrayBuffer2String(e.slice(t, DATASET_SERIALIZATION_DESCRIPTOR.length));
	util.assert(r === DATASET_SERIALIZATION_DESCRIPTOR, function () {
		return "Deserialization error: Invalid descriptor";
	}),
		(t += DATASET_SERIALIZATION_DESCRIPTOR.length),
		(t += 4);
	var n = new Uint32Array(e, t, 1),
		a = (t += 4);
	t = a + n[0];
	var i = arrayBuffer2String(e.slice(a, t));
	return { manifest: JSON.parse(i), data: e.slice(t) };
}
function getValidWindows(e, t, r, n) {
	if (
		(util.assert(Number.isInteger(e) && e > 0, function () {
			return "snippetLength must be a positive integer, but got " + e;
		}),
		null != t &&
			util.assert(Number.isInteger(t) && t >= 0, function () {
				return "focusIndex must be a non-negative integer, but got " + t;
			}),
		util.assert(Number.isInteger(r) && r > 0, function () {
			return "windowLength must be a positive integer, but got " + r;
		}),
		util.assert(Number.isInteger(n) && n > 0, function () {
			return "windowHop must be a positive integer, but got " + n;
		}),
		util.assert(r <= e, function () {
			return "windowLength (" + r + ") exceeds snippetLength (" + e + ")";
		}),
		util.assert(t < e, function () {
			return "focusIndex (" + t + ") equals or exceeds snippetLength (" + e + ")";
		}),
		r === e)
	)
		return [[0, e]];
	var a = [];
	if (null == t) {
		for (var i = 0; i + r <= e; ) a.push([i, i + r]), (i += n);
		return a;
	}
	var o = Math.floor(r / 2),
		s = t - o;
	for (s < 0 ? (s = 0) : s + r > e && (s = e - r); !(s - n < 0 || t >= s - n + r); ) s -= n;
	for (; s + r <= e && !(t < s); ) a.push([s, s + r]), (s += n);
	return a;
}
function spectrogram2IntensityCurve(e) {
	return tidy(function () {
		var t = e.data.length / e.frameSize,
			r = tensor2d(e.data, [t, e.frameSize]);
		return mean(r, -1);
	});
}
function getMaxIntensityFrameIndex(e) {
	return tidy(function () {
		return argMax(spectrogram2IntensityCurve(e));
	});
}
var version = "0.5.4",
	UNKNOWN_TAG = "_unknown_",
	SAVED_MODEL_METADATA_KEY = "tfjs-speech-commands-saved-model-metadata",
	SAVE_PATH_PREFIX = "indexeddb://tfjs-speech-commands-model/",
	localStorageWrapper = {
		localStorage: "undefined" == typeof window ? null : window.localStorage,
	};
function getMajorAndMinorVersion(e) {
	return e.split(".").slice(0, 2).join(".");
}
var DEFAULT_WINDOW_HOP_RATIO = 0.25,
	BrowserFftSpeechCommandRecognizer = (function () {
		function e(t, r, n) {
			(this.MODEL_URL_PREFIX =
				"https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" +
				getMajorAndMinorVersion(version) +
				"/browser_fft"),
				(this.SAMPLE_RATE_HZ = 44100),
				(this.FFT_SIZE = 1024),
				(this.DEFAULT_SUPPRESSION_TIME_MILLIS = 0),
				(this.streaming = !1),
				(this.transferRecognizers = {}),
				util.assert((null == r && null == n) || (null != r && null != n), function () {
					return "modelURL and metadataURL must be both provided or both not provided.";
				}),
				null == r
					? (null == t
							? (t = e.DEFAULT_VOCABULARY_NAME)
							: util.assert(-1 !== e.VALID_VOCABULARY_NAMES.indexOf(t), function () {
									return "Invalid vocabulary name: '" + t + "'";
							  }),
					  (this.vocabulary = t),
					  (this.modelArtifactsOrURL =
							this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/model.json"),
					  (this.metadataOrURL =
							this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/metadata.json"))
					: (util.assert(null == t, function () {
							return "vocabulary name must be null or undefined when modelURL is provided";
					  }),
					  (this.modelArtifactsOrURL = r),
					  (this.metadataOrURL = n)),
				(this.parameters = { sampleRateHz: this.SAMPLE_RATE_HZ, fftSize: this.FFT_SIZE });
		}
		return (
			(e.prototype.listen = function (e, t) {
				return __awaiter(this, void 0, void 0, function () {
					var r,
						n,
						a,
						i,
						o,
						s = this;
					return __generator(this, function (l) {
						switch (l.label) {
							case 0:
								if (this.streaming)
									throw new Error(
										"Cannot start streaming again when streaming is ongoing."
									);
								return [4, this.ensureModelLoaded()];
							case 1:
								if (
									(l.sent(),
									null == t && (t = {}),
									(r =
										null == t.probabilityThreshold
											? 0
											: t.probabilityThreshold),
									t.includeEmbedding && (r = 0),
									util.assert(r >= 0 && r <= 1, function () {
										return "Invalid probabilityThreshold value: " + r;
									}),
									(n =
										null != t.invokeCallbackOnNoiseAndUnknown &&
										t.invokeCallbackOnNoiseAndUnknown),
									t.includeEmbedding && (n = !0),
									t.suppressionTimeMillis < 0)
								)
									throw new Error(
										"suppressionTimeMillis is expected to be >= 0, but got " +
											t.suppressionTimeMillis
									);
								return (
									(a = null == t.overlapFactor ? 0.5 : t.overlapFactor),
									util.assert(a >= 0 && a < 1, function () {
										return (
											"Expected overlapFactor to be >= 0 and < 1, but got " +
											a
										);
									}),
									(i = function (a, i) {
										return __awaiter(s, void 0, void 0, function () {
											var i, o, s, l, u, c, h, d, p, f, m;
											return __generator(this, function (g) {
												switch (g.label) {
													case 0:
														return (
															(i = normalize(a)),
															t.includeEmbedding
																? [
																		4,
																		this.ensureModelWithEmbeddingOutputCreated(),
																  ]
																: [3, 2]
														);
													case 1:
														return (
															g.sent(),
															(m = __read(
																this.modelWithEmbeddingOutput.predict(
																	i
																),
																2
															)),
															(o = m[0]),
															(s = m[1]),
															[3, 3]
														);
													case 2:
														(o = this.model.predict(i)), (g.label = 3);
													case 3:
														return [4, o.data()];
													case 4:
														return (
															(l = g.sent()),
															[4, (u = o.argMax(-1)).data()]
														);
													case 5:
														return (
															(c = g.sent()[0]),
															(h = Math.max.apply(Math, __spread(l))),
															dispose([o, u, i]),
															h < r ? [2, !1] : [3, 6]
														);
													case 6:
														return (
															(d = void 0),
															t.includeSpectrogram
																? ((p = {}), [4, a.data()])
																: [3, 8]
														);
													case 7:
														(p.data = g.sent()),
															(p.frameSize = this.nonBatchInputShape[1]),
															(d = p),
															(g.label = 8);
													case 8:
														return (
															(f = !0),
															n ||
																(this.words[c] !==
																	BACKGROUND_NOISE_TAG &&
																	this.words[c] !==
																		UNKNOWN_TAG) ||
																(f = !1),
															f &&
																e({
																	scores: l,
																	spectrogram: d,
																	embedding: s,
																}),
															[2, f]
														);
												}
											});
										});
									}),
									(o =
										null == t.suppressionTimeMillis
											? this.DEFAULT_SUPPRESSION_TIME_MILLIS
											: t.suppressionTimeMillis),
									(this.audioDataExtractor = new BrowserFftFeatureExtractor({
										sampleRateHz: this.parameters.sampleRateHz,
										numFramesPerSpectrogram: this.nonBatchInputShape[0],
										columnTruncateLength: this.nonBatchInputShape[1],
										suppressionTimeMillis: o,
										spectrogramCallback: i,
										overlapFactor: a,
									})),
									[4, this.audioDataExtractor.start(t.audioTrackConstraints)]
								);
							case 2:
								return l.sent(), (this.streaming = !0), [2];
						}
					});
				});
			}),
			(e.prototype.ensureModelLoaded = function () {
				return __awaiter(this, void 0, void 0, function () {
					var e,
						t,
						r,
						n,
						a = this;
					return __generator(this, function (i) {
						switch (i.label) {
							case 0:
								return null != this.model ? [2] : [4, this.ensureMetadataLoaded()];
							case 1:
								return (
									i.sent(),
									"string" != typeof this.modelArtifactsOrURL
										? [3, 3]
										: [4, loadLayersModel(this.modelArtifactsOrURL)]
								);
							case 2:
								return (e = i.sent()), [3, 5];
							case 3:
								return [
									4,
									loadLayersModel(
										io.fromMemory(
											this.modelArtifactsOrURL.modelTopology,
											this.modelArtifactsOrURL.weightSpecs,
											this.modelArtifactsOrURL.weightData
										)
									),
								];
							case 4:
								(e = i.sent()), (i.label = 5);
							case 5:
								if (1 !== e.inputs.length)
									throw new Error(
										"Expected model to have 1 input, but got a model with " +
											e.inputs.length +
											" inputs"
									);
								if (4 !== e.inputs[0].shape.length)
									throw new Error(
										"Expected model to have an input shape of rank 4, but got an input shape of rank " +
											e.inputs[0].shape.length
									);
								if (1 !== e.inputs[0].shape[3])
									throw new Error(
										"Expected model to have an input shape with 1 as the last dimension, but got input shape" +
											JSON.stringify(e.inputs[0].shape[3]) +
											"}"
									);
								if (2 !== (t = e.outputShape).length)
									throw new Error(
										"Expected loaded model to have an output shape of rank 2,but received shape " +
											JSON.stringify(t)
									);
								if (t[1] !== this.words.length)
									throw new Error(
										"Mismatch between the last dimension of model's output shape (" +
											t[1] +
											") and number of words (" +
											this.words.length +
											")."
									);
								return (
									(this.model = e),
									this.freezeModel(),
									(this.nonBatchInputShape = e.inputs[0].shape.slice(1)),
									(this.elementsPerExample = 1),
									e.inputs[0].shape.slice(1).forEach(function (e) {
										return (a.elementsPerExample *= e);
									}),
									this.warmUpModel(),
									(r =
										(this.parameters.fftSize / this.parameters.sampleRateHz) *
										1e3),
									(n = e.inputs[0].shape[1]),
									(this.parameters.spectrogramDurationMillis = n * r),
									[2]
								);
						}
					});
				});
			}),
			(e.prototype.ensureModelWithEmbeddingOutputCreated = function () {
				return __awaiter(this, void 0, void 0, function () {
					var e, t;
					return __generator(this, function (r) {
						switch (r.label) {
							case 0:
								return null != this.modelWithEmbeddingOutput
									? [2]
									: [4, this.ensureModelLoaded()];
							case 1:
								for (r.sent(), t = this.model.layers.length - 2; t >= 0; --t)
									if ("Dense" === this.model.layers[t].getClassName()) {
										e = this.model.layers[t];
										break;
									}
								if (null == e)
									throw new Error(
										"Failed to find second last dense layer in the original model."
									);
								return (
									(this.modelWithEmbeddingOutput = model({
										inputs: this.model.inputs,
										outputs: [this.model.outputs[0], e.output],
									})),
									[2]
								);
						}
					});
				});
			}),
			(e.prototype.warmUpModel = function () {
				var e = this;
				tidy(function () {
					for (var t = zeros([1].concat(e.nonBatchInputShape)), r = 0; r < 3; ++r)
						e.model.predict(t);
				});
			}),
			(e.prototype.ensureMetadataLoaded = function () {
				return __awaiter(this, void 0, void 0, function () {
					var e, t, r;
					return __generator(this, function (n) {
						switch (n.label) {
							case 0:
								return null != this.words
									? [2]
									: "string" != typeof this.metadataOrURL
									? [3, 2]
									: [4, loadMetadataJson(this.metadataOrURL)];
							case 1:
								return (t = n.sent()), [3, 3];
							case 2:
								(t = this.metadataOrURL), (n.label = 3);
							case 3:
								if (null == (e = t).wordLabels) {
									if (null == (r = e.words))
										throw new Error(
											'Cannot find field "words" or "wordLabels" in metadata JSON file'
										);
									this.words = r;
								} else this.words = e.wordLabels;
								return [2];
						}
					});
				});
			}),
			(e.prototype.stopListening = function () {
				return __awaiter(this, void 0, void 0, function () {
					return __generator(this, function (e) {
						switch (e.label) {
							case 0:
								if (!this.streaming)
									throw new Error(
										"Cannot stop streaming when streaming is not ongoing."
									);
								return [4, this.audioDataExtractor.stop()];
							case 1:
								return e.sent(), (this.streaming = !1), [2];
						}
					});
				});
			}),
			(e.prototype.isListening = function () {
				return this.streaming;
			}),
			(e.prototype.wordLabels = function () {
				return this.words;
			}),
			(e.prototype.params = function () {
				return this.parameters;
			}),
			(e.prototype.modelInputShape = function () {
				if (null == this.model)
					throw new Error(
						"Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognize(), or listen()."
					);
				return this.model.inputs[0].shape;
			}),
			(e.prototype.recognize = function (e, t) {
				return __awaiter(this, void 0, void 0, function () {
					var r, n, a, i, o, s, l, u, c, h, d, p, f;
					return __generator(this, function (m) {
						switch (m.label) {
							case 0:
								return null == t && (t = {}), [4, this.ensureModelLoaded()];
							case 1:
								return m.sent(), null != e ? [3, 3] : [4, this.recognizeOnline()];
							case 2:
								(r = m.sent()), (e = r.data), (m.label = 3);
							case 3:
								if (e instanceof Tensor)
									this.checkInputTensorShape(e), (a = e), (n = e.shape[0]);
								else {
									if (e.length % this.elementsPerExample)
										throw new Error(
											"The length of the input Float32Array " +
												e.length +
												" is not divisible by the number of tensor elements per per example expected by the model " +
												this.elementsPerExample +
												"."
										);
									(n = e.length / this.elementsPerExample),
										(a = tensor4d(e, [n].concat(this.nonBatchInputShape)));
								}
								return (
									(o = { scores: null }),
									t.includeEmbedding
										? [4, this.ensureModelWithEmbeddingOutputCreated()]
										: [3, 5]
								);
							case 4:
								return (
									m.sent(),
									(s = this.modelWithEmbeddingOutput.predict(a)),
									(i = s[0]),
									(o.embedding = s[1]),
									[3, 6]
								);
							case 5:
								(i = this.model.predict(a)), (m.label = 6);
							case 6:
								return 1 !== n ? [3, 8] : ((l = o), [4, i.data()]);
							case 7:
								return (l.scores = m.sent()), [3, 10];
							case 8:
								return (
									(u = unstack(i)),
									(c = u.map(function (e) {
										return e.data();
									})),
									(h = o),
									[4, Promise.all(c)]
								);
							case 9:
								(h.scores = m.sent()), dispose(u), (m.label = 10);
							case 10:
								return t.includeSpectrogram
									? ((d = o),
									  (p = {}),
									  e instanceof Tensor ? [4, e.data()] : [3, 12])
									: [3, 14];
							case 11:
								return (f = m.sent()), [3, 13];
							case 12:
								(f = e), (m.label = 13);
							case 13:
								(d.spectrogram =
									((p.data = f), (p.frameSize = this.nonBatchInputShape[1]), p)),
									(m.label = 14);
							case 14:
								return dispose(i), [2, o];
						}
					});
				});
			}),
			(e.prototype.recognizeOnline = function () {
				return __awaiter(this, void 0, void 0, function () {
					var e = this;
					return __generator(this, function (t) {
						return [
							2,
							new Promise(function (t, r) {
								(e.audioDataExtractor = new BrowserFftFeatureExtractor({
									sampleRateHz: e.parameters.sampleRateHz,
									numFramesPerSpectrogram: e.nonBatchInputShape[0],
									columnTruncateLength: e.nonBatchInputShape[1],
									suppressionTimeMillis: 0,
									spectrogramCallback: function (r) {
										return __awaiter(e, void 0, void 0, function () {
											var e, n, a;
											return __generator(this, function (i) {
												switch (i.label) {
													case 0:
														return (
															(e = normalize(r)),
															[4, this.audioDataExtractor.stop()]
														);
													case 1:
														return (
															i.sent(),
															(n = t),
															(a = {}),
															[4, e.data()]
														);
													case 2:
														return (
															n.apply(void 0, [
																((a.data = i.sent()),
																(a.frameSize = this.nonBatchInputShape[1]),
																a),
															]),
															e.dispose(),
															[2, !1]
														);
												}
											});
										});
									},
									overlapFactor: 0,
								})),
									e.audioDataExtractor.start();
							}),
						];
					});
				});
			}),
			(e.prototype.createTransfer = function (e) {
				if (null == this.model)
					throw new Error(
						"Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognizer(), or listen()."
					);
				util.assert(null != e && "string" == typeof e && e.length > 1, function () {
					return (
						"Expected the name for a transfer-learning recognized to be a non-empty string, but got " +
						JSON.stringify(e)
					);
				}),
					util.assert(null == this.transferRecognizers[e], function () {
						return "There is already a transfer-learning model named '" + e + "'";
					});
				var t = new TransferBrowserFftSpeechCommandRecognizer(
					e,
					this.parameters,
					this.model
				);
				return (this.transferRecognizers[e] = t), t;
			}),
			(e.prototype.freezeModel = function () {
				var e, t;
				try {
					for (var r = __values(this.model.layers), n = r.next(); !n.done; n = r.next()) {
						n.value.trainable = !1;
					}
				} catch (t) {
					e = { error: t };
				} finally {
					try {
						n && !n.done && (t = r.return) && t.call(r);
					} finally {
						if (e) throw e.error;
					}
				}
			}),
			(e.prototype.checkInputTensorShape = function (e) {
				var t = this.model.inputs[0].shape.length;
				if (e.shape.length !== t)
					throw new Error(
						"Expected input Tensor to have rank " +
							t +
							", but got rank " +
							e.shape.length +
							" that differs "
					);
				var r = e.shape.slice(1),
					n = this.model.inputs[0].shape.slice(1);
				if (!util.arraysEqual(r, n))
					throw new Error(
						"Expected input to have shape [null," +
							n +
							"], but got shape [null," +
							r +
							"]"
					);
			}),
			(e.VALID_VOCABULARY_NAMES = ["18w", "directional4w"]),
			(e.DEFAULT_VOCABULARY_NAME = "18w"),
			e
		);
	})(),
	TransferBrowserFftSpeechCommandRecognizer = (function (e) {
		function t(t, r, n) {
			var a = e.call(this) || this;
			return (
				(a.name = t),
				(a.parameters = r),
				(a.baseModel = n),
				util.assert(null != t && "string" == typeof t && t.length > 0, function () {
					return (
						"The name of a transfer model must be a non-empty string, but got " +
						JSON.stringify(t)
					);
				}),
				(a.nonBatchInputShape = a.baseModel.inputs[0].shape.slice(1)),
				(a.words = null),
				(a.dataset = new Dataset()),
				a
			);
		}
		return (
			__extends(t, e),
			(t.prototype.collectExample = function (e, t) {
				return __awaiter(this, void 0, void 0, function () {
					var r,
						n,
						a,
						i,
						o = this;
					return __generator(this, function (s) {
						if (
							(util.assert(!this.streaming, function () {
								return "Cannot start collection of transfer-learning example because a streaming recognition or transfer-learning example collection is ongoing";
							}),
							util.assert(
								null != e && "string" == typeof e && e.length > 0,
								function () {
									return "Must provide a non-empty string when collecting transfer-learning example";
								}
							),
							null == t && (t = {}),
							null != t.durationMultiplier && null != t.durationSec)
						)
							throw new Error(
								"durationMultiplier and durationSec are mutually exclusive, but are both specified."
							);
						return (
							null != t.durationSec
								? (util.assert(t.durationSec > 0, function () {
										return (
											"Expected durationSec to be > 0, but got " +
											t.durationSec
										);
								  }),
								  (n = this.parameters.fftSize / this.parameters.sampleRateHz),
								  (r = Math.ceil(t.durationSec / n)))
								: null != t.durationMultiplier
								? (util.assert(t.durationMultiplier >= 1, function () {
										return (
											"Expected duration multiplier to be >= 1, but got " +
											t.durationMultiplier
										);
								  }),
								  (r = Math.round(
										this.nonBatchInputShape[0] * t.durationMultiplier
								  )))
								: (r = this.nonBatchInputShape[0]),
							null != t.snippetDurationSec &&
								(util.assert(t.snippetDurationSec > 0, function () {
									return (
										"snippetDurationSec is expected to be > 0, but got " +
										t.snippetDurationSec
									);
								}),
								util.assert(null != t.onSnippet, function () {
									return "onSnippet must be provided if snippetDurationSec is provided.";
								})),
							null != t.onSnippet &&
								util.assert(null != t.snippetDurationSec, function () {
									return "snippetDurationSec must be provided if onSnippet is provided.";
								}),
							(a = this.parameters.fftSize / this.parameters.sampleRateHz),
							(i = a * r),
							(this.streaming = !0),
							[
								2,
								new Promise(function (n) {
									var a =
											null == t.snippetDurationSec
												? 1
												: t.snippetDurationSec / i,
										s = 1 - a,
										l = Math.round(1 / a),
										u = 0,
										c = -1,
										h = [];
									(o.audioDataExtractor = new BrowserFftFeatureExtractor({
										sampleRateHz: o.parameters.sampleRateHz,
										numFramesPerSpectrogram: r,
										columnTruncateLength: o.nonBatchInputShape[1],
										suppressionTimeMillis: 0,
										spectrogramCallback: function (r, a) {
											return __awaiter(o, void 0, void 0, function () {
												var i,
													o,
													s,
													d,
													p,
													f,
													m,
													g,
													v,
													y,
													w,
													b,
													_,
													S,
													E,
													x,
													A,
													T,
													I,
													D;
												return __generator(this, function (F) {
													switch (F.label) {
														case 0:
															return null != t.onSnippet
																? [3, 7]
																: ((i = normalize(r)),
																  (s = (o = this.dataset)
																		.addExample),
																  (d = { label: e }),
																  (p = {}),
																  [4, i.data()]);
														case 1:
															return (
																(d.spectrogram =
																	((p.data = F.sent()),
																	(p.frameSize = this.nonBatchInputShape[1]),
																	p)),
																t.includeRawAudio
																	? ((m = {}), [4, a.data()])
																	: [3, 3]
															);
														case 2:
															return (
																(m.data = F.sent()),
																(m.sampleRateHz = this.audioDataExtractor.sampleRateHz),
																(f = m),
																[3, 4]
															);
														case 3:
															(f = void 0), (F.label = 4);
														case 4:
															return (
																s.apply(o, [((d.rawAudio = f), d)]),
																i.dispose(),
																[4, this.audioDataExtractor.stop()]
															);
														case 5:
															return (
																F.sent(),
																(this.streaming = !1),
																this.collateTransferWords(),
																(g = n),
																(v = {}),
																[4, r.data()]
															);
														case 6:
															return (
																g.apply(void 0, [
																	((v.data = F.sent()),
																	(v.frameSize = this.nonBatchInputShape[1]),
																	v),
																]),
																[3, 13]
															);
														case 7:
															return [4, r.data()];
														case 8:
															for (
																y = F.sent(),
																	-1 === c && (c = y.length),
																	w = c - 1;
																0 !== y[w] && w >= 0;

															)
																w--;
															return (
																(b = c - w - 1),
																(c = w + 1),
																(_ = y.slice(
																	y.length - b,
																	y.length
																)),
																h.push(_),
																null != t.onSnippet &&
																	t.onSnippet({
																		data: _,
																		frameSize: this
																			.nonBatchInputShape[1],
																	}),
																u++ !== l
																	? [3, 13]
																	: [
																			4,
																			this.audioDataExtractor.stop(),
																	  ]
															);
														case 9:
															return (
																F.sent(),
																(this.streaming = !1),
																this.collateTransferWords(),
																(S = normalizeFloat32Array(
																	concatenateFloat32Arrays(h)
																)),
																(E = {
																	data: S,
																	frameSize: this
																		.nonBatchInputShape[1],
																}),
																(A = (x = this.dataset).addExample),
																(T = { label: e, spectrogram: E }),
																t.includeRawAudio
																	? ((D = {}), [4, a.data()])
																	: [3, 11]
															);
														case 10:
															return (
																(D.data = F.sent()),
																(D.sampleRateHz = this.audioDataExtractor.sampleRateHz),
																(I = D),
																[3, 12]
															);
														case 11:
															(I = void 0), (F.label = 12);
														case 12:
															A.apply(x, [((T.rawAudio = I), T)]),
																n(E),
																(F.label = 13);
														case 13:
															return [2, !1];
													}
												});
											});
										},
										overlapFactor: s,
										includeRawAudio: t.includeRawAudio,
									})),
										o.audioDataExtractor.start(t.audioTrackConstraints);
								}),
							]
						);
					});
				});
			}),
			(t.prototype.clearExamples = function () {
				var e = this;
				util.assert(
					null != this.words && this.words.length > 0 && !this.dataset.empty(),
					function () {
						return "No transfer learning examples exist for model name " + e.name;
					}
				),
					this.dataset.clear(),
					(this.words = null);
			}),
			(t.prototype.countExamples = function () {
				if (this.dataset.empty())
					throw new Error(
						"No examples have been collected for transfer-learning model named '" +
							this.name +
							"' yet."
					);
				return this.dataset.getExampleCounts();
			}),
			(t.prototype.getExamples = function (e) {
				return this.dataset.getExamples(e);
			}),
			(t.prototype.setExampleKeyFrameIndex = function (e, t) {
				this.dataset.setExampleKeyFrameIndex(e, t);
			}),
			(t.prototype.removeExample = function (e) {
				this.dataset.removeExample(e), this.collateTransferWords();
			}),
			(t.prototype.isDatasetEmpty = function () {
				return this.dataset.empty();
			}),
			(t.prototype.loadExamples = function (e, t) {
				var r, n, a, i;
				void 0 === t && (t = !1);
				var o = new Dataset(e);
				t && this.clearExamples();
				var s = o.getVocabulary();
				try {
					for (var l = __values(s), u = l.next(); !u.done; u = l.next()) {
						var c = u.value,
							h = o.getExamples(c);
						try {
							for (
								var d = ((a = void 0), __values(h)), p = d.next();
								!p.done;
								p = d.next()
							) {
								var f = p.value;
								this.dataset.addExample(f.example);
							}
						} catch (e) {
							a = { error: e };
						} finally {
							try {
								p && !p.done && (i = d.return) && i.call(d);
							} finally {
								if (a) throw a.error;
							}
						}
					}
				} catch (e) {
					r = { error: e };
				} finally {
					try {
						u && !u.done && (n = l.return) && n.call(l);
					} finally {
						if (r) throw r.error;
					}
				}
				this.collateTransferWords();
			}),
			(t.prototype.serializeExamples = function (e) {
				return this.dataset.serialize(e);
			}),
			(t.prototype.collateTransferWords = function () {
				this.words = this.dataset.getVocabulary();
			}),
			(t.prototype.collectTransferDataAsTensors = function (e, t) {
				var r = this.nonBatchInputShape[0];
				e = e || DEFAULT_WINDOW_HOP_RATIO;
				var n = Math.round(e * r),
					a = this.dataset.getData(null, __assign({ numFrames: r, hopFrames: n }, t));
				return { xs: a.xs, ys: a.ys };
			}),
			(t.prototype.collectTransferDataAsTfDataset = function (e, t, r, n) {
				void 0 === t && (t = 0.15), void 0 === r && (r = 32);
				var a = this.nonBatchInputShape[0];
				e = e || DEFAULT_WINDOW_HOP_RATIO;
				var i = Math.round(e * a);
				return this.dataset.getData(
					null,
					__assign(
						{
							numFrames: a,
							hopFrames: i,
							getDataset: !0,
							datasetBatchSize: r,
							datasetValidationSplit: t,
						},
						n
					)
				);
			}),
			(t.prototype.train = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t,
						r = this;
					return __generator(this, function (n) {
						return (
							util.assert(null != this.words && this.words.length > 0, function () {
								return (
									"Cannot train transfer-learning model '" +
									r.name +
									"' because no transfer learning example has been collected."
								);
							}),
							util.assert(this.words.length > 1, function () {
								return (
									"Cannot train transfer-learning model '" +
									r.name +
									"' because only 1 word label ('" +
									JSON.stringify(r.words) +
									"') has been collected for transfer learning. Requires at least 2."
								);
							}),
							null != e.fineTuningEpochs &&
								util.assert(
									e.fineTuningEpochs >= 0 && Number.isInteger(e.fineTuningEpochs),
									function () {
										return (
											"If specified, fineTuningEpochs must be a non-negative integer, but received " +
											e.fineTuningEpochs
										);
									}
								),
							null == e && (e = {}),
							null == this.model && this.createTransferModelFromBaseModel(),
							(this.secondLastBaseDenseLayer.trainable = !1),
							this.model.compile({
								loss: "categoricalCrossentropy",
								optimizer: e.optimizer || "sgd",
								metrics: ["acc"],
							}),
							(t =
								null == e.fitDatasetDurationMillisThreshold
									? 6e4
									: e.fitDatasetDurationMillisThreshold),
							this.dataset.durationMillis() > t
								? (console.log(
										"Detected large dataset: total duration = " +
											this.dataset.durationMillis() +
											" ms > " +
											t +
											" ms. Training transfer model using fitDataset() instead of fit()"
								  ),
								  [2, this.trainOnDataset(e)])
								: [2, this.trainOnTensors(e)]
						);
					});
				});
			}),
			(t.prototype.trainOnDataset = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t, r, n, a, i, o, s, l, u;
					return __generator(this, function (c) {
						switch (c.label) {
							case 0:
								return (
									util.assert(e.epochs > 0, function () {
										return "Invalid config.epochs";
									}),
									(t = null == e.batchSize ? 32 : e.batchSize),
									(r = e.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO),
									(n = __read(
										this.collectTransferDataAsTfDataset(
											r,
											e.validationSplit,
											t,
											{
												augmentByMixingNoiseRatio:
													e.augmentByMixingNoiseRatio,
											}
										),
										2
									)),
									(a = n[0]),
									(i = n[1]),
									(o = util.now()),
									[
										4,
										this.model.fitDataset(a, {
											epochs: e.epochs,
											validationData: e.validationSplit > 0 ? i : null,
											callbacks: null == e.callback ? null : [e.callback],
										}),
									]
								);
							case 1:
								return (
									(s = c.sent()),
									console.log(
										"fitDataset() took " + (util.now() - o).toFixed(2) + " ms"
									),
									null != e.fineTuningEpochs && e.fineTuningEpochs > 0
										? ((l = util.now()),
										  [4, this.fineTuningUsingTfDatasets(e, a, i)])
										: [3, 3]
								);
							case 2:
								return (
									(u = c.sent()),
									console.log(
										"fitDataset() (fine-tuning) took " +
											(util.now() - l).toFixed(2) +
											" ms"
									),
									[2, [s, u]]
								);
							case 3:
								return [2, s];
						}
					});
				});
			}),
			(t.prototype.trainOnTensors = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t, r, n, a, i, o, s, l, u, c;
					return __generator(this, function (h) {
						switch (h.label) {
							case 0:
								(t = e.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO),
									(r = this.collectTransferDataAsTensors(t, {
										augmentByMixingNoiseRatio: e.augmentByMixingNoiseRatio,
									})),
									(n = r.xs),
									(a = r.ys),
									console.log(
										"Training data: xs.shape = " +
											n.shape +
											", ys.shape = " +
											a.shape
									),
									(h.label = 1);
							case 1:
								return (
									h.trys.push([1, , 6, 7]),
									null != e.validationSplit
										? ((l = balancedTrainValSplit(n, a, e.validationSplit)),
										  (i = l.trainXs),
										  (o = l.trainYs),
										  (s = [l.valXs, l.valYs]))
										: ((i = n), (o = a)),
									[
										4,
										this.model.fit(i, o, {
											epochs: null == e.epochs ? 20 : e.epochs,
											validationData: s,
											batchSize: e.batchSize,
											callbacks: null == e.callback ? null : [e.callback],
										}),
									]
								);
							case 2:
								return (
									(u = h.sent()),
									null != e.fineTuningEpochs && e.fineTuningEpochs > 0
										? [4, this.fineTuningUsingTensors(e, i, o, s)]
										: [3, 4]
								);
							case 3:
								return (c = h.sent()), [2, [u, c]];
							case 4:
								return [2, u];
							case 5:
								return [3, 7];
							case 6:
								return dispose([n, a, i, o, s]), [7];
							case 7:
								return [2];
						}
					});
				});
			}),
			(t.prototype.fineTuningUsingTfDatasets = function (e, t, r) {
				return __awaiter(this, void 0, void 0, function () {
					var n, a, i;
					return __generator(this, function (o) {
						switch (o.label) {
							case 0:
								return (
									(n = this.secondLastBaseDenseLayer.trainable),
									(this.secondLastBaseDenseLayer.trainable = !0),
									(a =
										null == e.fineTuningOptimizer
											? "sgd"
											: e.fineTuningOptimizer),
									this.model.compile({
										loss: "categoricalCrossentropy",
										optimizer: a,
										metrics: ["acc"],
									}),
									[
										4,
										this.model.fitDataset(t, {
											epochs: e.fineTuningEpochs,
											validationData: r,
											callbacks: null == e.callback ? null : [e.callback],
										}),
									]
								);
							case 1:
								return (
									(i = o.sent()),
									(this.secondLastBaseDenseLayer.trainable = n),
									[2, i]
								);
						}
					});
				});
			}),
			(t.prototype.fineTuningUsingTensors = function (e, t, r, n) {
				return __awaiter(this, void 0, void 0, function () {
					var a, i, o;
					return __generator(this, function (s) {
						switch (s.label) {
							case 0:
								return (
									(a = this.secondLastBaseDenseLayer.trainable),
									(this.secondLastBaseDenseLayer.trainable = !0),
									(i =
										null == e.fineTuningOptimizer
											? "sgd"
											: e.fineTuningOptimizer),
									this.model.compile({
										loss: "categoricalCrossentropy",
										optimizer: i,
										metrics: ["acc"],
									}),
									[
										4,
										this.model.fit(t, r, {
											epochs: e.fineTuningEpochs,
											validationData: n,
											batchSize: e.batchSize,
											callbacks:
												null == e.fineTuningCallback
													? null
													: [e.fineTuningCallback],
										}),
									]
								);
							case 1:
								return (
									(o = s.sent()),
									(this.secondLastBaseDenseLayer.trainable = a),
									[2, o]
								);
						}
					});
				});
			}),
			(t.prototype.evaluate = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t,
						r = this;
					return __generator(this, function (n) {
						return (
							util.assert(
								null != e.wordProbThresholds && e.wordProbThresholds.length > 0,
								function () {
									return "Received null or empty wordProbThresholds";
								}
							),
							(t = 0),
							util.assert(this.words[t] === BACKGROUND_NOISE_TAG, function () {
								return (
									"Cannot perform evaluation when the first tag is not " +
									BACKGROUND_NOISE_TAG
								);
							}),
							[
								2,
								tidy(function () {
									for (
										var n = [],
											a = 0,
											i = r.collectTransferDataAsTensors(e.windowHopRatio),
											o = i.xs,
											s = i.ys.argMax(-1).dataSync(),
											l = r.model.predict(o),
											u = max(
												slice(l, [0, 1], [l.shape[0], l.shape[1] - 1]),
												-1
											),
											c = l.shape[0],
											h = 0;
										h < e.wordProbThresholds.length;
										++h
									) {
										for (
											var d = e.wordProbThresholds[h],
												p = u.greater(scalar(d)).dataSync(),
												f = 0,
												m = 0,
												g = 0,
												v = 0,
												y = 0;
											y < c;
											++y
										)
											s[y] === t ? (f++, p[y] && g++) : (m++, p[y] && v++);
										var w = g / f,
											b = v / m;
										n.push({ probThreshold: d, fpr: w, tpr: b }),
											console.log(
												"ROC thresh=" +
													d +
													": fpr=" +
													w.toFixed(4) +
													", tpr=" +
													b.toFixed(4)
											),
											h > 0 &&
												(a +=
													(Math.abs(n[h - 1].fpr - n[h].fpr) *
														(n[h - 1].tpr + n[h].tpr)) /
													2);
									}
									return { rocCurve: n, auc: a };
								}),
							]
						);
					});
				});
			}),
			(t.prototype.createTransferModelFromBaseModel = function () {
				var e = this;
				util.assert(null != this.words, function () {
					return (
						"No word example is available for tranfer-learning model of name " + e.name
					);
				});
				for (
					var t = this.baseModel.layers, r = t.length - 2;
					r >= 0 && "dense" !== t[r].getClassName().toLowerCase();

				)
					r--;
				if (r < 0) throw new Error("Cannot find a hidden dense layer in the base model.");
				this.secondLastBaseDenseLayer = t[r];
				var n = this.secondLastBaseDenseLayer.output;
				(this.transferHead = sequential()),
					this.transferHead.add(
						layers.dense({
							units: this.words.length,
							activation: "softmax",
							inputShape: n.shape.slice(1),
							name: "NewHeadDense",
						})
					);
				var a = this.transferHead.apply(n);
				this.model = model({ inputs: this.baseModel.inputs, outputs: a });
			}),
			(t.prototype.modelInputShape = function () {
				return this.baseModel.inputs[0].shape;
			}),
			(t.prototype.getMetadata = function () {
				return {
					tfjsSpeechCommandsVersion: version,
					modelName: this.name,
					timeStamp: new Date().toISOString(),
					wordLabels: this.wordLabels(),
				};
			}),
			(t.prototype.save = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t, r, n;
					return __generator(this, function (a) {
						return (
							(t = null != e),
							(e = e || getCanonicalSavePath(this.name)),
							t ||
								((r = localStorageWrapper.localStorage.getItem(
									SAVED_MODEL_METADATA_KEY
								)),
								((n = null == r ? {} : JSON.parse(r))[
									this.name
								] = this.getMetadata()),
								localStorageWrapper.localStorage.setItem(
									SAVED_MODEL_METADATA_KEY,
									JSON.stringify(n)
								)),
							console.log("Saving model to " + e),
							[2, this.model.save(e)]
						);
					});
				});
			}),
			(t.prototype.load = function (e) {
				return __awaiter(this, void 0, void 0, function () {
					var t, r, n;
					return __generator(this, function (a) {
						switch (a.label) {
							case 0:
								if (
									((t = null != e),
									(e = e || getCanonicalSavePath(this.name)),
									!t)
								) {
									if (
										null ==
											(r = JSON.parse(
												localStorageWrapper.localStorage.getItem(
													SAVED_MODEL_METADATA_KEY
												)
											)) ||
										null == r[this.name]
									)
										throw new Error(
											"Cannot find metadata for transfer model named " +
												this.name +
												'"'
										);
									(this.words = r[this.name].wordLabels),
										console.log(
											"Loaded word list for model named " +
												this.name +
												": " +
												this.words
										);
								}
								return (n = this), [4, loadLayersModel(e)];
							case 1:
								return (
									(n.model = a.sent()),
									console.log("Loaded model from " + e + ":"),
									this.model.summary(),
									[2]
								);
						}
					});
				});
			}),
			(t.prototype.createTransfer = function (e) {
				throw new Error(
					"Creating transfer-learned recognizer from a transfer-learned recognizer is not supported."
				);
			}),
			t
		);
	})(BrowserFftSpeechCommandRecognizer);
function getCanonicalSavePath(e) {
	return "" + SAVE_PATH_PREFIX + e;
}
function listSavedTransferModels() {
	return __awaiter(this, void 0, void 0, function () {
		var e, t, r;
		return __generator(this, function (n) {
			switch (n.label) {
				case 0:
					return [4, io.listModels()];
				case 1:
					for (r in ((e = n.sent()), (t = []), e))
						r.startsWith(SAVE_PATH_PREFIX) && t.push(r.slice(SAVE_PATH_PREFIX.length));
					return [2, t];
			}
		});
	});
}
function deleteSavedTransferModel(e) {
	return __awaiter(this, void 0, void 0, function () {
		var t;
		return __generator(this, function (r) {
			switch (r.label) {
				case 0:
					return (
						null ==
							(t = JSON.parse(
								localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY)
							)) && (t = {}),
						null != t[e] && delete t[e],
						localStorageWrapper.localStorage.setItem(
							SAVED_MODEL_METADATA_KEY,
							JSON.stringify(t)
						),
						[4, io.removeModel(getCanonicalSavePath(e))]
					);
				case 1:
					return r.sent(), [2];
			}
		});
	});
}
function create(e, t, r, n) {
	if (
		(util.assert((null == r && null == n) || (null != r && null != n), function () {
			return "customModelURL and customMetadataURL must be both provided or both not provided.";
		}),
		null != r &&
			util.assert(null == t, function () {
				return "vocabulary name must be null or undefined when modelURL is provided.";
			}),
		"BROWSER_FFT" === e)
	)
		return new BrowserFftSpeechCommandRecognizer(t, r, n);
	throw "SOFT_FFT" === e
		? new Error("SOFT_FFT SpeechCommandRecognizer has not been implemented yet.")
		: new Error("Invalid fftType: '" + e + "'");
}
var utils = {
	concatenateFloat32Arrays: concatenateFloat32Arrays,
	normalizeFloat32Array: normalizeFloat32Array,
	normalize: normalize,
	playRawAudio: playRawAudio,
};
export {
	create,
	utils,
	BACKGROUND_NOISE_TAG,
	Dataset,
	getMaxIntensityFrameIndex,
	spectrogram2IntensityCurve,
	deleteSavedTransferModel,
	listSavedTransferModels,
	UNKNOWN_TAG,
	version,
};
