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
