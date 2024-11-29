if (window.location.hostname === 'www.zhihu.com' && window.location.pathname === '/') {
    chrome.storage.sync.get("theme", (data) => {
        const theme = data.theme || 'light';
        const url = new URL(window.location.href);

        if (theme === 'dark' && url.searchParams.get('theme') !== 'dark') {
            url.searchParams.set('theme', 'dark');
            window.location.href = url.toString();
        }

        else if (theme === 'light' && url.searchParams.get('theme') !== 'light') {
            url.searchParams.set('theme', 'light');
            window.location.href = url.toString();
        }

        else if (theme === 'system') {
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const systemTheme = prefersDarkScheme ? 'dark' : 'light';
            if (url.searchParams.get('theme') !== systemTheme) {
                url.searchParams.set('theme', systemTheme);
                window.location.href = url.toString();
            }
        }
    });

    if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            chrome.storage.sync.get("theme", (data) => {
                const theme = data.theme || 'system';
                const url = new URL(window.location.href);

                const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const systemTheme = prefersDarkScheme ? 'dark' : 'light';

                if (theme === 'system' && url.searchParams.get('theme') !== systemTheme) {
                    url.searchParams.set('theme', systemTheme);
                    window.location.href = url.toString();
                }
            });
        });
    }
}
