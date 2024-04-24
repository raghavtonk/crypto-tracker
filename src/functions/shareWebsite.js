export default function shareWebsite() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      })
      .then(() => {
        console.log('Website shared successfully');
      })
      .catch((error) => {
        console.error('Error sharing website:', error);
      });
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  }