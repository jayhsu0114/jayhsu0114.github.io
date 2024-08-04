export async function fetchData() {
    try {
        const response = await fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/test-update-status');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        sessionStorage.clear();
        sessionStorage.setItem('post-now', '1');

        let postIndex = 1;
        const postKeys = [];

        for (const key in data) {
            if (data.hasOwnProperty(key) && key.startsWith('post-')) {
                postKeys.push(key);
                data[key].forEach(item => {
                    const [timestamp, content, , , , postCode] = item;

                    sessionStorage.setItem(`${postCode}/timestamp`, timestamp);
                    sessionStorage.setItem(`${postCode}/content`, content);
                    sessionStorage.setItem(`${postCode}/postCode`, postCode);
                });
            }
        }

        postKeys.sort().forEach((key, index) => {
            const postCode = key.substring(5);
            sessionStorage.setItem(`post-${index + 1}`, postCode);
        });

        updatePostGroup();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
