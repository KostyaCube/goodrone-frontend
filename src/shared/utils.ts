export function extractTextFromHTML(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const scripts = tempDiv.getElementsByTagName('script');
  const styles = tempDiv.getElementsByTagName('style');

  while (scripts.length > 0) {
    scripts[0].parentNode?.removeChild(scripts[0]);
  }
  while (styles.length > 0) {
    styles[0].parentNode?.removeChild(styles[0]);
  }
  return tempDiv.textContent || tempDiv.innerText || '';
}
