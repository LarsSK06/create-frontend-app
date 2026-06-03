// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#fetch_directives
// https://www.validbot.com/tools/csp-wizard.php

const CONTENT_SECURITY_POLICY_CONFIG = `

default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
connect-src 'self';
img-src 'self' data: blob:;
style-src 'self' 'unsafe-inline';
frame-src;

`.replaceAll("\n", " ").trim();

export default CONTENT_SECURITY_POLICY_CONFIG;