document.addEventListener("DOMContentLoaded", () => {
    const entryScreen = document.getElementById("entry-screen");
    const mainContent = document.getElementById("main-content");
    const bgVideo = document.getElementById("bg-video");
    let youtubePlayer = null;
    let hasEntered = false;

    // 🔥 التعديل: تحميل فيديو الخلفية فوراً من أول ما تفتح الصفحة
    bgVideo.src = "https://www.youtube.com/embed/TYNTh7fp8Io?autoplay=1&mute=1&controls=0&loop=1&playlist=TYNTh7fp8Io&showinfo=0&rel=0&modestbranding=1";

    // تحميل API يوتيوب
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        youtubePlayer = new YT.Player('yt-player-hidden', {
            height: '0',
            width: '0',
            videoId: 'X_tUNefoy54',
            playerVars: {
                'autoplay': 0, // لا نشغلها تلقائياً لتجنب الحظر
                'controls': 0,
                'loop': 1,
                'playlist': 'X_tUNefoy54'
            },
            events: {
                'onReady': (event) => {
                    event.target.setVolume(70);
                }
            }
        });
    };

    const enterSite = () => {
        if (hasEntered) return;
        hasEntered = true;

        // إخفاء شاشة الدخول
        entryScreen.classList.add("fade-out");
        
        // إظهار المحتوى الرئيسي
        setTimeout(() => {
            entryScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            mainContent.classList.add("show");
        }, 800);

        // تشغيل الأغنية
        if (youtubePlayer && typeof youtubePlayer.playVideo === 'function') {
            youtubePlayer.playVideo();
        } else {
            setTimeout(() => {
                if (youtubePlayer) youtubePlayer.playVideo();
            }, 1000);
        }

        // إزالة المستمعين
        document.removeEventListener("click", enterSite);
        document.removeEventListener("keydown", enterSite);
        document.removeEventListener("touchstart", enterSite);
    };

    // الاستماع للتفاعل
    document.addEventListener("click", enterSite);
    document.addEventListener("keydown", enterSite);
    document.addEventListener("touchstart", enterSite);
});
