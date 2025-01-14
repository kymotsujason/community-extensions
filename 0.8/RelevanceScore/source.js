"use strict";
var _Sources = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/RelevanceScore/RelevanceScore.ts
  var RelevanceScore_exports = {};
  __export(RelevanceScore_exports, {
    relevanceScore: () => relevanceScore
  });

  // node_modules/stemmer/index.js
  var step2list = {
    ational: "ate",
    tional: "tion",
    enci: "ence",
    anci: "ance",
    izer: "ize",
    bli: "ble",
    alli: "al",
    entli: "ent",
    eli: "e",
    ousli: "ous",
    ization: "ize",
    ation: "ate",
    ator: "ate",
    alism: "al",
    iveness: "ive",
    fulness: "ful",
    ousness: "ous",
    aliti: "al",
    iviti: "ive",
    biliti: "ble",
    logi: "log"
  };
  var step3list = {
    icate: "ic",
    ative: "",
    alize: "al",
    iciti: "ic",
    ical: "ic",
    ful: "",
    ness: ""
  };
  var consonant = "[^aeiou]";
  var vowel = "[aeiouy]";
  var consonants = "(" + consonant + "[^aeiouy]*)";
  var vowels = "(" + vowel + "[aeiou]*)";
  var gt0 = new RegExp("^" + consonants + "?" + vowels + consonants);
  var eq1 = new RegExp(
    "^" + consonants + "?" + vowels + consonants + vowels + "?$"
  );
  var gt1 = new RegExp("^" + consonants + "?(" + vowels + consonants + "){2,}");
  var vowelInStem = new RegExp("^" + consonants + "?" + vowel);
  var consonantLike = new RegExp("^" + consonants + vowel + "[^aeiouwxy]$");
  var sfxLl = /ll$/;
  var sfxE = /^(.+?)e$/;
  var sfxY = /^(.+?)y$/;
  var sfxIon = /^(.+?(s|t))(ion)$/;
  var sfxEdOrIng = /^(.+?)(ed|ing)$/;
  var sfxAtOrBlOrIz = /(at|bl|iz)$/;
  var sfxEED = /^(.+?)eed$/;
  var sfxS = /^.+?[^s]s$/;
  var sfxSsesOrIes = /^.+?(ss|i)es$/;
  var sfxMultiConsonantLike = /([^aeiouylsz])\1$/;
  var step2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  var step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  var step4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  function stemmer(value) {
    let result = String(value).toLowerCase();
    if (result.length < 3) {
      return result;
    }
    let firstCharacterWasLowerCaseY = false;
    if (result.codePointAt(0) === 121) {
      firstCharacterWasLowerCaseY = true;
      result = "Y" + result.slice(1);
    }
    if (sfxSsesOrIes.test(result)) {
      result = result.slice(0, -2);
    } else if (sfxS.test(result)) {
      result = result.slice(0, -1);
    }
    let match;
    if (match = sfxEED.exec(result)) {
      if (gt0.test(match[1])) {
        result = result.slice(0, -1);
      }
    } else if ((match = sfxEdOrIng.exec(result)) && vowelInStem.test(match[1])) {
      result = match[1];
      if (sfxAtOrBlOrIz.test(result)) {
        result += "e";
      } else if (sfxMultiConsonantLike.test(result)) {
        result = result.slice(0, -1);
      } else if (consonantLike.test(result)) {
        result += "e";
      }
    }
    if ((match = sfxY.exec(result)) && vowelInStem.test(match[1])) {
      result = match[1] + "i";
    }
    if ((match = step2.exec(result)) && gt0.test(match[1])) {
      result = match[1] + step2list[match[2]];
    }
    if ((match = step3.exec(result)) && gt0.test(match[1])) {
      result = match[1] + step3list[match[2]];
    }
    if (match = step4.exec(result)) {
      if (gt1.test(match[1])) {
        result = match[1];
      }
    } else if ((match = sfxIon.exec(result)) && gt1.test(match[1])) {
      result = match[1];
    }
    if ((match = sfxE.exec(result)) && (gt1.test(match[1]) || eq1.test(match[1]) && !consonantLike.test(match[1]))) {
      result = match[1];
    }
    if (sfxLl.test(result) && gt1.test(result)) {
      result = result.slice(0, -1);
    }
    if (firstCharacterWasLowerCaseY) {
      result = "y" + result.slice(1);
    }
    return result;
  }

  // node_modules/fastest-levenshtein/esm/mod.js
  var peq = new Uint32Array(65536);
  var myers_32 = (a, b) => {
    const n = a.length;
    const m = b.length;
    const lst = 1 << n - 1;
    let pv = -1;
    let mv = 0;
    let sc = n;
    let i = n;
    while (i--) {
      peq[a.charCodeAt(i)] |= 1 << i;
    }
    for (i = 0; i < m; i++) {
      let eq = peq[b.charCodeAt(i)];
      const xv = eq | mv;
      eq |= (eq & pv) + pv ^ pv;
      mv |= ~(eq | pv);
      pv &= eq;
      if (mv & lst) {
        sc++;
      }
      if (pv & lst) {
        sc--;
      }
      mv = mv << 1 | 1;
      pv = pv << 1 | ~(xv | mv);
      mv &= xv;
    }
    i = n;
    while (i--) {
      peq[a.charCodeAt(i)] = 0;
    }
    return sc;
  };
  var myers_x = (b, a) => {
    const n = a.length;
    const m = b.length;
    const mhc = [];
    const phc = [];
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    for (let i = 0; i < hsize; i++) {
      phc[i] = -1;
      mhc[i] = 0;
    }
    let j = 0;
    for (; j < vsize - 1; j++) {
      let mv2 = 0;
      let pv2 = -1;
      const start2 = j * 32;
      const vlen2 = Math.min(32, m) + start2;
      for (let k = start2; k < vlen2; k++) {
        peq[b.charCodeAt(k)] |= 1 << k;
      }
      for (let i = 0; i < n; i++) {
        const eq = peq[a.charCodeAt(i)];
        const pb = phc[i / 32 | 0] >>> i & 1;
        const mb = mhc[i / 32 | 0] >>> i & 1;
        const xv = eq | mv2;
        const xh = ((eq | mb) & pv2) + pv2 ^ pv2 | eq | mb;
        let ph = mv2 | ~(xh | pv2);
        let mh = pv2 & xh;
        if (ph >>> 31 ^ pb) {
          phc[i / 32 | 0] ^= 1 << i;
        }
        if (mh >>> 31 ^ mb) {
          mhc[i / 32 | 0] ^= 1 << i;
        }
        ph = ph << 1 | pb;
        mh = mh << 1 | mb;
        pv2 = mh | ~(xv | ph);
        mv2 = ph & xv;
      }
      for (let k = start2; k < vlen2; k++) {
        peq[b.charCodeAt(k)] = 0;
      }
    }
    let mv = 0;
    let pv = -1;
    const start = j * 32;
    const vlen = Math.min(32, m - start) + start;
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] |= 1 << k;
    }
    let score = m;
    for (let i = 0; i < n; i++) {
      const eq = peq[a.charCodeAt(i)];
      const pb = phc[i / 32 | 0] >>> i & 1;
      const mb = mhc[i / 32 | 0] >>> i & 1;
      const xv = eq | mv;
      const xh = ((eq | mb) & pv) + pv ^ pv | eq | mb;
      let ph = mv | ~(xh | pv);
      let mh = pv & xh;
      score += ph >>> m - 1 & 1;
      score -= mh >>> m - 1 & 1;
      if (ph >>> 31 ^ pb) {
        phc[i / 32 | 0] ^= 1 << i;
      }
      if (mh >>> 31 ^ mb) {
        mhc[i / 32 | 0] ^= 1 << i;
      }
      ph = ph << 1 | pb;
      mh = mh << 1 | mb;
      pv = mh | ~(xv | ph);
      mv = ph & xv;
    }
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] = 0;
    }
    return score;
  };
  var distance = (a, b) => {
    if (a.length < b.length) {
      const tmp = b;
      b = a;
      a = tmp;
    }
    if (b.length === 0) {
      return a.length;
    }
    if (a.length <= 32) {
      return myers_32(a, b);
    }
    return myers_x(a, b);
  };

  // src/RelevanceScore/RelevanceScore.ts
  var relevanceScore = (title, queryTitle) => {
    const titleWords = tokenize(title);
    const queryWords = tokenize(queryTitle);
    const titleStripped = titleWords.join("");
    const queryStripped = queryWords.join("");
    if (titleStripped === queryStripped) {
      return 100;
    }
    const distance2 = distance(titleStripped, queryStripped);
    const maxLen = Math.max(titleStripped.length, queryStripped.length);
    const similarity = (maxLen - distance2) / maxLen;
    let maxSimilarity = 0;
    if (similarity >= 0.8) {
      maxSimilarity = similarity * 100;
    }
    let totalSimilarity = 0;
    const maxPotentialSimilarity = queryWords.length;
    let lastMatchedPositionInTitle = -1;
    for (let i = 0; i < queryWords.length; i++) {
      const queryWord = queryWords[i];
      let bestSimilarity = 0;
      let bestPositionInTitle = -1;
      for (let j = 0; j < titleWords.length; j++) {
        const titleWord = titleWords[j];
        const similarity2 = wordSimilarity(queryWord, titleWord);
        if (similarity2 > bestSimilarity) {
          bestSimilarity = similarity2;
          bestPositionInTitle = j;
        }
      }
      if (bestSimilarity > 0) {
        let orderMultiplier = 1;
        if (lastMatchedPositionInTitle !== -1 && bestPositionInTitle !== -1) {
          if (bestPositionInTitle > lastMatchedPositionInTitle) {
            orderMultiplier += 0.1;
          } else {
            orderMultiplier -= 0.1;
          }
        }
        lastMatchedPositionInTitle = bestPositionInTitle;
        totalSimilarity += bestSimilarity * orderMultiplier;
      }
    }
    const normalizedSimilarity = totalSimilarity / maxPotentialSimilarity * 100;
    const finalSimilarity = Math.max(maxSimilarity, normalizedSimilarity);
    return Math.max(0, Math.min(100, finalSimilarity));
  };
  var wordSimilarity = (word1, word2) => {
    const stemmedWord1 = stemmer(word1);
    const stemmedWord2 = stemmer(word2);
    if (stemmedWord1 === stemmedWord2) {
      return 1;
    }
    const maxLen = Math.max(stemmedWord1.length, stemmedWord2.length);
    const distance2 = distance(stemmedWord1, stemmedWord2);
    const similarity = (maxLen - distance2) / maxLen;
    if (similarity >= 0.7) {
      return similarity;
    }
    return 0;
  };
  var tokenize = (text) => {
    const tokens = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((word) => word.length > 0);
    const splitTokens = tokens.flatMap((token) => splitByUppercase(token));
    return splitTokens;
  };
  var splitByUppercase = (text) => {
    return text.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").split(/\s+/).filter((word) => word.length > 0);
  };
  return __toCommonJS(RelevanceScore_exports);
})();
this.Sources = _Sources; if (typeof exports === 'object' && typeof module !== 'undefined') {module.exports.Sources = this.Sources;}
