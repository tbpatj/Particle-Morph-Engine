export async function loadImageURL(url: string, unique?: boolean) {
  const uniqueUrl = unique ? `${url}?cacheBuster=${Date.now()}` : url;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const elem = new Image();
    elem.crossOrigin = "Anonymous";
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = uniqueUrl;
    return elem;
  });
}
