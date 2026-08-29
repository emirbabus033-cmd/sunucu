const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'gold.magmanode.com',
        port: 28939,
        username: 'KacmazBot',
        version: '1.20.5' // Sunucu sürümünü net olarak belirttik
    });

    bot.on('spawn', () => {
        console.log('Bot oyuna girdi, kayıt ve giriş komutları gönderiliyor...');
        
        // 1. Önce /register komutunu gönder
        bot.chat('/register bot123 bot123');

        // 2. 1 saniye sonra /login komutunu gönder
        setTimeout(() => {
            bot.chat('/login bot123 bot123');
            console.log('Giriş yapıldı, koşu ve anti-afk başlatılıyor...');
            
            // Giriş yapıldıktan sonra sürekli koşma modunu aç
            bot.setControlState('forward', true);
            bot.setControlState('sprint', true);
        }, 1000);
    });

    // Her 1 saniyede bir koştuğundan emin ol
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('forward', true);
            bot.setControlState('sprint', true);
        }
    }, 1000);

    // Her 15 saniyede bir zıplayıp sağ tıklayarak AFK kalmasını ve sunucuyu ayakta tutmasını sağla
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            bot.activateItem();
        }
    }, 15000);

    // Bot düşerse 5 saniye sonra tekrar bağlan
    bot.on('end', () => {
        console.log('Bot sunucudan düştü, yeniden bağlanılıyor...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Bağlantı hatası: ', err);
    });
}

createBot();
