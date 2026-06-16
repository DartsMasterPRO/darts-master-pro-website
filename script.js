console.log("Darts Master Pro landing page loaded 🎯");
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById('installBtn');
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', async () => {
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('Aplikacja zainstalowana');
        }

        deferredPrompt = null;
    });
});
<script>
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = 'inline-flex';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
            document.getElementById('iosHint').style.display = 'block';
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;
    });
}

window.addEventListener('appinstalled', () => {

    if (installBtn) {
        installBtn.style.display = 'none';
    }

});
</script>
