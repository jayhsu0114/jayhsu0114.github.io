document.addEventListener('DOMContentLoaded', function() {
    sessionStorage.setItem('school', 'ZSJH');
    let schoolValue = sessionStorage.getItem('school');
    if (schoolValue !== null) {
        console.log('School session stored successfully:', schoolValue);
    } else {
        console.log('Failed to store the school session.');
    }
});
