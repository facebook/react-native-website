export default function readerSurvey(t, e, s, o) {
  var n, a, c;
  (t.SMCX = t.SMCX || []),
    e.getElementById(o) ||
      ((n = e.getElementsByTagName(s)),
      (a = n[n.length - 1]),
      (c = e.createElement(s)),
      (c.type = 'text/javascript'),
      (c.async = !0),
      (c.id = o),
      (c.src =
        'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js'),
      a.parentNode.insertBefore(c, a));
}
