function hashKey(g) {
    let c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let k = '', h = 0;
    for (let i = 0; i < g.length; i++) {
        h = (h * 31 + g.charCodeAt(i)) % c.length;
    }
    for (let i = 0; i < 20; i++) {
        k += c[(h + i * 7) % c.length];
    }
    return k;
}

function getParam(p) {
    return new URLSearchParams(window.location.search).get(p);
}

function showKey() {
    const g = getParam('game');
    const output = document.getElementById('output');

    if (!g) {
        output.textContent = 'Invalid game';
        return;
    }

    const storedKey = localStorage.getItem('key_' + g);
    if (storedKey) {
        output.textContent = storedKey;
    } else {
        const generatedKey = hashKey(g);
        localStorage.setItem('key_' + g, generatedKey);
        output.textContent = generatedKey;
    }
}

window.addEventListener('DOMContentLoaded', showKey);
