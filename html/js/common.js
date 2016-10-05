
function ready(readyCallback) {
    if (document.readyState != 'loading') {
        readyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', readyCallback);
    }
}