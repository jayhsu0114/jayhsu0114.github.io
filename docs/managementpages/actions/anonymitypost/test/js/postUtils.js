export function getMaxPostKeyNumber() {
    let maxNumber = 1;
    for (let key in sessionStorage) {
        if (key.startsWith('post-')) {
            let number = parseInt(key.substring(5), 10);
            if (!isNaN(number) && number > maxNumber) {
                maxNumber = number;
            }
        }
    }
    return maxNumber;
}

export function updatePostNow(amount) {
    let current = parseInt(sessionStorage.getItem('post-now'), 10);
    if (isNaN(current) || current < 1) {
        current = 1;
    }

    const maxPostNumber = getMaxPostKeyNumber();
    current += amount;
    if (current < 1) {
        current = 1;
    }
    if (current > maxPostNumber) {
        current = maxPostNumber;
    }

    sessionStorage.setItem('post-now', current);
    updatePostGroup();
}

export function updatePostGroup() {
    const postNow = sessionStorage.getItem('post-now');
    const postKey = `post-${postNow}`;
    const postCode = sessionStorage.getItem(postKey);
    
    if (postCode) {
        let postCodeEnd;
        if (postCode.startsWith('ZSJH')) {
            const numericPart = parseInt(postCode.substring(4), 10);
            postCodeEnd = 'ZSJH' + (numericPart + 9);
        } else {
            postCodeEnd = postCode;
        }

        const postGroupInput = document.getElementById('post-group');
        if (postGroupInput) {
            postGroupInput.value = postCode + ' ~ ' + postCodeEnd;
        } else {
            console.warn('post-group input element not found');
        }
    } else {
        console.warn('Post key not found in sessionStorage');
    }
}
